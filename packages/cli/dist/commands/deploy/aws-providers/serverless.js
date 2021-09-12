"use strict";

var _Object$defineProperty = require("@babel/runtime-corejs3/core-js/object/define-property");

_Object$defineProperty(exports, "__esModule", {
  value: true
});

exports.deployCommand = exports.buildCommands = exports.preRequisites = void 0;
const preRequisites = [{
  title: 'Checking if Serverless framework is installed...',
  command: ['serverless', ['--version']],
  errorMessage: ['Looks like Serverless is not installed.', 'Please follow the steps at https://www.serverless.com/framework/docs/providers/aws/guide/installation/ to install Serverless.']
}, {
  title: 'Checking if @netlify/zip-it-and-ship-it is installed...',
  command: ['yarn', ['zip-it-and-ship-it', '--version']],
  errorMessage: ['Looks like @netlify/zip-it-and-ship-it is not installed.', 'Either run `yarn rw setup aws-serverless` or add it seperately as a dev dependency in the api workspace.']
}];
exports.preRequisites = preRequisites;
const buildCommands = [{
  title: 'Building API...',
  command: ['yarn', ['rw', 'build', 'api']]
}, {
  title: 'Packaging API...',
  command: ['yarn', ['zip-it-and-ship-it', 'api/dist/functions/', 'api/dist/zipball']]
}];
exports.buildCommands = buildCommands;
const deployCommand = {
  title: 'Deploying...',
  command: ['serverless', ['deploy']]
};
exports.deployCommand = deployCommand;