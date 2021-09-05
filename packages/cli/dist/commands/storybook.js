"use strict";

var _Object$defineProperty = require("@babel/runtime-corejs3/core-js/object/define-property");

var _interopRequireDefault = require("@babel/runtime-corejs3/helpers/interopRequireDefault").default;

_Object$defineProperty(exports, "__esModule", {
  value: true
});

exports.handler = exports.builder = exports.description = exports.aliases = exports.command = void 0;

var _filter = _interopRequireDefault(require("@babel/runtime-corejs3/core-js/instance/filter"));

var _path = _interopRequireDefault(require("path"));

var _execa = _interopRequireDefault(require("execa"));

var _internal = require("@redwoodjs/internal");

const command = 'storybook';
exports.command = command;
const aliases = ['sb'];
exports.aliases = aliases;
const description = 'Launch Storybook: An isolated component development environment';
exports.description = description;

const builder = yargs => {
  yargs.option('open', {
    describe: 'Open storybooks in your browser on start',
    type: 'boolean',
    default: true
  }).option('build', {
    describe: 'Build Storybook',
    type: 'boolean',
    default: false
  }).option('port', {
    describe: 'Which port to run storybooks on',
    type: 'integer',
    default: 7910
  }).option('build-directory', {
    describe: 'Directory in web/ to store static files',
    type: 'string',
    default: 'public/storybook'
  });
};

exports.builder = builder;

const handler = ({
  open,
  port,
  build,
  buildDirectory
}) => {
  var _context;

  const cwd = (0, _internal.getPaths)().web.base;

  const staticAssetsFolder = _path.default.join((0, _internal.getPaths)().web.base, 'public'); // Create the `MockServiceWorker.js` file
  // https://mswjs.io/docs/cli/init


  (0, _execa.default)(`yarn msw init "${staticAssetsFolder}" --no-save`, undefined, {
    stdio: 'inherit',
    shell: true,
    cwd
  });
  (0, _execa.default)(`yarn ${build ? 'build' : 'start'}-storybook`, (0, _filter.default)(_context = ['--config-dir ../node_modules/@redwoodjs/testing/config/storybook', !build && `--port ${port}`, !build && '--no-version-updates', !build && `--static-dir "${staticAssetsFolder}"`, build && `--output-dir "${_path.default.join((0, _internal.getPaths)().web.base, buildDirectory)}"`, !open && '--ci']).call(_context, Boolean), {
    stdio: 'inherit',
    shell: true,
    cwd
  });
};

exports.handler = handler;