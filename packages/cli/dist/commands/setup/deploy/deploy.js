"use strict";

var _Object$defineProperty = require("@babel/runtime-corejs3/core-js/object/define-property");

var _interopRequireDefault = require("@babel/runtime-corejs3/helpers/interopRequireDefault").default;

_Object$defineProperty(exports, "__esModule", {
  value: true
});

exports.handler = exports.builder = exports.description = exports.command = void 0;

var _interopRequireWildcard2 = _interopRequireDefault(require("@babel/runtime-corejs3/helpers/interopRequireWildcard"));

var _filter = _interopRequireDefault(require("@babel/runtime-corejs3/core-js/instance/filter"));

var _map = _interopRequireDefault(require("@babel/runtime-corejs3/core-js/instance/map"));

var _promise = _interopRequireDefault(require("@babel/runtime-corejs3/core-js/promise"));

var _reduce = _interopRequireDefault(require("@babel/runtime-corejs3/core-js/instance/reduce"));

var _forEach = _interopRequireDefault(require("@babel/runtime-corejs3/core-js/instance/for-each"));

var _every = _interopRequireDefault(require("@babel/runtime-corejs3/core-js/instance/every"));

var _includes = _interopRequireDefault(require("@babel/runtime-corejs3/core-js/instance/includes"));

var _fs = _interopRequireDefault(require("fs"));

var _path = _interopRequireDefault(require("path"));

var _boxen = _interopRequireDefault(require("boxen"));

var _execa = _interopRequireDefault(require("execa"));

var _listr = _interopRequireDefault(require("listr"));

var _terminalLink = _interopRequireDefault(require("terminal-link"));

var _lib = require("../../../lib");

var _colors = _interopRequireDefault(require("../../../lib/colors"));

var _context, _context2;

const REDWOOD_TOML_PATH = _path.default.join((0, _lib.getPaths)().base, 'redwood.toml');

const SUPPORTED_PROVIDERS = (0, _filter.default)(_context = (0, _map.default)(_context2 = _fs.default.readdirSync(_path.default.resolve(__dirname, 'providers'))).call(_context2, file => _path.default.basename(file, '.js'))).call(_context, file => file !== 'README.md');

const updateProxyPath = newProxyPath => {
  const redwoodToml = _fs.default.readFileSync(REDWOOD_TOML_PATH).toString();

  let newRedwoodToml = redwoodToml;

  if (redwoodToml.match(/apiProxyPath/)) {
    newRedwoodToml = newRedwoodToml.replace(/apiProxyPath.*/g, `apiProxyPath = "${newProxyPath}"`);
  } else if (redwoodToml.match(/\[web\]/)) {
    newRedwoodToml = newRedwoodToml.replace(/\[web\]/, `[web]\n  apiProxyPath = "${newProxyPath}"`);
  } else {
    newRedwoodToml += `[web]\n  apiProxyPath = "${newProxyPath}"`;
  }

  _fs.default.writeFileSync(REDWOOD_TOML_PATH, newRedwoodToml);
};

const command = 'deploy <provider>';
exports.command = command;
const description = 'Generate a deployment configuration';
exports.description = description;

const builder = yargs => {
  yargs.positional('provider', {
    choices: SUPPORTED_PROVIDERS,
    description: 'Deploy provider to configure',
    type: 'string'
  }).option('force', {
    alias: 'f',
    default: false,
    description: 'Overwrite existing configuration',
    type: 'boolean'
  }).option('database', {
    alias: 'd',
    choices: ['none', 'postgresql', 'sqlite'],
    description: 'Database deployment for Render only',
    type: 'string'
  }).check(argv => {
    if (argv.provider !== 'render' && argv.database !== undefined) {
      throw new Error('Database option only available for Render deployment');
    }

    if (argv.provider === 'render' && argv.database === undefined) {
      argv.database = 'postgresql';
    }

    return true;
  }).epilogue(`Also see the ${(0, _terminalLink.default)('Redwood CLI Reference', 'https://redwoodjs.com/reference/command-line-interface#generate-deploy')}`);
};

exports.builder = builder;

