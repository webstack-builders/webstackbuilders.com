"use strict";

var _Object$defineProperty = require("@babel/runtime-corejs3/core-js/object/define-property");

var _interopRequireDefault = require("@babel/runtime-corejs3/helpers/interopRequireDefault").default;

_Object$defineProperty(exports, "__esModule", {
  value: true
});

exports.handler = exports.builder = exports.description = exports.command = exports.files = void 0;

var _filter = _interopRequireDefault(require("@babel/runtime-corejs3/core-js/instance/filter"));

var _fs = _interopRequireDefault(require("fs"));

var _path = _interopRequireDefault(require("path"));

var _listr = _interopRequireDefault(require("listr"));

var _paramCase = require("param-case");

var _terminalLink = _interopRequireDefault(require("terminal-link"));

var _lib = require("../../../lib");

var _colors = _interopRequireDefault(require("../../../lib/colors"));

const POST_RUN_INSTRUCTIONS = `Next steps...\n\n   ${_colors.default.warning('After writing your migration, you can run it with:')}

     yarn rw dataMigrate up
`;

const TEMPLATE_PATH = _path.default.resolve(__dirname, 'templates', 'dataMigration.js.template');

const files = ({
  name
}) => {
  const now = new Date().toISOString();
  const timestamp = now.split('.')[0].replace(/\D/g, '');
  const outputFilename = `${timestamp}-${(0, _paramCase.paramCase)(name)}.js`;

  const outputPath = _path.default.join((0, _lib.getPaths)().api.dataMigrations, outputFilename);

  return {
    [outputPath]: _fs.default.readFileSync(TEMPLATE_PATH).toString()
  };
};

exports.files = files;
const command = 'dataMigration <name>';
exports.command = command;
const description = 'Generate a data migration';
exports.description = description;

const builder = yargs => {
  yargs.positional('name', {
    description: 'A descriptor of what this data migration does',
    type: 'string'
  }).epilogue(`Also see the ${(0, _terminalLink.default)('Redwood CLI Reference', 'https://redwoodjs.com/reference/command-line-interface#generate-auth')}`);
};

exports.builder = builder;

const handler = async args => {
  var _context;

  const tasks = new _listr.default((0, _filter.default)(_context = [{
    title: 'Generating data migration file...',
    task: () => {
      return (0, _lib.writeFilesTask)(files(args));
    }
  }, {
    title: 'Next steps...',
    task: (_ctx, task) => {
      task.title = POST_RUN_INSTRUCTIONS;
    }
  }]).call(_context, Boolean), {
    collapse: false
  });

  try {
    await tasks.run();
  } catch (e) {
    console.log(_colors.default.error(e.message));
    process.exit(1);
  }
};

exports.handler = handler;