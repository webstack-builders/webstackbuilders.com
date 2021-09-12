"use strict";

var _Object$defineProperty = require("@babel/runtime-corejs3/core-js/object/define-property");

var _interopRequireDefault = require("@babel/runtime-corejs3/helpers/interopRequireDefault").default;

_Object$defineProperty(exports, "__esModule", {
  value: true
});

exports.builder = exports.description = exports.aliases = exports.command = void 0;

var _terminalLink = _interopRequireDefault(require("terminal-link"));

const command = 'util <util>';
exports.command = command;
const aliases = ['u'];
exports.aliases = aliases;
const description = 'WARNING: deprecated. Use "yarn rw setup" command.'; // ********
// Deprecated as of September 2020
// Use "setup" command
// ********

exports.description = description;

const builder = yargs => yargs.commandDir('./util', {
  recurse: true,
  exclude: /util.js/
}).demandCommand().epilogue(`Also see the ${(0, _terminalLink.default)('Redwood CLI Reference', 'https://redwoodjs.com/reference/command-line-interface#setup')}`);

exports.builder = builder;