"use strict";

var _Object$defineProperty = require("@babel/runtime-corejs3/core-js/object/define-property");

var _interopRequireDefault = require("@babel/runtime-corejs3/helpers/interopRequireDefault").default;

_Object$defineProperty(exports, "__esModule", {
  value: true
});

exports.generateDepracatedHandler = void 0;

var _terminalLink = _interopRequireDefault(require("terminal-link"));

var _colors = _interopRequireDefault(require("../../lib/colors"));

const generateDepracatedHandler = ({
  newCommand,
  docsLink
}) => {
  return () => {
    try {
      console.log(_colors.default.warning('\n' + 'WARNING: deprecated command'));
      console.log('Please use the new command: ' + _colors.default.green(`${newCommand} \n`));
      console.log(`Also see the ${(0, _terminalLink.default)('Redwood CLI Reference', docsLink)}`);
    } catch (e) {
      console.log(_colors.default.error(e.message));
    }
  };
};

exports.generateDepracatedHandler = generateDepracatedHandler;