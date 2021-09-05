"use strict";

var _Object$defineProperty = require("@babel/runtime-corejs3/core-js/object/define-property");

var _interopRequireDefault = require("@babel/runtime-corejs3/helpers/interopRequireDefault").default;

_Object$defineProperty(exports, "__esModule", {
  value: true
});

exports.splitPathAndModel = exports.handler = exports.builder = exports.description = exports.command = exports.routes = exports.files = void 0;

var _find = _interopRequireDefault(require("@babel/runtime-corejs3/core-js/instance/find"));

var _map = _interopRequireDefault(require("@babel/runtime-corejs3/core-js/instance/map"));

var _forEach = _interopRequireDefault(require("@babel/runtime-corejs3/core-js/instance/for-each"));

var _includes = _interopRequireDefault(require("@babel/runtime-corejs3/core-js/instance/includes"));

var _filter = _interopRequireDefault(require("@babel/runtime-corejs3/core-js/instance/filter"));

var _indexOf = _interopRequireDefault(require("@babel/runtime-corejs3/core-js/instance/index-of"));

var _keys = _interopRequireDefault(require("@babel/runtime-corejs3/core-js/object/keys"));

var _reduce = _interopRequireDefault(require("@babel/runtime-corejs3/core-js/instance/reduce"));

var _entries = _interopRequireDefault(require("@babel/runtime-corejs3/core-js/object/entries"));

var _slice = _interopRequireDefault(require("@babel/runtime-corejs3/core-js/instance/slice"));

var _fs = _interopRequireDefault(require("fs"));

var _path = _interopRequireDefault(require("path"));

var _camelcase = _interopRequireDefault(require("camelcase"));

var _humanizeString = _interopRequireDefault(require("humanize-string"));

var _listr = _interopRequireDefault(require("listr"));

var _paramCase = require("param-case");

var _pascalcase = _interopRequireDefault(require("pascalcase"));

var _pluralize = _interopRequireDefault(require("pluralize"));

var _terminalLink = _interopRequireDefault(require("terminal-link"));

var _internal = require("@redwoodjs/internal");

var _lib = require("../../../lib");

var _colors = _interopRequireDefault(require("../../../lib/colors"));

var _generate = require("../../generate");

var _helpers = require("../helpers");

var _sdl = require("../sdl/sdl");

var _service = require("../service/service");

const NON_EDITABLE_COLUMNS = ['id', 'createdAt', 'updatedAt'];
const SCAFFOLD_STYLE_PATH = './scaffold.css'; // Any assets that should not trigger an overwrite error and require a --force

const SKIPPABLE_ASSETS = ['scaffold.css'];
const PACKAGE_SET = 'Set';

const getIdType = model => {
  var _model$fields$find, _context;

  return (_model$fields$find = (0, _find.default)(_context = model.fields).call(_context, field => field.isId)) === null || _model$fields$find === void 0 ? void 0 : _model$fields$find.type;
};

const getImportComponentNames = (name, scaffoldPath, nestScaffoldByModel = true) => {
  const pluralName = (0, _pascalcase.default)((0, _pluralize.default)(name));
  const singularName = (0, _pascalcase.default)(_pluralize.default.singular(name));
  let componentPath;
  let layoutPath;

  if (scaffoldPath === '') {
    componentPath = nestScaffoldByModel ? `src/components/${singularName}` : `src/components`;
    layoutPath = `src/layouts`;
  } else {
    var _context2;

    const sP = (0, _map.default)(_context2 = scaffoldPath.split('/')).call(_context2, _pascalcase.default).join('/');
    componentPath = nestScaffoldByModel ? `src/components/${sP}/${singularName}` : `src/components/${sP}`;
    layoutPath = `src/layouts/${sP}`;
  }

  return {
    importComponentName: `${componentPath}/${singularName}`,
    importComponentNameCell: `${componentPath}/${singularName}Cell`,
    importComponentEditNameCell: `${componentPath}/Edit${singularName}Cell`,
    importComponentNameForm: `${componentPath}/${singularName}Form`,
    importComponentNewName: `${componentPath}/New${singularName}`,
    importComponentNames: `${componentPath}/${pluralName}`,
    importComponentNamesCell: `${componentPath}/${pluralName}Cell`,
    importLayoutNames: `${layoutPath}/${pluralName}Layout`
  };
}; // Includes imports from getImportComponentNames()


