"use strict";

var _Object$defineProperty = require("@babel/runtime-corejs3/core-js/object/define-property");

var _interopRequireDefault = require("@babel/runtime-corejs3/helpers/interopRequireDefault").default;

_Object$defineProperty(exports, "__esModule", {
  value: true
});

exports.handler = exports.builder = exports.description = exports.command = void 0;

var _interopRequireWildcard2 = _interopRequireDefault(require("@babel/runtime-corejs3/helpers/interopRequireWildcard"));

var _sort = _interopRequireDefault(require("@babel/runtime-corejs3/core-js/instance/sort"));

var _parseInt2 = _interopRequireDefault(require("@babel/runtime-corejs3/core-js/parse-int"));

var _keys = _interopRequireDefault(require("@babel/runtime-corejs3/core-js/object/keys"));

var _map = _interopRequireDefault(require("@babel/runtime-corejs3/core-js/instance/map"));

var _filter = _interopRequireDefault(require("@babel/runtime-corejs3/core-js/instance/filter"));

var _includes = _interopRequireDefault(require("@babel/runtime-corejs3/core-js/instance/includes"));

var _promise = _interopRequireDefault(require("@babel/runtime-corejs3/core-js/promise"));

var _values = _interopRequireDefault(require("@babel/runtime-corejs3/core-js/object/values"));

var _fs = _interopRequireDefault(require("fs"));

var _path = _interopRequireDefault(require("path"));

var _register = _interopRequireDefault(require("@babel/register"));

var _listr = _interopRequireDefault(require("listr"));

var _listrVerboseRenderer = _interopRequireDefault(require("listr-verbose-renderer"));

var _terminalLink = _interopRequireDefault(require("terminal-link"));

var _lib = require("../../lib");

var _colors = _interopRequireDefault(require("../../lib/colors"));

(0, _register.default)({
  extends: _path.default.join((0, _lib.getPaths)().api.base, '.babelrc.js'),
  extensions: ['.js', '.ts', '.tsx', '.jsx'],
  only: [(0, _lib.getPaths)().base],
  ignore: ['node_modules'],
  cache: false
});

const {
  db
} = require(_path.default.join((0, _lib.getPaths)().api.lib, 'db')); // sorts migrations by date, oldest first


const sortMigrations = migrations => {
  return (0, _sort.default)(migrations).call(migrations, (a, b) => {
    const aVersion = (0, _parseInt2.default)((0, _keys.default)(a)[0]);
    const bVersion = (0, _parseInt2.default)((0, _keys.default)(b)[0]);

    if (aVersion > bVersion) {
      return 1;
    }

    if (aVersion < bVersion) {
      return -1;
    }

    return 0;
  });
}; // Return the list of migrations that haven't run against the database yet


const getMigrations = async () => {
  var _context, _context2;

  const basePath = _path.default.join((0, _lib.getPaths)().api.dataMigrations);

  if (!_fs.default.existsSync(basePath)) {
    return [];
  } // gets all migrations present in the app


  const files = (0, _map.default)(_context = (0, _filter.default)(_context2 = _fs.default.readdirSync(basePath)).call(_context2, m => _path.default.extname(m) === '.js')).call(_context, m => {
    return {
      [m.split('-')[0]]: _path.default.join(basePath, m)
    };
  }); // gets all migration versions that have already run against the database

  const ranMigrations = await db.rW_DataMigration.findMany({
    orderBy: {
      version: 'asc'
    }
  });
  const ranVersions = (0, _map.default)(ranMigrations).call(ranMigrations, migration => migration.version.toString());
  const unrunMigrations = (0, _filter.default)(files).call(files, migration => {
    return !(0, _includes.default)(ranVersions).call(ranVersions, (0, _keys.default)(migration)[0]);
  });
  return sortMigrations(unrunMigrations);
}; // adds data for completed migrations to the DB


const record = async ({
  version,
  name,
  startedAt,
  finishedAt
}) => {
  await db.rW_DataMigration.create({
    data: {
      version,
      name,
      startedAt,
      finishedAt
    }
  });
}; // output run status to the console


const report = counters => {
  console.log('');

  if (counters.run) {
    console.info(_colors.default.green(`${counters.run} data migration(s) completed successfully.`));
  }

  if (counters.error) {
    console.error(_colors.default.error(`${counters.error} data migration(s) exited with errors.`));
  }

  if (counters.skipped) {
    console.warn(_colors.default.warning(`${counters.skipped} data migration(s) skipped due to previous error.`));
  }

  console.log('');
};

const runScript = async scriptPath => {
  const script = await _promise.default.resolve(`${scriptPath}`).then(s => (0, _interopRequireWildcard2.default)(require(s)));
  const startedAt = new Date();
  await script.default({
    db
  });
  const finishedAt = new Date();
  return {
    startedAt,
    finishedAt
  };
};

const command = 'up';
exports.command = command;
const description = 'Run any outstanding Data Migrations against the database';
exports.description = description;

const builder = yargs => {
  yargs.epilogue(`Also see the ${(0, _terminalLink.default)('Redwood CLI Reference', 'https://redwoodjs.com/docs/cli-commands#up')}`);
};

exports.builder = builder;

const handler = async () => {
  const migrations = await getMigrations(); // exit immediately if there aren't any migrations to run

  if (!migrations.length) {
    console.info(_colors.default.green('\nNo data migrations run, already up-to-date.\n'));
    process.exit(0);
  }

  const counters = {
    run: 0,
    skipped: 0,
    error: 0
  };
  const migrationTasks = (0, _map.default)(migrations).call(migrations, migration => {
    const version = (0, _keys.default)(migration)[0];
    const migrationPath = (0, _values.default)(migration)[0];

    const migrationName = _path.default.basename(migrationPath, '.js');

    return {
      title: migrationName,
      skip: () => {
        if (counters.error > 0) {
          counters.skipped++;
          return true;
        }
      },
      task: async () => {
        try {
          const {
            startedAt,
            finishedAt
          } = await runScript(migrationPath);
          counters.run++;
          await record({
            version,
            name: migrationName,
            startedAt,
            finishedAt
          });
        } catch (e) {
          counters.error++;
          console.error(_colors.default.error(`Error in data migration: ${e.message}`));
        }
      }
    };
  });
  const tasks = new _listr.default(migrationTasks, {
    collapse: false,
    renderer: _listrVerboseRenderer.default
  });

  try {
    await tasks.run();
    await db.$disconnect();
    report(counters);
  } catch (e) {
    await db.$disconnect();
    report(counters);
    process.exit((e === null || e === void 0 ? void 0 : e.exitCode) || 1);
  }
};

exports.handler = handler;