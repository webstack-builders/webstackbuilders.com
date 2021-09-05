"use strict";

var _Object$defineProperty = require("@babel/runtime-corejs3/core-js/object/define-property");

var _interopRequireDefault = require("@babel/runtime-corejs3/helpers/interopRequireDefault").default;

_Object$defineProperty(exports, "__esModule", {
  value: true
});

exports.yargsDefaults = exports.builder = exports.description = exports.aliases = exports.command = void 0;

var _execa = _interopRequireDefault(require("execa"));

var _terminalLink = _interopRequireDefault(require("terminal-link"));

var _structure = require("@redwoodjs/structure");

const command = 'generate <type>';
exports.command = command;
const aliases = ['g'];
exports.aliases = aliases;
const description = 'Generate boilerplate code and type definitions';
exports.description = description;

const builder = yargs => yargs.command('types', 'Generate supplementary code', {}, () => {
  _execa.default.sync('yarn rw-gen', {
    shell: true,
    stdio: 'inherit'
  });
})
/**
 * Like generate, util is an entry point command,
 * so we can't have generate going through its subdirectories.
 * NOTE: `util` is deprecated.
 */
.commandDir('./generate', {
  recurse: true,
  exclude: /\/util\//
}).demandCommand().epilogue(`Also see the ${(0, _terminalLink.default)('Redwood CLI Reference', 'https://redwoodjs.com/reference/command-line-interface#generate-alias-g')}`);
/** @type {Record<string, import('yargs').Options>} */


exports.builder = builder;
const yargsDefaults = {
  force: {
    alias: 'f',
    default: false,
    description: 'Overwrite existing files',
    type: 'boolean'
  },
  typescript: {
    alias: 'ts',
    default: (0, _structure.getProject)().isTypeScriptProject,
    description: 'Generate TypeScript files',
    type: 'boolean'
  }
};
exports.yargsDefaults = yargsDefaults;