const getTemplateStrings = (name, scaffoldPath, nestScaffoldByModel = true) => {
  const pluralPascalName = (0, _pascalcase.default)((0, _pluralize.default)(name));
  const singularPascalName = (0, _pascalcase.default)(_pluralize.default.singular(name));
  const pluralCamelName = (0, _camelcase.default)(pluralPascalName);
  const singularCamelName = (0, _camelcase.default)(singularPascalName);
  const camelScaffoldPath = (0, _camelcase.default)((0, _pascalcase.default)(scaffoldPath));
  return {
    pluralRouteName: scaffoldPath === '' ? pluralCamelName : `${camelScaffoldPath}${pluralPascalName}`,
    editRouteName: scaffoldPath === '' ? `edit${singularPascalName}` : `${camelScaffoldPath}Edit${singularPascalName}`,
    singularRouteName: scaffoldPath === '' ? singularCamelName : `${camelScaffoldPath}${singularPascalName}`,
    newRouteName: scaffoldPath === '' ? `new${singularPascalName}` : `${camelScaffoldPath}New${singularPascalName}`,
    ...getImportComponentNames(name, scaffoldPath, nestScaffoldByModel)
  };
};

const files = async ({
  model: name,
  path: scaffoldPath = '',
  tests = true,
  typescript = false,
  nestScaffoldByModel
}) => {
  var _context3;

  const model = await (0, _lib.getSchema)((0, _pascalcase.default)(_pluralize.default.singular(name)));

  if (typeof nestScaffoldByModel === 'undefined') {
    nestScaffoldByModel = (0, _internal.getConfig)().generate.nestScaffoldByModel;
  }

  const templateStrings = getTemplateStrings(name, scaffoldPath, nestScaffoldByModel);
  const pascalScaffoldPath = scaffoldPath === '' ? scaffoldPath : (0, _map.default)(_context3 = scaffoldPath.split('/')).call(_context3, _pascalcase.default).join('/') + '/';
  return { ...(await componentFiles(name, pascalScaffoldPath, typescript, nestScaffoldByModel, templateStrings)),
    ...(await (0, _sdl.files)({ ...(0, _lib.getDefaultArgs)(_sdl.builder),
      name,
      crud: true,
      typescript
    })),
    ...(await (0, _service.files)({ ...(0, _lib.getDefaultArgs)(_service.builder),
      name,
      crud: true,
      relations: (0, _helpers.relationsForModel)(model),
      tests,
      typescript
    })),
    ...assetFiles(name),
    ...layoutFiles(name, pascalScaffoldPath, typescript, templateStrings),
    ...pageFiles(name, pascalScaffoldPath, typescript, nestScaffoldByModel, templateStrings)
  };
};

exports.files = files;

const assetFiles = name => {
  let fileList = {};

  const assets = _fs.default.readdirSync(_path.default.join(_lib.templateRoot, 'scaffold', 'templates', 'assets'));

  (0, _forEach.default)(assets).call(assets, asset => {
    const outputAssetName = asset.replace(/\.template/, '');

    const outputPath = _path.default.join((0, _lib.getPaths)().web.src, outputAssetName); // skip assets that already exist on disk, never worry about overwriting


    if (!(0, _includes.default)(SKIPPABLE_ASSETS).call(SKIPPABLE_ASSETS, _path.default.basename(outputPath)) || !_fs.default.existsSync(outputPath)) {
      const template = (0, _lib.generateTemplate)(_path.default.join('scaffold', 'templates', 'assets', asset), {
        name
      });
      fileList[outputPath] = template;
    }
  });
  return fileList;
};

