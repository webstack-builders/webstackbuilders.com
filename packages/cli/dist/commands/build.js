"use strict";

var _Object$defineProperty = require("@babel/runtime-corejs3/core-js/object/define-property");

var _interopRequireDefault = require("@babel/runtime-corejs3/helpers/interopRequireDefault").default;

_Object$defineProperty(exports, "__esModule", {
  value: true
});

exports.handler = exports.builder = exports.description = exports.command = void 0;

var _map = _interopRequireDefault(require("@babel/runtime-corejs3/core-js/instance/map"));

var _includes = _interopRequireDefault(require("@babel/runtime-corejs3/core-js/instance/includes"));

var _fs = _interopRequireDefault(require("fs"));

var _path = _interopRequireDefault(require("path"));

var _execa = _interopRequireDefault(require("execa"));

var _listr = _interopRequireDefault(require("listr"));

var _listrVerboseRenderer = _interopRequireDefault(require("listr-verbose-renderer"));

var _terminalLink = _interopRequireDefault(require("terminal-link"));

var _internal = require("@redwoodjs/internal");

var _detection = require("@redwoodjs/prerender/detection");

var _lib = require("../lib");

var _colors = _interopRequireDefault(require("../lib/colors"));

var _generatePrismaClient = require("../lib/generatePrismaClient");

var _prerender = require("./prerender");

const command = 'build [side..]';
exports.command = command;
const description = 'Build for production';
exports.description = description;

const builder = yargs => {
  const apiExists = _fs.default.existsSync((0, _lib.getPaths)().api.src);

  const webExists = _fs.default.existsSync((0, _lib.getPaths)().web.src);

  const optionDefault = (apiExists, webExists) => {
    let options = [];

    if (apiExists) {
      options.push('api');
    }

    if (webExists) {
      options.push('web');
    }

    return options;
  };

  yargs.positional('side', {
    choices: ['api', 'web'],
    default: optionDefault(apiExists, webExists),
    description: 'Which side(s) to build',
    type: 'array'
  }).option('stats', {
    default: false,
    description: `Use ${(0, _terminalLink.default)('Webpack Bundle Analyzer', 'https://github.com/webpack-contrib/webpack-bundle-analyzer')}`,
    type: 'boolean'
  }).option('verbose', {
    alias: 'v',
    default: false,
    description: 'Print more',
    type: 'boolean'
  }).option('prerender', {
    default: true,
    description: 'Prerender after building web',
    type: 'boolean'
  }).option('prisma', {
    type: 'boolean',
    default: true,
    description: 'Generate the Prisma client'
  }).option('esbuild', {
    type: 'boolean',
    required: false,
    default: (0, _internal.getConfig)().experimental.esbuild,
    description: 'Use ESBuild for api side [experimental]'
  }).option('performance', {
    alias: 'perf',
    type: 'boolean',
    default: false,
    description: 'Measure build performance'
  }).epilogue(`Also see the ${(0, _terminalLink.default)('Redwood CLI Reference', 'https://redwoodjs.com/reference/command-line-interface#build')}`);
};

exports.builder = builder;

const handler = async ({
  side = ['api', 'web'],
  verbose = false,
  stats = false,
  prisma = true,
  esbuild = false,
  prerender,
  performance = false
}) => {
  let webpackConfigPath = require.resolve(`@redwoodjs/core/config/webpack.${stats ? 'stats' : 'production'}.js`);

  const execCommandsForSides = {
    api: {
      // must use path.join() here, and for 'web' below, to support Windows
      cwd: _path.default.join((0, _lib.getPaths)().base, 'api'),
      cmd: "yarn cross-env NODE_ENV=production babel src --out-dir dist --delete-dir-on-start --extensions .ts,.js --ignore '**/*.test.ts,**/*.test.js,**/__tests__' --source-maps"
    },
    web: {
      cwd: _path.default.join((0, _lib.getPaths)().base, 'web'),
      cmd: `yarn cross-env NODE_ENV=production webpack --config ${webpackConfigPath}`
    }
  };

  if (performance) {
    webpackConfigPath = require.resolve('@redwoodjs/core/config/webpack.perf.js');

    _execa.default.sync(`yarn cross-env NODE_ENV=production webpack --config ${webpackConfigPath}`, {
      stdio: 'inherit',
      shell: true
    }); // We do not want to continue building...


    return;
  }

  if (stats) {
    side = ['web'];
    console.log(' ⏩ Skipping `api` build because stats only works for Webpack at the moment.');
  }

  if (esbuild) {
    console.log('Using experimental esbuild...');
    execCommandsForSides.api.cmd = `yarn rimraf "${(0, _lib.getPaths)().api.dist}" && yarn cross-env NODE_ENV=production yarn rw-api-build`;
  }

  const listrTasks = (0, _map.default)(side).call(side, sideName => {
    const {
      cwd,
      cmd
    } = execCommandsForSides[sideName];
    return {
      title: `Building "${sideName}"${stats && ' for stats' || ''}...`,
      task: () => {
        return (0, _execa.default)(cmd, undefined, {
          stdio: verbose ? 'inherit' : 'pipe',
          shell: true,
          cwd
        });
      }
    };
  }); // Additional tasks, apart from build

  if ((0, _includes.default)(side).call(side, 'api') && prisma) {
    try {
      await (0, _generatePrismaClient.generatePrismaClient)({
        verbose,
        force: true,
        schema: (0, _lib.getPaths)().api.dbSchema
      });
    } catch (e) {
      console.log(_colors.default.error(e.message));
      process.exit(1);
    }
  }

  if ((0, _includes.default)(side).call(side, 'web')) {
    // Clean web dist folder, _before_ building
    listrTasks.unshift({
      title: 'Cleaning "web"... (./web/dist/)',
      task: () => {
        return (0, _execa.default)('rimraf dist/*', undefined, {
          stdio: verbose ? 'inherit' : 'pipe',
          shell: true,
          cwd: (0, _lib.getPaths)().web.base
        });
      }
    }); // Prerender _after_ web build

    if (prerender) {
      const prerenderRoutes = (0, _detection.detectPrerenderRoutes)();
      listrTasks.push({
        title: 'Prerendering "web"...',
        task: async () => {
          const prerenderTasks = await (0, _prerender.getTasks)(); // Reuse prerender tasks, but run them in parallel to speed things up

          return new _listr.default(prerenderTasks, {
            renderer: verbose && _listrVerboseRenderer.default,
            concurrent: true
          });
        },
        skip: () => {
          if (prerenderRoutes.length === 0) {
            return 'You have not marked any routes as `prerender` in `Routes.{js,tsx}`';
          }
        }
      });
    }
  }

  const tasks = new _listr.default(listrTasks, {
    renderer: verbose && _listrVerboseRenderer.default
  });

  try {
    await tasks.run();
  } catch (e) {
    console.log(_colors.default.error(e.message));
    process.exit(1);
  }
};

exports.handler = handler;