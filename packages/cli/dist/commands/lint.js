"use strict";

var _Object$defineProperty = require("@babel/runtime-corejs3/core-js/object/define-property");

var _interopRequireDefault = require("@babel/runtime-corejs3/helpers/interopRequireDefault").default;

_Object$defineProperty(exports, "__esModule", {
  value: true
});

exports.handler = exports.builder = exports.description = exports.command = void 0;

var _filter = _interopRequireDefault(require("@babel/runtime-corejs3/core-js/instance/filter"));

var _fs = _interopRequireDefault(require("fs"));

var _execa = _interopRequireDefault(require("execa"));

var _terminalLink = _interopRequireDefault(require("terminal-link"));

var _lib = require("../lib");

const command = 'lint';
exports.command = command;
const description = 'Lint your files';
exports.description = description;

const builder = yargs => {
  yargs.option('fix', {
    default: false,
    description: 'Try to fix errors',
    type: 'boolean'
  }).epilogue(`Also see the ${(0, _terminalLink.default)('Redwood CLI Reference', 'https://redwoodjs.com/reference/command-line-interface#lint')}`);
};

exports.builder = builder;

const handler = ({
  fix
}) => {
  var _context;

  (0, _execa.default)('yarn eslint', (0, _filter.default)(_context = [fix && '--fix', _fs.default.existsSync((0, _lib.getPaths)().web.src) && 'web/src', _fs.default.existsSync((0, _lib.getPaths)().api.src) && 'api/src']).call(_context, Boolean), {
    cwd: (0, _lib.getPaths)().base,
    shell: true,
    stdio: 'inherit'
  });
};

exports.handler = handler;