"use strict";

var _Object$defineProperty = require("@babel/runtime-corejs3/core-js/object/define-property");

var _interopRequireDefault = require("@babel/runtime-corejs3/helpers/interopRequireDefault").default;

_Object$defineProperty(exports, "__esModule", {
  value: true
});

exports.handler = exports.tasks = exports.builder = exports.description = exports.command = void 0;

var _map = _interopRequireDefault(require("@babel/runtime-corejs3/core-js/instance/map"));

var _listr = _interopRequireDefault(require("listr"));

var _pascalcase = _interopRequireDefault(require("pascalcase"));

var _pluralize = _interopRequireDefault(require("pluralize"));

var _helpers = require("../../generate/helpers");

var _lib = require("../../../lib");

var _colors = _interopRequireDefault(require("../../../lib/colors"));

var _scaffold = require("../../generate/scaffold/scaffold");

const command = 'scaffold <model>';
exports.command = command;
const description = 'Destroy pages, SDL, and Services files based on a given DB schema Model';
exports.description = description;

const removeRoutesWithSet = async ({
  model,
  path,
  nestScaffoldByModel
}) => {
  const routes = await (0, _scaffold.routes)({
    model,
    path,
    nestScaffoldByModel
  });
  const routeNames = (0, _map.default)(routes).call(routes, extractRouteName);
  const pluralPascalName = (0, _pascalcase.default)((0, _pluralize.default)(model));
  const layoutName = `${pluralPascalName}Layout`;
  return (0, _lib.removeRoutesFromRouterTask)(routeNames, layoutName);
};

const removeSetImport = () => {
  const routesPath = (0, _lib.getPaths)().web.routes;
  const routesContent = (0, _lib.readFile)(routesPath).toString();

  if (routesContent.match('<Set')) {
    return 'Skipping removal of Set import in Routes.{js,tsx}';
  }

  const [redwoodRouterImport] = routesContent.match(/import {[^]*} from '@redwoodjs\/router'/);
  const removedSetImport = redwoodRouterImport.replace(/,*\s*Set,*/, '');
  const newRoutesContent = routesContent.replace(redwoodRouterImport, removedSetImport);
  (0, _lib.writeFile)(routesPath, newRoutesContent, {
    overwriteExisting: true
  });
  return 'Removed Set import in Routes.{js,tsx}';
};

const removeLayoutImport = ({
  model: name,
  path: scaffoldPath = ''
}) => {
  var _context;

  const pluralPascalName = (0, _pascalcase.default)((0, _pluralize.default)(name));
  const pascalScaffoldPath = scaffoldPath === '' ? scaffoldPath : (0, _map.default)(_context = scaffoldPath.split('/')).call(_context, _pascalcase.default).join('/') + '/';
  const layoutName = `${pluralPascalName}Layout`;
  const importLayout = `import ${pluralPascalName}Layout from 'src/layouts/${pascalScaffoldPath}${layoutName}'`;
  const routesPath = (0, _lib.getPaths)().web.routes;
  const routesContent = (0, _lib.readFile)(routesPath).toString();
  const newRoutesContent = routesContent.replace(new RegExp(`\\s*${importLayout}`), '');
  (0, _lib.writeFile)(routesPath, newRoutesContent, {
    overwriteExisting: true
  });
  return 'Removed layout import from Routes.{js,tsx}';
};

const builder = yargs => {
  yargs.positional('model', {
    description: 'Model to destroy the scaffold of',
    type: 'string'
  });
};

exports.builder = builder;

const tasks = ({
  model,
  path,
  tests,
  nestScaffoldByModel
}) => new _listr.default([{
  title: 'Destroying scaffold files...',
  task: async () => {
    const f = await (0, _scaffold.files)({
      model,
      path,
      tests,
      nestScaffoldByModel
    });
    return (0, _lib.deleteFilesTask)(f);
  }
}, {
  title: 'Cleaning up scaffold routes...',
  task: async () => removeRoutesWithSet({
    model,
    path,
    nestScaffoldByModel
  })
}, {
  title: 'Removing set import...',
  task: () => removeSetImport()
}, {
  title: 'Removing layout import...',
  task: () => removeLayoutImport({
    model,
    path
  })
}], {
  collapse: false,
  exitOnError: true
});

exports.tasks = tasks;

const handler = async ({
  model: modelArg
}) => {
  const {
    model,
    path
  } = (0, _scaffold.splitPathAndModel)(modelArg);
  await (0, _helpers.ensureUniquePlural)({
    model,
    inDestroyer: true
  });
  const t = tasks({
    model,
    path
  });

  try {
    await t.run();
  } catch (e) {
    console.log(_colors.default.error(e.message));
  }
};

exports.handler = handler;

const extractRouteName = route => {
  const {
    groups
  } = route.match(/.*name="?(?<routeName>\w+)"?/);
  return groups.routeName;
};