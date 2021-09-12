#!/usr/bin/env node
"use strict";

var _Object$defineProperty = require("@babel/runtime-corejs3/core-js/object/define-property");

var _interopRequireWildcard = require("@babel/runtime-corejs3/helpers/interopRequireWildcard").default;

var _interopRequireDefault = require("@babel/runtime-corejs3/helpers/interopRequireDefault").default;

_Object$defineProperty(exports, "__esModule", {
  value: true
});

exports.copyFiles = exports.fixProjectBinaries = exports.fixBinaryPermissions = exports.resolveFrameworkPath = void 0;

var _forEach = _interopRequireDefault(require("@babel/runtime-corejs3/core-js/instance/for-each"));

var _map = _interopRequireDefault(require("@babel/runtime-corejs3/core-js/instance/map"));

var _keys = _interopRequireDefault(require("@babel/runtime-corejs3/core-js/object/keys"));

var _filter = _interopRequireDefault(require("@babel/runtime-corejs3/core-js/instance/filter"));

var _reduce = _interopRequireDefault(require("@babel/runtime-corejs3/core-js/instance/reduce"));

var _includes = _interopRequireDefault(require("@babel/runtime-corejs3/core-js/instance/includes"));

var _stringify = _interopRequireDefault(require("@babel/runtime-corejs3/core-js/json/stringify"));

var _fs = _interopRequireDefault(require("fs"));

var _path = _interopRequireDefault(require("path"));

var _boxen = _interopRequireDefault(require("boxen"));

var _chokidar = _interopRequireDefault(require("chokidar"));

var _execa = _interopRequireDefault(require("execa"));

var _lodash = _interopRequireWildcard(require("lodash"));

var _prettier = _interopRequireDefault(require("prettier"));

var _rimraf = _interopRequireDefault(require("rimraf"));

var _yargs = _interopRequireDefault(require("yargs"));

var _internal = require("@redwoodjs/internal");

var _colors = _interopRequireDefault(require("./lib/colors"));

const RW_BINS = {
  redwood: 'cli/dist/index.js',
  rw: 'cli/dist/index.js',
  'redwood-tools': 'cli/dist/redwood-tools.js',
  rwt: 'cli/dist/redwood-tools.js',
  'dev-server': 'dev-server/dist/main.js',
  'api-server': 'api-server/dist/index.js',
  'rw-api-server': 'api-server/dist/index.js',
  'rw-api-build': 'core/esbuild/index.js',
  'rw-gen': 'internal/dist/generate/generate.js',
  'rw-gen-watch': 'internal/dist/generate/watch.js'
};

const resolveFrameworkPath = RW_PATH => {
  if (!_fs.default.existsSync(RW_PATH)) {
    console.error(`Error: '${RW_PATH}' does not exist`);
    process.exit(1);
  }

  return _path.default.resolve(process.cwd(), RW_PATH);
};

exports.resolveFrameworkPath = resolveFrameworkPath;

const fixBinaryPermissions = PROJECT_PATH => {
  var _context, _context2;

  (0, _forEach.default)(_context = (0, _map.default)(_context2 = (0, _keys.default)(RW_BINS)).call(_context2, name => {
    return _path.default.join(PROJECT_PATH, 'node_modules/.bin/', name);
  })).call(_context, binFile => {
    try {
      _fs.default.chmodSync(binFile, '755');
    } catch (e) {
      console.warn(`Warning: Could not chmod ${binFile}`);
      console.log(e);
    }
  });
};

exports.fixBinaryPermissions = fixBinaryPermissions;

const fixProjectBinaries = PROJECT_PATH => {
  var _context3, _context4;

  (0, _forEach.default)(_context3 = (0, _map.default)(_context4 = (0, _keys.default)(RW_BINS)).call(_context4, name => {
    const from = _path.default.join(PROJECT_PATH, 'node_modules/.bin/', name);

    const to = _path.default.join(PROJECT_PATH, 'node_modules/@redwoodjs', RW_BINS[name]);

    console.log(`symlink '${from}' -> '${to}'`);
    return [from, to];
  })).call(_context3, ([from, to]) => {
    try {
      _fs.default.unlinkSync(from);
    } catch (e) {
      console.warn(`Warning: Could not unlink ${from}`);
    }

    try {
      _fs.default.symlinkSync(to, from);
    } catch (e) {
      console.warn(`Warning: Could not symlink ${from} -> ${to}`);
      console.log(e);
    }

    try {
      _fs.default.chmodSync(from, '755');
    } catch (e) {
      console.warn(`Warning: Could not chmod ${from}`);
      console.log(e);
    }
  });
};

exports.fixProjectBinaries = fixProjectBinaries;

const copyFiles = async (src, dest) => {
  // TODO: Figure out if we need to only run based on certain events.
  src = (0, _internal.ensurePosixPath)(src);
  dest = (0, _internal.ensurePosixPath)(dest);
  await (0, _execa.default)('rsync', [`-rtvu --delete --exclude "create-redwood-app/template"`, `'${src}'`, `'${dest}'`], {
    shell: true,
    stdio: 'inherit',
    cleanup: true
  }); // when rsync is run modify the permission to make binaries executable.

  fixProjectBinaries((0, _internal.getPaths)().base);
};

