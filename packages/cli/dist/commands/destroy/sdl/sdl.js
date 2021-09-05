"use strict";

var _Object$defineProperty = require("@babel/runtime-corejs3/core-js/object/define-property");

var _interopRequireDefault = require("@babel/runtime-corejs3/helpers/interopRequireDefault").default;

_Object$defineProperty(exports, "__esModule", {
  value: true
});

exports.handler = exports.tasks = exports.builder = exports.description = exports.command = void 0;

var _listr = _interopRequireDefault(require("listr"));

var _helpers = require("../../generate/helpers");

var _lib = require("../../../lib");

var _colors = _interopRequireDefault(require("../../../lib/colors"));

var _sdl = require("../../generate/sdl/sdl");

const command = 'sdl <model>';
exports.command = command;
const description = 'Destroy a GraphQL schema and service component based on a given DB schema Model';
exports.description = description;

const builder = yargs => {
  yargs.positional('model', {
    description: 'Model to destroy the sdl of',
    type: 'string'
  });
};

exports.builder = builder;

const tasks = ({
  model
}) => new _listr.default([{
  title: 'Destroying GraphQL schema and service component files...',
  task: async () => {
    const f = await (0, _sdl.files)({
      name: model
    });
    return (0, _lib.deleteFilesTask)(f);
  }
}], {
  collapse: false,
  exitOnError: true
});

exports.tasks = tasks;

const handler = async ({
  model
}) => {
  await (0, _helpers.ensureUniquePlural)({
    model,
    inDestroyer: true
  });
  const t = tasks({
    model
  });

  try {
    await t.run();
  } catch (e) {
    console.log(_colors.default.error(e.message));
  }
};

exports.handler = handler;