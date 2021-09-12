"use strict";

var _Object$defineProperty = require("@babel/runtime-corejs3/core-js/object/define-property");

var _interopRequireDefault = require("@babel/runtime-corejs3/helpers/interopRequireDefault").default;

_Object$defineProperty(exports, "__esModule", {
  value: true
});

exports.handler = exports.builder = exports.description = exports.aliases = exports.command = void 0;

var _includes = _interopRequireDefault(require("@babel/runtime-corejs3/core-js/instance/includes"));

var _forEach = _interopRequireDefault(require("@babel/runtime-corejs3/core-js/instance/for-each"));

var _path = _interopRequireDefault(require("path"));

var _execa = _interopRequireDefault(require("execa"));

var _listr = _interopRequireDefault(require("listr"));

var _listrVerboseRenderer = _interopRequireDefault(require("listr-verbose-renderer"));

var _terminalLink = _interopRequireDefault(require("terminal-link"));

var _structure = require("@redwoodjs/structure");

var _lib = require("../lib");

var _colors = _interopRequireDefault(require("../lib/colors"));

var _generatePrismaClient = require("../lib/generatePrismaClient");

const command = 'typeCheck [sides..]';
exports.command = command;
const aliases = ['tsc', 'tc', 'type-check'];
exports.aliases = aliases;
const description = 'Run a TypeScript compiler check on your project';
exports.description = description;

const builder = yargs => {
  yargs.strict(false) // so that we can forward arguments to tsc
  .positional('sides', {
    default: (0, _structure.getProject)().sides,
    description: 'Which side(s) to run a typecheck on',
    type: 'array'
  }).option('prisma', {
    type: 'boolean',
    default: true,
    description: 'Generate the Prisma client'
  }).option('verbose', {
    alias: 'v',
    default: true,
    description: 'Print more',
    type: 'boolean'
  }).epilogue(`Also see the ${(0, _terminalLink.default)('Redwood CLI Reference', 'https://redwoodjs.com/reference/command-line-interface#type-check')}`);
};

exports.builder = builder;

const handler = async ({
  sides,
  verbose,
  prisma
}) => {
  const listrTasks = [{
    title: 'Generating redwood types...',
    task: () => {
      return (0, _execa.default)('yarn rw-gen', [], {
        stdio: verbose ? 'inherit' : 'pipe',
        shell: true,
        cwd: (0, _lib.getPaths)().web.base
      });
    }
  }, {
    title: 'Generating prisma client...',
    task: () => {
      return (0, _generatePrismaClient.generatePrismaClient)({
        verbose: true,
        schema: (0, _lib.getPaths)().api.dbSchema
      });
    },
    enabled: () => prisma,
    skip: () => {
      if (!(0, _includes.default)(sides).call(sides, 'api')) {
        return 'Skipping, as no api side present';
      }
    }
  }];
  (0, _forEach.default)(sides).call(sides, sideName => {
    const cwd = _path.default.join((0, _lib.getPaths)().base, sideName);

    listrTasks.push({
      title: `Typechecking "${sideName}"...`,
      task: () => {
        return (0, _execa.default)('yarn tsc', ['--noEmit', '--skipLibCheck'], {
          stdio: verbose ? 'inherit' : 'pipe',
          shell: true,
          cwd
        });
      }
    });
  });
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