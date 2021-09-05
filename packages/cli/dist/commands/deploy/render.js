"use strict";

var _Object$defineProperty = require("@babel/runtime-corejs3/core-js/object/define-property");

var _interopRequireDefault = require("@babel/runtime-corejs3/helpers/interopRequireDefault").default;

_Object$defineProperty(exports, "__esModule", {
  value: true
});

exports.handler = exports.builder = exports.description = exports.command = void 0;

var _execa = _interopRequireDefault(require("execa"));

var _terminalLink = _interopRequireDefault(require("terminal-link"));

var _lib = require("../../lib");

const command = 'render <side> [...commands]';
exports.command = command;
const description = 'Build command for Render deploy';
exports.description = description;

const builder = yargs => {
  yargs.positional('side', {
    choices: ['api', 'web'],
    description: 'select side to build',
    type: 'string'
  }).option('prisma', {
    description: 'Apply database migrations',
    type: 'boolean',
    default: 'true'
  }).option('data-migrate', {
    description: 'Migrate the data in your database',
    type: 'boolean',
    default: 'true',
    alias: 'dm'
  }).option('serve', {
    description: 'Run server for api in production',
    type: 'boolean',
    default: 'true'
  }).epilogue(`For more commands, options, and examples, see ${(0, _terminalLink.default)('Redwood CLI Reference', 'https://redwoodjs.com/docs/cli-commands#deploy')}`);
};

exports.builder = builder;

const handler = async ({
  side,
  prisma,
  dm: dataMigrate,
  serve
}) => {
  const paths = (0, _lib.getPaths)();
  let commandSet = [];

  if (side == 'api') {
    if (prisma) {
      commandSet.push('yarn rw prisma migrate deploy');
    }

    if (dataMigrate) {
      commandSet.push('yarn rw dataMigrate up');
    }

    if (serve) {
      commandSet.push('yarn rw serve api');
    }
  } else if (side == 'web') {
    commandSet.push('yarn');
    commandSet.push('yarn rw build web');
  }

  (0, _execa.default)(commandSet.join(' && '), {
    shell: true,
    stdio: 'inherit',
    cwd: paths.base,
    extendEnv: true,
    cleanup: true
  });
};

exports.handler = handler;