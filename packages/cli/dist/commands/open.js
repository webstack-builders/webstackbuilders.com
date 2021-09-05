"use strict";

var _Object$defineProperty = require("@babel/runtime-corejs3/core-js/object/define-property");

var _interopRequireDefault = require("@babel/runtime-corejs3/helpers/interopRequireDefault").default;

_Object$defineProperty(exports, "__esModule", {
  value: true
});

exports.handler = exports.builder = exports.description = exports.command = void 0;

var _execa = _interopRequireDefault(require("execa"));

var _terminalLink = _interopRequireDefault(require("terminal-link"));

var _internal = require("@redwoodjs/internal");

const command = 'open';
exports.command = command;
const description = 'Open your project in your browser';
exports.description = description;

const builder = yargs => {
  yargs.epilogue(`Also see the ${(0, _terminalLink.default)('Redwood CLI Reference', 'https://redwoodjs.com/reference/command-line-interface#open')}`);
};

exports.builder = builder;

const handler = () => {
  (0, _execa.default)(`open http://localhost:${(0, _internal.getConfig)().web.port}`, {
    shell: true
  });
};

exports.handler = handler;