const layoutFiles = (name, pascalScaffoldPath = '', generateTypescript, templateStrings) => {
  const pluralName = (0, _pascalcase.default)((0, _pluralize.default)(name));
  const singularName = (0, _pascalcase.default)(_pluralize.default.singular(name));
  let fileList = {};

  const layouts = _fs.default.readdirSync(_path.default.join(_lib.templateRoot, 'scaffold', 'templates', 'layouts'));

  (0, _forEach.default)(layouts).call(layouts, layout => {
    const outputLayoutName = layout.replace(/Names/, pluralName).replace(/Name/, singularName).replace(/\.js\.template/, generateTypescript ? '.tsx' : '.js');

    const outputPath = _path.default.join((0, _lib.getPaths)().web.layouts, pascalScaffoldPath, outputLayoutName.replace(/\.(js|tsx?)/, ''), outputLayoutName);

    const template = (0, _lib.generateTemplate)(_path.default.join('scaffold', 'templates', 'layouts', layout), {
      name,
      pascalScaffoldPath,
      ...templateStrings
    });
    fileList[outputPath] = template;
  });
  return fileList;
};

const pageFiles = (name, pascalScaffoldPath = '', generateTypescript, nestScaffoldByModel = true, templateStrings) => {
  const pluralName = (0, _pascalcase.default)((0, _pluralize.default)(name));
  const singularName = (0, _pascalcase.default)(_pluralize.default.singular(name));
  let fileList = {};

  const pages = _fs.default.readdirSync(_path.default.join(_lib.templateRoot, 'scaffold', 'templates', 'pages'));

  (0, _forEach.default)(pages).call(pages, page => {
    // Sanitize page names
    const outputPageName = page.replace(/Names/, pluralName).replace(/Name/, singularName).replace(/\.js\.template/, generateTypescript ? '.tsx' : '.js');
    const finalFolder = (nestScaffoldByModel ? singularName + '/' : '') + outputPageName.replace(/\.(js|tsx?)/, '');

    const outputPath = _path.default.join((0, _lib.getPaths)().web.pages, pascalScaffoldPath, finalFolder, outputPageName);

    const template = (0, _lib.generateTemplate)(_path.default.join('scaffold', 'templates', 'pages', page), {
      name,
      pascalScaffoldPath,
      ...templateStrings
    });
    fileList[outputPath] = template;
  });
  return fileList;
};