exports.copyFiles = copyFiles;

const rwtCopy = ({
  RW_PATH = process.env.RW_PATH
}) => {
  RW_PATH = resolveFrameworkPath(RW_PATH);
  console.log(`Redwood Framework Path: ${_colors.default.info(RW_PATH)}`);
  const src = `${RW_PATH}/packages/`;
  const dest = `${(0, _internal.getPaths)().base}/node_modules/@redwoodjs/`; // eslint-disable-line

  copyFiles(src, dest);
};

const rwtCopyWatch = ({
  RW_PATH = process.env.RW_PATH
}) => {
  RW_PATH = resolveFrameworkPath(RW_PATH);
  console.log(`Redwood Framework Path: ${_colors.default.info(RW_PATH)}`);
  const src = `${RW_PATH}/packages/`;
  const dest = `${(0, _internal.getPaths)().base}/node_modules/@redwoodjs/`;

  _chokidar.default.watch(src, {
    persistent: true,
    recursive: true,
    ignored: [_path.default.join(src, 'packages/create-redwood-app/template')]
  }).on('all', _lodash.default.debounce(event => {
    // TODO: Figure out if we need to only run based on certain events.
    console.log('Trigger event: ', event);
    copyFiles(src, dest);
  }, 500));
};

const rwtLink = async yargs => {
  const RW_PATH = yargs.RW_PATH || process.env.RW_PATH;
  const {
    clean,
    watch,
    only
  } = yargs;

  if (!RW_PATH) {
    console.error(_colors.default.error('You must specify a path to your local redwood repo'));
    console.error(_colors.default.error("Or set RW_PATH in your shell's environment"));
    process.exit(1);
    return;
  }

  const frameworkPath = resolveFrameworkPath(RW_PATH);
  console.log(`\n Redwood Framework Path: ${_colors.default.info(frameworkPath)}`);

  const frameworkPackagesPath = _path.default.join(frameworkPath, 'packages/');

  const projectPackagesPath = _path.default.join((0, _internal.getPaths)().base, 'node_modules/_redwood-linked-packages');

  console.log(`Copying your local Redwood build from ${_colors.default.info(frameworkPackagesPath)} \n`);

  if (!_fs.default.existsSync(projectPackagesPath)) {
    _fs.default.mkdirSync(projectPackagesPath);
  }

  updateProjectWithResolutions(frameworkPackagesPath);

  if (clean) {
    await (0, _execa.default)('yarn build:clean', {
      shell: true,
      stdio: 'inherit',
      cleanup: true,
      cwd: frameworkPath
    });
  } // Inform user to unlink framework repo, when process cancelled


  process.on('SIGINT', () => {
    const message = `
    🙏  Thanks for contributing..\n
    Please run ${_colors.default.green('yarn rwt unlink')} to restore your project
    `;
    console.log((0, _boxen.default)(message, {
      padding: {
        top: 0,
        bottom: 0,
        right: 1,
        left: 1
      },
      margin: 1,
      borderColour: 'gray'
    }));
  });
  const onlyParams = only ? ['--only', only] : [];
  await (0, _execa.default)('node ./tasks/build-and-copy', ['--dest', `"${projectPackagesPath}"`, ...onlyParams], {
    shell: true,
    stdio: 'inherit',
    cleanup: true,
    cwd: frameworkPath
  }); // Delete existing redwood folders in node_modules
  // Do this right before install, incase build:link fails

  _rimraf.default.sync(_path.default.join((0, _internal.getPaths)().base, 'node_modules/@redwoodjs/')); // Let workspaces do the link


  await (0, _execa.default)('yarn install', ['--pure-lockfile', '--check-files'], {
    shell: true,
    stdio: 'inherit',
    cleanup: true,
    cwd: (0, _internal.getPaths)().base
  });
  fixBinaryPermissions((0, _internal.getPaths)().base);
  const message = `
  ${_colors.default.bold('🚀 Go Forth and Contribute!')}\n
  🔗  Your project is linked!\n
  Contributing doc: ${_colors.default.underline('https://redwoodjs.com/docs/contributing')}
  `;
  console.log((0, _boxen.default)(message, {
    padding: {
      top: 0,
      bottom: 0,
      right: 1,
      left: 1
    },
    margin: 1,
    borderColour: 'gray'
  }));

  if (watch) {
    // Restart build:link scripts in watchmode
    (0, _execa.default)('yarn build:link', ['--dest', `"${projectPackagesPath}"`, '--watch', ...onlyParams], {
      shell: true,
      stdio: 'inherit',
      cleanup: true,
      cwd: frameworkPath
    });
  }
}; // This should be synchronous


