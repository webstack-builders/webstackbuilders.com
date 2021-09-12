"use strict";

var _Object$defineProperty = require("@babel/runtime-corejs3/core-js/object/define-property");

var _interopRequireDefault = require("@babel/runtime-corejs3/helpers/interopRequireDefault").default;

_Object$defineProperty(exports, "__esModule", {
  value: true
});

exports.builder = exports.command = void 0;

var _slice = _interopRequireDefault(require("@babel/runtime-corejs3/core-js/instance/slice"));

var _terminalLink = _interopRequireDefault(require("terminal-link"));

var _colors = _interopRequireDefault(require("../lib/colors"));

const command = 'db [...commands]'; // TO DO: Description

exports.command = command;

const builder = () => {
  var _context;

  // yargs.help(false)
  const argv = (0, _slice.default)(_context = process.argv).call(_context, 2);

  const deprecationMessage = (newCommand, fullLine = false) => {
    try {
      console.log(_colors.default.warning('\n' + 'WARNING: deprecated command'));

      if (fullLine) {
        console.log(newCommand);
      } else {
        console.log('Please use the new command: ' + _colors.default.green(`yarn rw prisma ${newCommand} \n`));
      }

      console.log(`See the ${(0, _terminalLink.default)('Redwood CLI Reference', 'https://redwoodjs.com/docs/cli-commands#prisma')} \n`);
    } catch (e) {
      console.log(_colors.default.error(e.message));
    }
  };

  switch (argv[1]) {
    case 'help':
      deprecationMessage("'yarn rw db' commands are deprecated \n" + "See 'yarn rw prisma --help' for new commands  \n", true);
      break;

    case 'up':
      deprecationMessage('migrate dev');
      break;

    case 'down':
      deprecationMessage(`Prisma Migrate no longer supports down migrations \n \n` + `See possible alternative ${(0, _terminalLink.default)('Migration Flows', 'https://www.prisma.io/docs/concepts/components/prisma-migrate/prisma-migrate-flows')} \n`, true);
      break;

    case 'generate':
      deprecationMessage('generate');
      break;

    case 'introspect':
      deprecationMessage('introspect');
      break;

    case 'seed':
      deprecationMessage('db seed');
      break;

    case 'studio':
      deprecationMessage('studio');
      break;

    case 'save':
      deprecationMessage('migrate dev');
      break;
  }
};

exports.builder = builder;