const componentFiles = async (name, pascalScaffoldPath = '', generateTypescript, nestScaffoldByModel = true, templateStrings) => {
  var _context4, _context5;

  const pluralName = (0, _pascalcase.default)((0, _pluralize.default)(name));
  const singularName = (0, _pascalcase.default)(_pluralize.default.singular(name));
  const model = await (0, _lib.getSchema)(singularName);
  const idType = getIdType(model);
  const intForeignKeys = (0, _helpers.intForeignKeysForModel)(model);
  let fileList = {};
  const componentMetadata = {
    Boolean: {
      componentName: 'CheckboxField',
      defaultProp: 'defaultChecked',
      validation: false,
      listDisplayFunction: 'checkboxInputTag',
      displayFunction: 'checkboxInputTag'
    },
    DateTime: {
      componentName: 'DatetimeLocalField',
      deserilizeFunction: 'formatDatetime',
      listDisplayFunction: 'timeTag',
      displayFunction: 'timeTag'
    },
    Int: {
      componentName: 'NumberField'
    },
    Json: {
      componentName: 'TextAreaField',
      dataType: 'Json',
      displayFunction: 'jsonDisplay',
      listDisplayFunction: 'jsonTruncate',
      deserilizeFunction: 'JSON.stringify'
    },
    Float: {
      dataType: 'Float'
    },
    default: {
      componentName: 'TextField',
      defaultProp: 'defaultValue',
      deserilizeFunction: '',
      validation: '{{ required: true }}',
      displayFunction: undefined,
      listDisplayFunction: 'truncate',
      dataType: undefined
    }
  };
  const columns = (0, _map.default)(_context4 = (0, _filter.default)(_context5 = model.fields).call(_context5, field => field.kind !== 'object')).call(_context4, column => {
    var _componentMetadata$co, _componentMetadata$co2, _componentMetadata$co3, _componentMetadata$co4, _componentMetadata$co5, _componentMetadata$co6, _componentMetadata$co7, _componentMetadata$co8;

    return { ...column,
      label: (0, _humanizeString.default)(column.name),
      component: ((_componentMetadata$co = componentMetadata[column.type]) === null || _componentMetadata$co === void 0 ? void 0 : _componentMetadata$co.componentName) || componentMetadata.default.componentName,
      defaultProp: ((_componentMetadata$co2 = componentMetadata[column.type]) === null || _componentMetadata$co2 === void 0 ? void 0 : _componentMetadata$co2.defaultProp) || componentMetadata.default.defaultProp,
      deserilizeFunction: ((_componentMetadata$co3 = componentMetadata[column.type]) === null || _componentMetadata$co3 === void 0 ? void 0 : _componentMetadata$co3.deserilizeFunction) || componentMetadata.default.deserilizeFunction,
      validation: (_componentMetadata$co4 = (_componentMetadata$co5 = componentMetadata[column.type]) === null || _componentMetadata$co5 === void 0 ? void 0 : _componentMetadata$co5.validation) !== null && _componentMetadata$co4 !== void 0 ? _componentMetadata$co4 : componentMetadata.default.validation,
      listDisplayFunction: ((_componentMetadata$co6 = componentMetadata[column.type]) === null || _componentMetadata$co6 === void 0 ? void 0 : _componentMetadata$co6.listDisplayFunction) || componentMetadata.default.listDisplayFunction,
      displayFunction: ((_componentMetadata$co7 = componentMetadata[column.type]) === null || _componentMetadata$co7 === void 0 ? void 0 : _componentMetadata$co7.displayFunction) || componentMetadata.default.displayFunction,
      dataType: ((_componentMetadata$co8 = componentMetadata[column.type]) === null || _componentMetadata$co8 === void 0 ? void 0 : _componentMetadata$co8.dataType) || componentMetadata.default.dataType
    };
  });
  const editableColumns = (0, _filter.default)(columns).call(columns, column => {
    return (0, _indexOf.default)(NON_EDITABLE_COLUMNS).call(NON_EDITABLE_COLUMNS, column.name) === -1;
  });
  const fieldsToImport = (0, _keys.default)((0, _reduce.default)(editableColumns).call(editableColumns, (accumulator, column) => {
    accumulator[column.component] = true;
    return accumulator;
  }, {}));

  if (!fieldsToImport.length) {
    throw new Error(`There are no editable fields in the ${name} model`);
  }

  const components = _fs.default.readdirSync(_path.default.join(_lib.templateRoot, 'scaffold', 'templates', 'components'));

  await (0, _lib.asyncForEach)(components, component => {
    const outputComponentName = component.replace(/Names/, pluralName).replace(/Name/, singularName).replace(/\.js\.template/, generateTypescript ? '.tsx' : '.js');
    const finalFolder = (nestScaffoldByModel ? singularName + '/' : '') + outputComponentName.replace(/\.(js|tsx?)/, '');

    const outputPath = _path.default.join((0, _lib.getPaths)().web.components, pascalScaffoldPath, finalFolder, outputComponentName);

    const template = (0, _lib.generateTemplate)(_path.default.join('scaffold', 'templates', 'components', component), {
      name,
      columns,
      fieldsToImport,
      editableColumns,
      idType,
      intForeignKeys,
      pascalScaffoldPath,
      ...templateStrings
    });
    fileList[outputPath] = template;
  });
  return fileList;
}; // add routes for all pages