const rwtUnlink = () => {
  const linkedPackagesPath = _path.default.join((0, _internal.getPaths)().base, 'node_modules/_redwood-linked-packages');

  if (_fs.default.existsSync(linkedPackagesPath)) {
    // remove resolutions we added in link
    updateProjectWithResolutions(linkedPackagesPath, true);

    _rimraf.default.sync(_path.default.join((0, _internal.getPaths)().base, 'node_modules/@redwoodjs'));

    _rimraf.default.sync(linkedPackagesPath);
  }

  _execa.default.sync('yarn install', ['--check-files'], {
    shell: true,
    stdio: 'inherit',
    cleanup: true,
    cwd: (0, _internal.getPaths)().base
  });

  return process.exit(0);
};

const rwtInstall = ({
  packageName
}) => {
  // This command upgrades a Redwood package from the local NPM registry. You
  // run the local registry from `./tasks/run-local-npm`.
  // See `CONTRIBUTING.md` for more information.
  const pkgPath = _path.default.join((0, _internal.getPaths)().base, 'node_modules', packageName);

  console.log(`Deleting ${pkgPath}`);

  try {
    _fs.default.rmdirSync(pkgPath, {
      recursive: true
    });
  } catch (e) {
    console.error(`Error: Could not delete ${pkgPath}`);
    process.exit(1);
  }

  (0, _execa.default)('yarn', ['upgrade', `${packageName}@dev`, '--no-lockfile', '--registry http://localhost:4873/', '--check-files'], {
    shell: true,
    cwd: (0, _internal.getPaths)().base,
    stdio: 'inherit',
    extendEnv: true,
    cleanup: true
  });
};

const getRwPackagesToLink = packagesPath => {
  var _context5, _context6;

  const packageFolders = _fs.default.readdirSync(packagesPath);

  return (0, _map.default)(_context5 = (0, _filter.default)(_context6 = (0, _filter.default)(packageFolders).call(packageFolders, folderName => folderName !== 'create-redwood-app')).call(_context6, item => !/(^|\/)\.[^\/\.]/g.test(item)) // filter hidden files
  ).call(_context5, packageFolder => {
    return `@redwoodjs/${packageFolder}`;
  });
};

const updateProjectWithResolutions = (redwoodPackagesPath, remove) => {
  var _context7;

  const pkgJSONPath = _path.default.join((0, _internal.getPaths)().base, 'package.json');

  const packageJSON = require(pkgJSONPath);

  const frameworkVersion = require(_path.default.join(redwoodPackagesPath, 'cli/package.json')).version;

  const frameworkRepoResolutions = (0, _reduce.default)(_context7 = getRwPackagesToLink(redwoodPackagesPath)).call(_context7, (resolutions, packageName) => {
    resolutions[packageName] = frameworkVersion;
    return resolutions;
  }, {});
  let resolutions = packageJSON.resolutions;
  let packages = packageJSON.workspaces.packages;

  if (remove) {
    resolutions = (0, _lodash.omit)(resolutions, (0, _keys.default)(frameworkRepoResolutions));
    packages = (0, _filter.default)(packages).call(packages, workspaceFolder => workspaceFolder !== 'node_modules/_redwood-linked-packages/*');
  } else {
    resolutions = { ...resolutions,
      ...frameworkRepoResolutions
    };

    if (!(0, _includes.default)(packages).call(packages, 'node_modules/_redwood-linked-packages/*')) {
      packages.push('node_modules/_redwood-linked-packages/*');
    }
  }

  const updatedPackageJSON = { ...packageJSON,
    workspaces: {
      packages
    },
    resolutions
  };

  _fs.default.writeFileSync(pkgJSONPath, _prettier.default.format((0, _stringify.default)(updatedPackageJSON), {
    parser: 'json-stringify'
  }));
}; // eslint-disable-next-line no-unused-expressions


_yargs.default.command(['copy [RW_PATH]', 'cp'], 'Copy the Redwood Framework path to this project', {}, rwtCopy).command(['copy:watch [RW_PATH]', 'cpw'], 'Watch the Redwood Framework path for changes and copy them over to this project', {}, rwtCopyWatch).command({
  command: 'link [RW_PATH]',
  aliases: ['l'],
  builder: yargs => {
    return yargs.option('clean', {
      alias: 'c',
      type: 'boolean',
      description: 'Clean the redwood dist folders first.',
      default: true
    }).option('watch', {
      alias: 'w',
      type: 'boolean',
      description: 'Build and watch the supplied redwood repo',
      default: true
    }).option('only', {
      alias: 'only',
      type: 'string',
      description: 'Specify folder to link from RW_PATH/packages'
    });
  },
  desc: 'Run your local version of redwood in this project',
  handler: rwtLink
}).command({
  command: 'unlink',
  desc: 'Unlink your local version of redwood, and use the one specified in package.json',
  handler: rwtUnlink
}).command(['install [packageName]', 'i'], 'Install a package from your local NPM registry', () => {}, rwtInstall).command(['fix-bins', 'fix'], 'Fix Redwood symlinks and permissions', {}, () => {
  fixProjectBinaries((0, _internal.getPaths)().base);
}).demandCommand().strict().argv;