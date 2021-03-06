"use strict";

var _Object$defineProperty = require("@babel/runtime-corejs3/core-js/object/define-property");

var _interopRequireDefault = require("@babel/runtime-corejs3/helpers/interopRequireDefault").default;

_Object$defineProperty(exports, "__esModule", {
  value: true
});

exports.builder = exports.description = exports.aliases = exports.command = void 0;

var _terminalLink = _interopRequireDefault(require("terminal-link"));

const command = 'destroy <type>';
exports.command = command;
const aliases = ['d'];
exports.aliases = aliases;
const description = 'Rollback changes made by the generate command';
exports.description = description;

const builder = yargs => yargs.commandDir('./destroy', {
  recurse: true
}).demandCommand().epilogue(`Also see the ${(0, _terminalLink.default)('Redwood CLI Reference', 'https://redwoodjs.com/reference/command-line-interface#destroy')}`);

exports.builder = builder;