const handler = async ({
  provider,
  force,
  database
}) => {
  var _providerData$apiPack, _context3, _providerData$preRequ, _providerData$apiDevP, _providerData$files, _providerData$gitIgno;

  const providerData = await _promise.default.resolve(`./providers/${provider}`).then(s => (0, _interopRequireWildcard2.default)(require(s)));
  const apiDependencies = JSON.parse(_fs.default.readFileSync('api/package.json').toString()).dependencies;
  const missingApiPackages = providerData === null || providerData === void 0 ? void 0 : (_providerData$apiPack = providerData.apiPackages) === null || _providerData$apiPack === void 0 ? void 0 : (0, _reduce.default)(_providerData$apiPack).call(_providerData$apiPack, (missingPackages, apiPackage) => {
    if (!(apiPackage in apiDependencies)) {
      missingPackages.push(apiPackage);
    }

    return missingPackages;
  }, []);
  const tasks = new _listr.default((0, _filter.default)(_context3 = [(providerData === null || providerData === void 0 ? void 0 : (_providerData$preRequ = providerData.preRequisites) === null || _providerData$preRequ === void 0 ? void 0 : _providerData$preRequ.length) && {
    title: 'Checking pre-requisites',
    task: () => {
      var _context4;

      return new _listr.default((0, _map.default)(_context4 = providerData.preRequisites).call(_context4, preReq => {
        return {
          title: preReq.title,
          task: async () => {
            try {
              await (0, _execa.default)(...preReq.command);
            } catch (error) {
              error.message = error.message + '\n' + preReq.errorMessage.join(' ');
              throw error;
            }
          }
        };
      }));
    }
  }, (providerData === null || providerData === void 0 ? void 0 : providerData.prismaDataSourceCheck) && {
    title: 'Checking Prisma data source provider...',
    task: async () => {
      const fileData = await providerData.prismaDataSourceCheck(database);
      let files = {};
      files[fileData.path] = fileData.content;
      return (0, _lib.writeFilesTask)(files, {
        overwriteExisting: force
      });
    }
  }, (missingApiPackages === null || missingApiPackages === void 0 ? void 0 : missingApiPackages.length) && {
    title: 'Adding required api packages...',
    task: async () => {
      await (0, _execa.default)('yarn', ['workspace', 'api', 'add', ...missingApiPackages]);
    }
  }, (providerData === null || providerData === void 0 ? void 0 : (_providerData$apiDevP = providerData.apiDevPackages) === null || _providerData$apiDevP === void 0 ? void 0 : _providerData$apiDevP.length) && {
    title: 'Adding required api dev packages...',
    task: async () => {
      await (0, _execa.default)('yarn', ['workspace', 'api', 'add', '-D', ...providerData.apiDevPackages]);
    }
  }, {
    title: 'Installing packages...',
    task: async () => {
      await (0, _execa.default)('yarn', ['install']);
    }
  }, (providerData === null || providerData === void 0 ? void 0 : providerData.apiProxyPath) && {
    title: 'Updating apiProxyPath...',
    task: async () => {
      updateProxyPath(providerData.apiProxyPath);
    }
  }, (providerData === null || providerData === void 0 ? void 0 : (_providerData$files = providerData.files) === null || _providerData$files === void 0 ? void 0 : _providerData$files.length) && {
    title: 'Adding config...',
    task: async () => {
      var _context5;

      let files = {};
      (0, _forEach.default)(_context5 = providerData.files).call(_context5, fileData => {
        files[fileData.path] = fileData.content;
      });
      return (0, _lib.writeFilesTask)(files, {
        overwriteExisting: force
      });
    }
  }, (providerData === null || providerData === void 0 ? void 0 : (_providerData$gitIgno = providerData.gitIgnoreAdditions) === null || _providerData$gitIgno === void 0 ? void 0 : _providerData$gitIgno.length) && _fs.default.existsSync(_path.default.resolve((0, _lib.getPaths)().base, '.gitignore')) && {
    title: 'Updating .gitignore...',
    task: async (_ctx, task) => {
      var _context6;

      const gitIgnore = _path.default.resolve((0, _lib.getPaths)().base, '.gitignore');

      const content = _fs.default.readFileSync(gitIgnore).toString();

      if ((0, _every.default)(_context6 = providerData.gitIgnoreAdditions).call(_context6, item => (0, _includes.default)(content).call(content, item))) {
        task.skip('.gitignore already includes the additions.');
      }

      _fs.default.appendFileSync(gitIgnore, ['\n', '# Deployment', ...providerData.gitIgnoreAdditions].join('\n'));
    }
  }, (providerData === null || providerData === void 0 ? void 0 : providerData.prismaBinaryTargetAdditions) && {
    title: 'Adding necessary Prisma binaries...',
    task: () => providerData.prismaBinaryTargetAdditions()
  }, {
    title: 'One more thing...',
    task: (_ctx, task) => {
      task.title = `One more thing...\n\n ${(0, _boxen.default)(providerData.notes.join('\n   '), {
        padding: {
          top: 0,
          bottom: 0,
          right: 0,
          left: 0
        },
        margin: 1,
        borderColour: 'gray'
      })}  \n`;
    }
  }]).call(_context3, Boolean), {
    collapse: false
  });

  try {
    await tasks.run();
  } catch (e) {
    console.error(_colors.default.error(e.message));
    process.exit((e === null || e === void 0 ? void 0 : e.exitCode) || 1);
  }
};

exports.handler = handler;