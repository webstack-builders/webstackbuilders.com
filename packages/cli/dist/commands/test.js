"use strict";

var _Object$defineProperty = require("@babel/runtime-corejs3/core-js/object/define-property");

var _interopRequireDefault = require("@babel/runtime-corejs3/helpers/interopRequireDefault").default;

_Object$defineProperty(exports, "__esModule", {
  value: true
});

exports.handler = exports.builder = exports.description = exports.command = void 0;

var _flatMap = _interopRequireDefault(require("@babel/runtime-corejs3/core-js/instance/flat-map"));

var _keys = _interopRequireDefault(require("@babel/runtime-corejs3/core-js/object/keys"));

var _includes = _interopRequireDefault(require("@babel/runtime-corejs3/core-js/instance/includes"));

var _filter = _interopRequireDefault(require("@babel/runtime-corejs3/core-js/instance/filter"));

var _forEach = _interopRequireDefault(require("@babel/runtime-corejs3/core-js/instance/for-each"));

var _execa = _interopRequireDefault(require("execa"));

var _terminalLink = _interopRequireDefault(require("terminal-link"));

var _internal = require("@redwoodjs/internal");

var _structure = require("@redwoodjs/structure");

var _lib = require("../lib");

// https://github.com/facebook/create-react-app/blob/cbad256a4aacfc3084be7ccf91aad87899c63564/packages/react-scripts/scripts/test.js#L39
function isInGitRepository() {
  try {
    _execa.default.commandSync('git rev-parse --is-inside-work-tree');

    return true;
  } catch (e) {
    return false;
  }
}

function isInMercurialRepository() {
  try {
    _execa.default.commandSync('hg --cwd . root');

    return true;
  } catch (e) {
    return false;
  }
}

const command = 'test [filter..]';
exports.command = command;
const description = 'Run Jest tests. Defaults to watch mode';
exports.description = description;

const builder = yargs => {
  yargs.strict(false) // so that we can forward arguments to jest
  .positional('filter', {
    default: (0, _structure.getProject)().sides,
    description: 'Which side(s) to test, and/or a regular expression to match against your test files to filter by',
    type: 'array'
  }).option('watch', {
    describe: 'Run tests related to changed files based on hg/git. Specify the name or path to a file to focus on a specific set of tests',
    type: 'boolean',
    default: true
  }).option('collect-coverage', {
    describe: 'Show test coverage summary and output info to coverage directory',
    type: 'boolean',
    default: false
  }).option('db-push', {
    describe: "Syncs the test database with your Prisma schema without requiring a migration. It creates a test database if it doesn't already exist.",
    type: 'boolean',
    default: true
  }).epilogue(`Also see the ${(0, _terminalLink.default)('Redwood CLI Reference', 'https://redwoodjs.com/reference/command-line-interface#test')}`);
};

exports.builder = builder;

const handler = async ({
  filter: filterParams = [],
  watch = true,
  collectCoverage = false,
  dbPush = true,
  ...others
}) => {
  var _context, _context5;

  const rwjsPaths = (0, _lib.getPaths)();
  const forwardJestFlags = (0, _flatMap.default)(_context = (0, _keys.default)(others)).call(_context, flagName => {
    var _context2;

    if ((0, _includes.default)(_context2 = ['watch', 'collect-coverage', 'db-push', '$0', '_']).call(_context2, flagName)) {
      // filter out flags meant for the rw test command only
      return [];
    } else {
      // and forward on the other flags
      return [flagName.length > 1 ? `--${flagName}` : `-${flagName}`, others[flagName]];
    }
  }); // Only the side params

  const sides = (0, _filter.default)(filterParams).call(filterParams, filterString => {
    var _context3;

    return (0, _includes.default)(_context3 = (0, _structure.getProject)().sides).call(_context3, filterString);
  }); // All the other params, apart from sides

  const jestFilterArgs = [...(0, _filter.default)(filterParams).call(filterParams, filterString => {
    var _context4;

    return !(0, _includes.default)(_context4 = (0, _structure.getProject)().sides).call(_context4, filterString);
  })];
  const jestArgs = (0, _filter.default)(_context5 = [...jestFilterArgs, ...forwardJestFlags, collectCoverage ? '--collectCoverage' : null, '--passWithNoTests', ...jestFilterArgs, (0, _includes.default)(sides).call(sides, 'api') && '--runInBand']).call(_context5, flagOrValue => flagOrValue !== null); // Filter out nulls, not booleans because user may have passed a --something false flag
  // If the user wants to watch, set the proper watch flag based on what kind of repo this is
  // because of https://github.com/facebook/create-react-app/issues/5210

  if (watch && !process.env.CI && !collectCoverage) {
    const hasSourceControl = isInGitRepository() || isInMercurialRepository();
    jestArgs.push(hasSourceControl ? '--watch' : '--watchAll');
  } // if no sides declared with yargs, default to all sides


  if (!sides.length) {
    var _context6;

    (0, _forEach.default)(_context6 = (0, _structure.getProject)().sides).call(_context6, side => sides.push(side));
  }

  jestArgs.push('--config', `"${require.resolve('@redwoodjs/testing/config/jest/jest.config.js')}"`);

  if (sides.length > 0) {
    jestArgs.push('--projects', ...sides);
  }

  try {
    const cacheDirDb = `file:${(0, _internal.ensurePosixPath)(rwjsPaths.generated.base)}/test.db`;
    const DATABASE_URL = process.env.TEST_DATABASE_URL || cacheDirDb;

    if ((0, _includes.default)(sides).call(sides, 'api') && dbPush) {
      // Sync||create test database
      await (0, _execa.default)(`yarn rw`, ['prisma db push', '--force-reset', '--accept-data-loss'], {
        cwd: rwjsPaths.api.base,
        stdio: 'inherit',
        shell: true,
        env: {
          DATABASE_URL
        }
      });
    } // **NOTE** There is no official way to run Jest programmatically,
    // so we're running it via execa, since `jest.run()` is a bit unstable.
    // https://github.com/facebook/jest/issues/5048


    await (0, _execa.default)('yarn jest', jestArgs, {
      cwd: rwjsPaths.base,
      shell: true,
      stdio: 'inherit',
      env: {
        DATABASE_URL
      }
    });
  } catch (e) {
    // Errors already shown from execa inherited stderr
    process.exit((e === null || e === void 0 ? void 0 : e.exitCode) || 1);
  }
};

exports.handler = handler;