"use strict";

var _Object$defineProperty = require("@babel/runtime-corejs3/core-js/object/define-property");

var _interopRequireDefault = require("@babel/runtime-corejs3/helpers/interopRequireDefault").default;

_Object$defineProperty(exports, "__esModule", {
  value: true
});

exports.handler = exports.builder = exports.description = exports.command = void 0;

var _includes = _interopRequireDefault(require("@babel/runtime-corejs3/core-js/instance/includes"));

var _filter = _interopRequireDefault(require("@babel/runtime-corejs3/core-js/instance/filter"));

var _map = _interopRequireDefault(require("@babel/runtime-corejs3/core-js/instance/map"));

var _keys = _interopRequireDefault(require("@babel/runtime-corejs3/core-js/object/keys"));

var _fs = _interopRequireDefault(require("fs"));

var _concurrently = _interopRequireDefault(require("concurrently"));

var _terminalLink = _interopRequireDefault(require("terminal-link"));

var _internal = require("@redwoodjs/internal");

var _lib = require("../lib");

var _colors = _interopRequireDefault(require("../lib/colors"));

var _generatePrismaClient = require("../lib/generatePrismaClient");

const command = 'dev [side..]';
exports.command = command;
const description = 'Start development servers for api, and web';
exports.description = description;

const builder = yargs => {
  yargs.positional('side', {
    choices: ['api', 'web'],
    default: ['api', 'web'],
    description: 'Which dev server(s) to start',
    type: 'array'
  }).positional('forward', {
    alias: 'fwd',
    description: 'String of one or more Webpack DevServer config options, for example: `--fwd="--port=1234 --open=false"`',
    type: 'string'
  }).option('esbuild', {
    type: 'boolean',
    required: false,
    default: (0, _internal.getConfig)().experimental.esbuild,
    description: 'Use ESBuild [experimental]'
  }).option('useEnvelop', {
    type: 'boolean',
    required: false,
    default: (0, _internal.getConfig)().experimental.useEnvelop,
    description: 'Use Envelop as GraphQL Server instead of Apollo Server [experimental]'
  }).option('generate', {
    type: 'boolean',
    default: true,
    description: 'Generate artifacts'
  }).epilogue(`Also see the ${(0, _terminalLink.default)('Redwood CLI Reference', 'https://redwoodjs.com/reference/command-line-interface#dev')}`);
};

exports.builder = builder;

const handler = async ({
  side = ['api', 'web'],
  forward = '',
  esbuild = false,
  useEnvelop = false,
  generate = true
}) => {
  var _context, _context2;

  const rwjsPaths = (0, _lib.getPaths)();

  if ((0, _includes.default)(side).call(side, 'api')) {
    try {
      await (0, _generatePrismaClient.generatePrismaClient)({
        verbose: false,
        force: false,
        schema: (0, _lib.getPaths)().api.dbSchema
      });
    } catch (e) {
      console.error(_colors.default.error(e.message));
    }

    try {
      await (0, _internal.shutdownPort)((0, _internal.getConfig)().api.port);
    } catch (e) {
      console.error(`Error whilst shutting down "api" port: ${_colors.default.error(e.message)}`);
    }
  }

  if ((0, _includes.default)(side).call(side, 'web')) {
    try {
      await (0, _internal.shutdownPort)((0, _internal.getConfig)().web.port);
    } catch (e) {
      console.error(`Error whilst shutting down "web" port: ${_colors.default.error(e.message)}`);
    }
  }

  const webpackDevConfig = require.resolve('@redwoodjs/core/config/webpack.development.js');
  /** @type {Record<string, import('concurrently').CommandObj>} */


  const jobs = {
    api: {
      name: 'api',
      command: `cd "${rwjsPaths.api.base}" && yarn cross-env NODE_ENV=development yarn dev-server`,
      prefixColor: 'cyan',
      runWhen: () => _fs.default.existsSync(rwjsPaths.api.src)
    },
    web: {
      name: 'web',
      command: `cd "${rwjsPaths.web.base}" && yarn cross-env NODE_ENV=development webpack-dev-server --config "${webpackDevConfig}" ${forward}`,
      prefixColor: 'blue',
      runWhen: () => _fs.default.existsSync(rwjsPaths.web.src)
    },
    gen: {
      name: 'gen',
      command: 'yarn rw-gen-watch',
      prefixColor: 'green',
      runWhen: () => generate
    }
  };

  if (esbuild) {
    jobs.api.name = 'api esbuild';
    jobs.api.command = 'yarn cross-env NODE_ENV=development NODE_OPTIONS=--enable-source-maps yarn rw-api-server-watch';
    jobs.web.name = 'web esbuild';
    jobs.web.command = 'yarn cross-env ESBUILD=1 && ' + jobs.web.command;
  }

  if (useEnvelop) {
    jobs.api.name = jobs.api.name + ' with envelop';
  } // TODO: Convert jobs to an array and supply cwd command.


  (0, _concurrently.default)((0, _filter.default)(_context = (0, _map.default)(_context2 = (0, _keys.default)(jobs)).call(_context2, job => {
    if ((0, _includes.default)(side).call(side, job) || job === 'gen') {
      return jobs[job];
    }
  })).call(_context, job => job && job.runWhen()), {
    prefix: '{name} |',
    timestampFormat: 'HH:mm:ss'
  }).catch(e => {
    if (typeof (e === null || e === void 0 ? void 0 : e.message) !== 'undefined') {
      console.error(_colors.default.error(e.message));
      process.exit(1);
    }
  });
};

exports.handler = handler;