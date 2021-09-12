"use strict";

var _Object$defineProperty = require("@babel/runtime-corejs3/core-js/object/define-property");

var _interopRequireDefault = require("@babel/runtime-corejs3/helpers/interopRequireDefault").default;

_Object$defineProperty(exports, "__esModule", {
  value: true
});

exports.builder = exports.description = exports.command = void 0;

var _terminalLink = _interopRequireDefault(require("terminal-link"));

const command = 'setup <commmand>';
exports.command = command;
const description = 'Initialize project config and install packages';
exports.description = description;

const builder = yargs => yargs.commandDir('./setup', {
  recurse: true
}).demandCommand().epilogue(`Also see the ${(0, _terminalLink.default)('Redwood CLI Reference', 'https://redwoodjs.com/reference/command-line-interface#setup')}`);

exports.builder = builder;