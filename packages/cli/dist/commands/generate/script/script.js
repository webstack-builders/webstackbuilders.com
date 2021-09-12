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

var _terminalLink = _interopRequireDefault(require("terminal-link"));

var _structure = require("@redwoodjs/structure");

var _lib = require("../../../lib");

var _colors = _interopRequireDefault(require("../../../lib/colors"));

const TEMPLATE_PATH = _path.default.resolve(__dirname, 'templates', 'script.js.template');

const files = ({
  name,
  typescript = false
}) => {
  const outputFilename = `${name}.${typescript ? 'ts' : 'js'}`;

  const outputPath = _path.default.join((0, _lib.getPaths)().scripts, outputFilename);

  return {
    [outputPath]: _fs.default.readFileSync(TEMPLATE_PATH).toString()
  };
};

exports.files = files;
const command = 'script <name>';
exports.command = command;
const description = 'Generate a command line script';
exports.description = description;

const builder = yargs => {
  yargs.positional('name', {
    description: 'A descriptor of what this script does',
    type: 'string'
  }).option('typescript', {
    alias: 'ts',
    description: 'Generate TypeScript file. Enabled by default if we detect your project is TypeScript',
    type: 'boolean',
    default: (0, _structure.getProject)().isTypeScriptProject
  }).epilogue(`Also see the ${(0, _terminalLink.default)('Redwood CLI Reference', 'https://redwoodjs.com/reference/command-line-interface')}`);
};

exports.builder = builder;

const handler = async args => {
  var _context;

  const POST_RUN_INSTRUCTIONS = `Next steps...\n\n   ${_colors.default.warning('After modifying your script, you can invoke it like:')}

     yarn rw exec ${args.name}

     yarn rw exec ${args.name} --param1 true
`;
  const tasks = new _listr.default((0, _filter.default)(_context = [{
    title: 'Generating script file...',
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