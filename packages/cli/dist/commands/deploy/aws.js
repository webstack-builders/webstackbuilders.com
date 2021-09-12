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

var _fs = _interopRequireDefault(require("fs"));

var _path = _interopRequireDefault(require("path"));

var _execa = _interopRequireDefault(require("execa"));

var _listr = _interopRequireDefault(require("listr"));

var _terminalLink = _interopRequireDefault(require("terminal-link"));

var _lib = require("../../lib");

var _colors = _interopRequireDefault(require("../../lib/colors"));

const command = 'aws [provider]';
exports.command = command;
const description = 'Deploy to AWS using the selected provider';
exports.description = description;

const builder = yargs => {
  var _context, _context2;

  const SUPPORTED_PROVIDERS = (0, _filter.default)(_context = (0, _map.default)(_context2 = _fs.default.readdirSync(_path.default.resolve(__dirname, 'aws-providers'))).call(_context2, file => _path.default.basename(file, '.js'))).call(_context, file => file !== 'README.md');
  yargs.positional('provider', {
    choices: SUPPORTED_PROVIDERS,
    default: 'serverless',
    description: 'AWS Deploy provider to configure',
    type: 'string'
  }).option('side', {
    describe: 'which Side(s) to deploy',
    choices: ['api'],
    default: 'api',
    type: 'array'
  }).epilogue(`Also see the ${(0, _terminalLink.default)('Redwood CLI Reference', 'https://redwoodjs.com/docs/cli-commands#deploy')}\n`);
};

exports.builder = builder;

const handler = async ({
  provider
}) => {
  var _context3;

  const BASE_DIR = (0, _lib.getPaths)().base;
  const providerData = await _promise.default.resolve(`./aws-providers/${provider}`).then(s => (0, _interopRequireWildcard2.default)(require(s)));
  const tasks = new _listr.default((0, _filter.default)(_context3 = [providerData.preRequisites && providerData.preRequisites.length > 0 && {
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
  }, {
    title: 'Building and Packaging...',
    task: () => {
      var _context5;

      return new _listr.default((0, _map.default)(_context5 = providerData.buildCommands).call(_context5, commandDetail => {
        return {
          title: commandDetail.title,
          task: async () => {
            await (0, _execa.default)(...commandDetail.command, {
              cwd: BASE_DIR
            });
          }
        };
      }), {
        collapse: false
      });
    }
  }]).call(_context3, Boolean), {
    collapse: false
  });

  try {
    await tasks.run();
    console.log(_colors.default.green(providerData.deployCommand.title));
    const deploy = (0, _execa.default)(...providerData.deployCommand.command, {
      cwd: BASE_DIR
    });
    deploy.stdout.pipe(process.stdout);
    await deploy;
  } catch (e) {
    console.log(_colors.default.error(e.message));
    process.exit(1);
  }
};

exports.handler = handler;