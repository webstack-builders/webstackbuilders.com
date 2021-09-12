"use strict";

var _Object$defineProperty = require("@babel/runtime-corejs3/core-js/object/define-property");

var _interopRequireDefault = require("@babel/runtime-corejs3/helpers/interopRequireDefault").default;

_Object$defineProperty(exports, "__esModule", {
  value: true
});

exports.handler = exports.description = exports.aliases = exports.command = void 0;

var _promise = _interopRequireDefault(require("@babel/runtime-corejs3/core-js/promise"));

var _path = _interopRequireDefault(require("path"));

var _repl = _interopRequireDefault(require("repl"));

var _register = _interopRequireDefault(require("@babel/register"));

var _lib = require("../lib");

const command = 'console';
exports.command = command;
const aliases = ['c'];
exports.aliases = aliases;
const description = 'Launch an interactive Redwood shell (experimental)';
exports.description = description;
const paths = (0, _lib.getPaths)().api;

const mapDBToContext = ctx => {
  const {
    db
  } = require(_path.default.join(paths.lib, 'db'));

  ctx.db = db;
};

const handler = () => {
  // Transpile on the fly
  (0, _register.default)({
    extends: _path.default.join(paths.base, '.babelrc.js'),
    extensions: ['.js', '.ts'],
    only: [paths.base],
    ignore: ['node_modules'],
    cache: false
  });

  const r = _repl.default.start(); // always await promises.
  // source: https://github.com/nodejs/node/issues/13209#issuecomment-619526317


  const defaultEval = r.eval;

  r.eval = (cmd, context, filename, callback) => {
    defaultEval(cmd, context, filename, async (err, result) => {
      if (err) {
        // propagate errors.
        callback(err);
      } else {
        // await the promise and either return the result or error.
        try {
          callback(null, await _promise.default.resolve(result));
        } catch (err) {
          callback(err);
        }
      }
    });
  }; // Make the project's db (i.e. Prisma Client) available


  mapDBToContext(r.context);
};

exports.handler = handler;