const routes = async ({
  model: name,
  path: scaffoldPath = '',
  nestScaffoldByModel
}) => {
  var _context6;

  if (typeof nestScaffoldByModel === 'undefined') {
    nestScaffoldByModel = (0, _internal.getConfig)().generate.nestScaffoldByModel;
  }

  const templateNames = getTemplateStrings(name, scaffoldPath);
  const singularPascalName = (0, _pascalcase.default)(_pluralize.default.singular(name));
  const pluralPascalName = (0, _pascalcase.default)((0, _pluralize.default)(name));
  const pluralParamName = (0, _paramCase.paramCase)(pluralPascalName);
  const model = await (0, _lib.getSchema)(singularPascalName);
  const idRouteParam = getIdType(model) === 'Int' ? ':Int' : '';
  const paramScaffoldPath = scaffoldPath === '' ? scaffoldPath : (0, _map.default)(_context6 = scaffoldPath.split('/')).call(_context6, _paramCase.paramCase).join('/') + '/';
  const pascalScaffoldPath = (0, _pascalcase.default)(scaffoldPath);
  const pageRoot = pascalScaffoldPath + (nestScaffoldByModel ? singularPascalName : '');
  return [// new
  `<Route path="/${paramScaffoldPath}${pluralParamName}/new" page={${pageRoot}New${singularPascalName}Page} name="${templateNames.newRouteName}" />`, // edit
  `<Route path="/${paramScaffoldPath}${pluralParamName}/{id${idRouteParam}}/edit" page={${pageRoot}Edit${singularPascalName}Page} name="${templateNames.editRouteName}" />`, // singular
  `<Route path="/${paramScaffoldPath}${pluralParamName}/{id${idRouteParam}}" page={${pageRoot}${singularPascalName}Page} name="${templateNames.singularRouteName}" />`, // plural
  `<Route path="/${paramScaffoldPath}${pluralParamName}" page={${pageRoot}${pluralPascalName}Page} name="${templateNames.pluralRouteName}" />`];
};

exports.routes = routes;

const addRoutesInsideSetToRouter = async (model, path) => {
  const pluralPascalName = (0, _pascalcase.default)((0, _pluralize.default)(model));
  const layoutName = `${pluralPascalName}Layout`;
  return (0, _lib.addRoutesToRouterTask)(await routes({
    model,
    path
  }), layoutName);
};

const addLayoutImport = ({
  model: name,
  path: scaffoldPath = ''
}) => {
  var _context7;

  const pluralPascalName = (0, _pascalcase.default)((0, _pluralize.default)(name));
  const pascalScaffoldPath = scaffoldPath === '' ? scaffoldPath : (0, _map.default)(_context7 = scaffoldPath.split('/')).call(_context7, _pascalcase.default).join('/') + '/';
  const layoutName = `${pluralPascalName}Layout`;
  const importLayout = `import ${pluralPascalName}Layout from 'src/layouts/${pascalScaffoldPath}${layoutName}'`;
  const routesPath = (0, _lib.getPaths)().web.routes;
  const routesContent = (0, _lib.readFile)(routesPath).toString();
  const newRoutesContent = routesContent.replace(/'@redwoodjs\/router'(\s*)/, `'@redwoodjs/router'\n${importLayout}$1`);
  (0, _lib.writeFile)(routesPath, newRoutesContent, {
    overwriteExisting: true
  });
  return 'Added layout import to Routes.{js,tsx}';
};

const addSetImport = () => {
  const routesPath = (0, _lib.getPaths)().web.routes;
  const routesContent = (0, _lib.readFile)(routesPath).toString();
  const [redwoodRouterImport, importStart, spacing, importContent, importEnd] = routesContent.match(/(import {)(\s*)([^]*)(} from '@redwoodjs\/router')/) || [];
  const routerImports = importContent.replace(/\s/g, '').split(',');

  if ((0, _includes.default)(routerImports).call(routerImports, PACKAGE_SET)) {
    return 'Skipping Set import';
  }

  const newRoutesContent = routesContent.replace(redwoodRouterImport, importStart + spacing + PACKAGE_SET + `,` + spacing + importContent + importEnd);
  (0, _lib.writeFile)(routesPath, newRoutesContent, {
    overwriteExisting: true
  });
  return 'Added Set import to Routes.{js,tsx}';
};

