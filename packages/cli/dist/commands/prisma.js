"use strict";

var _Object$defineProperty = require("@babel/runtime-corejs3/core-js/object/define-property");

var _interopRequireDefault = require("@babel/runtime-corejs3/helpers/interopRequireDefault").default;

_Object$defineProperty(exports, "__esModule", {
  value: true
});

exports.handler = exports.builder = exports.description = exports.command = void 0;

var _indexOf = _interopRequireDefault(require("@babel/runtime-corejs3/core-js/instance/index-of"));

var _splice = _interopRequireDefault(require("@babel/runtime-corejs3/core-js/instance/splice"));

var _includes = _interopRequireDefault(require("@babel/runtime-corejs3/core-js/instance/includes"));

var _entries = _interopRequireDefault(require("@babel/runtime-corejs3/core-js/object/entries"));

var _fs = _interopRequireDefault(require("fs"));

var _path = _interopRequireDefault(require("path"));

var _boxen = _interopRequireDefault(require("boxen"));

var _execa = _interopRequireDefault(require("execa"));

var _internal = require("@redwoodjs/internal");

var _colors = _interopRequireDefault(require("../lib/colors"));

const command = 'prisma [commands..]';
exports.command = command;
const description = 'Run Prisma CLI with experimental features';
/**
 * This is a lightweight wrapper around Prisma's CLI with some Redwood CLI modifications.
 */

exports.description = description;

const builder = yargs => {
  // Disable yargs parsing of commands and options because it's forwarded
  // to Prisma CLI.
  yargs.strictOptions(false).strictCommands(false).strict(false).parserConfiguration({
    'camel-case-expansion': false
  }).help(false).version(false);
}; // eslint-disable-next-line no-unused-vars


exports.builder = builder;

const handler = async ({
  _,
  $0,
  commands = [],
  ...options
}) => {
  const rwjsPaths = (0, _internal.getPaths)(); // Prisma only supports '--help', but Redwood CLI supports `prisma <command> help`

  const helpIndex = (0, _indexOf.default)(commands).call(commands, 'help');

  if (helpIndex !== -1) {
    options.help = true;
    (0, _splice.default)(commands).call(commands, helpIndex, 1);
  } // Automatically inject options for some commands.


  const hasHelpOption = options.help || options.h;

  if (!hasHelpOption) {
    var _context;

    if ((0, _includes.default)(_context = ['generate', 'introspect', 'db', 'migrate', 'studio', 'format']).call(_context, commands[0])) {
      if (!_fs.default.existsSync(rwjsPaths.api.dbSchema)) {
        console.error();
        console.error(_colors.default.error('No Prisma Schema found.'));
        console.error(`Redwood searched here '${rwjsPaths.api.dbSchema}'`);
        console.error();
        process.exit(1);
      }

      options.schema = `"${rwjsPaths.api.dbSchema}"`;

      if (commands[1] === 'seed') {
        options['preview-feature'] = true;
      }
    }
  } // Convert command and options into a string that's run via execa


  let args = commands;

  for (const [name, value] of (0, _entries.default)(options)) {
    args.push(`--${name}`);

    if (typeof value !== 'boolean') {
      args.push(value);
    }
  }

  console.log();
  console.log(_colors.default.green('Running Prisma CLI...'));
  console.log(_colors.default.underline('$ yarn prisma ' + args.join(' ')));
  console.log();

  try {
    _execa.default.sync(`"${_path.default.join(rwjsPaths.base, 'node_modules/.bin/prisma')}"`, args, {
      shell: true,
      cwd: rwjsPaths.base,
      stdio: 'inherit',
      cleanup: true
    });

    if (hasHelpOption || commands.length === 0) {
      printWrapInfo();
    }
  } catch (e) {
    process.exit((e === null || e === void 0 ? void 0 : e.exitCode) || 1);
  }
};

exports.handler = handler;

const printWrapInfo = () => {
  const message = [_colors.default.bold('Redwood CLI wraps Prisma CLI'), '', 'Use `yarn rw prisma` to automatically pass `--schema` and `--preview-feature` options.', 'Use `yarn prisma` to skip Redwood CLI automatic options.', '', 'Find more information in our docs:', _colors.default.underline('https://redwoodjs.com/docs/cli-commands#prisma')];
  console.log((0, _boxen.default)(message.join('\n'), {
    padding: {
      top: 0,
      bottom: 0,
      right: 1,
      left: 1
    },
    margin: 1,
    borderColor: 'gray'
  }));
};