const addScaffoldImport = () => {
  const appJsPath = (0, _lib.getPaths)().web.app;
  let appJsContents = (0, _lib.readFile)(appJsPath).toString();

  if (appJsContents.match(SCAFFOLD_STYLE_PATH)) {
    return 'Skipping scaffold style include';
  }

  appJsContents = appJsContents.replace("import Routes from 'src/Routes'\n", `import Routes from 'src/Routes'\n\nimport '${SCAFFOLD_STYLE_PATH}'`);
  (0, _lib.writeFile)(appJsPath, appJsContents, {
    overwriteExisting: true
  });
  return 'Added scaffold import to App.{js,tsx}';
};

const command = 'scaffold <model>';
exports.command = command;
const description = 'Generate Pages, SDL, and Services files based on a given DB schema Model. Also accepts <path/model>';
exports.description = description;

const builder = yargs => {
  var _context8;

  yargs.positional('model', {
    description: "Model to scaffold. You can also use <path/model> to nest files by type at the given path directory (or directories). For example, 'rw g scaffold admin/post'"
  }).option('tests', {
    description: 'Generate test files',
    type: 'boolean'
  }).epilogue(`Also see the ${(0, _terminalLink.default)('Redwood CLI Reference', 'https://redwoodjs.com/reference/command-line-interface#generate-scaffold')}`); // Merge generator defaults in

  (0, _forEach.default)(_context8 = (0, _entries.default)(_generate.yargsDefaults)).call(_context8, ([option, config]) => {
    yargs.option(option, config);
  });
};

exports.builder = builder;

const tasks = ({
  model,
  path,
  force,
  tests,
  typescript,
  javascript
}) => {
  return new _listr.default([{
    title: 'Generating scaffold files...',
    task: async () => {
      const f = await files({
        model,
        path,
        tests,
        typescript,
        javascript
      });
      return (0, _lib.writeFilesTask)(f, {
        overwriteExisting: force
      });
    }
  }, {
    title: 'Adding layout import...',
    task: async () => addLayoutImport({
      model,
      path
    })
  }, {
    title: 'Adding set import...',
    task: async () => addSetImport({
      model,
      path
    })
  }, {
    title: 'Adding scaffold routes...',
    task: async () => addRoutesInsideSetToRouter(model, path)
  }, {
    title: 'Adding scaffold asset imports...',
    task: () => addScaffoldImport()
  }], {
    collapse: false,
    exitOnError: true
  });
};

const handler = async ({
  model: modelArg,
  force,
  tests,
  typescript
}) => {
  if (tests === undefined) {
    tests = (0, _internal.getConfig)().generate.tests;
  }

  const {
    model,
    path
  } = splitPathAndModel(modelArg);
  await (0, _helpers.ensureUniquePlural)({
    model
  });
  const t = tasks({
    model,
    path,
    force,
    tests,
    typescript
  });

  try {
    await t.run();
  } catch (e) {
    console.log(_colors.default.error(e.message));
    process.exit((e === null || e === void 0 ? void 0 : e.existCode) || 1);
  }
};

exports.handler = handler;

const splitPathAndModel = pathSlashModel => {
  var _context9;

  const path = (0, _slice.default)(_context9 = pathSlashModel.split('/')).call(_context9, 0, -1).join('/'); // This code will work whether or not there's a path in model
  // E.g. if model is just 'post',
  // path.split('/') will return ['post'].

  const model = pathSlashModel.split('/').pop();
  return {
    model,
    path
  };
};

exports.splitPathAndModel = splitPathAndModel;