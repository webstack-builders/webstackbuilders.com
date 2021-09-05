"use strict";

var _Object$defineProperty = require("@babel/runtime-corejs3/core-js/object/define-property");

var _interopRequireDefault = require("@babel/runtime-corejs3/helpers/interopRequireDefault").default;

_Object$defineProperty(exports, "__esModule", {
  value: true
});

exports.handler = exports.builder = exports.description = exports.command = exports.files = void 0;

var _promise = _interopRequireDefault(require("@babel/runtime-corejs3/core-js/promise"));

var _filter = _interopRequireDefault(require("@babel/runtime-corejs3/core-js/instance/filter"));

var _map = _interopRequireDefault(require("@babel/runtime-corejs3/core-js/instance/map"));

var _includes = _interopRequireDefault(require("@babel/runtime-corejs3/core-js/instance/includes"));

var _find = _interopRequireDefault(require("@babel/runtime-corejs3/core-js/instance/find"));

var _reduce = _interopRequireDefault(require("@babel/runtime-corejs3/core-js/instance/reduce"));

var _interopRequireWildcard2 = _interopRequireDefault(require("@babel/runtime-corejs3/helpers/interopRequireWildcard"));

var _pascalcase = _interopRequireDefault(require("pascalcase"));

var _pluralize = _interopRequireDefault(require("pluralize"));

var _internal = require("@redwoodjs/internal");

var _lib = require("../../../lib");

var _generate = require("../../generate");

var _helpers = require("../helpers");

const COMPONENT_SUFFIX = 'Cell';
const REDWOOD_WEB_PATH_NAME = 'components';

const getCellOperationNames = async () => {
  var _context, _context2;

  const {
    getProject
  } = await _promise.default.resolve().then(() => (0, _interopRequireWildcard2.default)(require('@redwoodjs/structure')));
  return (0, _filter.default)(_context = (0, _map.default)(_context2 = getProject().cells).call(_context2, x => {
    return x.queryOperationName;
  })).call(_context, Boolean);
};

const uniqueOperationName = async (name, {
  index = 1,
  list = false
}) => {
  let operationName = (0, _pascalcase.default)(index <= 1 ? `find_${name}_query` : `find_${name}_query_${index}`);

  if (list) {
    operationName = index <= 1 ? `${(0, _pascalcase.default)(name)}Query` : `${(0, _pascalcase.default)(name)}Query_${index}`;
  }

  const cellOperationNames = await getCellOperationNames();

  if (!(0, _includes.default)(cellOperationNames).call(cellOperationNames, operationName)) {
    return operationName;
  }

  return uniqueOperationName(name, {
    index: index + 1
  });
};

const getIdType = model => {
  var _model$fields$find, _context3;

  return (_model$fields$find = (0, _find.default)(_context3 = model.fields).call(_context3, field => field.isId)) === null || _model$fields$find === void 0 ? void 0 : _model$fields$find.type;
};

const files = async ({
  name,
  typescript: generateTypescript,
  ...options
}) => {
  let cellName = name;
  let idType,
      model = null;
  let templateNameSuffix = ''; // Create a unique operation name.

  const shouldGenerateList = ((0, _helpers.isWordNonPluralizable)(name) ? options.list : _pluralize.default.isPlural(name)) || options.list;

  if (shouldGenerateList) {
    cellName = (0, _helpers.forcePluralizeWord)(name);
    templateNameSuffix = 'List'; // override operationName so that its find_operationName
  } else {
    // needed for the singular cell GQL query find by id case
    try {
      model = await (0, _lib.getSchema)((0, _pascalcase.default)(_pluralize.default.singular(name)));
      idType = getIdType(model);
    } catch {
      // eat error so that the destroy cell generator doesn't raise when try to find prisma query engine in test runs
      // assume id will be Int, otherwise generated will keep throwing
      idType = 'Int';
    }
  }

  const operationName = await uniqueOperationName(cellName, {
    list: shouldGenerateList
  });
  const cellFile = (0, _helpers.templateForComponentFile)({
    name: cellName,
    suffix: COMPONENT_SUFFIX,
    extension: generateTypescript ? '.tsx' : '.js',
    webPathSection: REDWOOD_WEB_PATH_NAME,
    generator: 'cell',
    templatePath: `cell${templateNameSuffix}.tsx.template`,
    templateVars: {
      operationName,
      idType
    }
  });
  const testFile = (0, _helpers.templateForComponentFile)({
    name: cellName,
    suffix: COMPONENT_SUFFIX,
    extension: generateTypescript ? '.test.tsx' : '.test.js',
    webPathSection: REDWOOD_WEB_PATH_NAME,
    generator: 'cell',
    templatePath: 'test.js.template'
  });
  const storiesFile = (0, _helpers.templateForComponentFile)({
    name: cellName,
    suffix: COMPONENT_SUFFIX,
    extension: generateTypescript ? '.stories.tsx' : '.stories.js',
    webPathSection: REDWOOD_WEB_PATH_NAME,
    generator: 'cell',
    templatePath: 'stories.js.template'
  });
  const mockFile = (0, _helpers.templateForComponentFile)({
    name: cellName,
    suffix: COMPONENT_SUFFIX,
    extension: generateTypescript ? '.mock.ts' : '.mock.js',
    webPathSection: REDWOOD_WEB_PATH_NAME,
    generator: 'cell',
    templatePath: `mock${templateNameSuffix}.js.template`
  });
  const files = [cellFile];

  if (options.stories) {
    files.push(storiesFile);
  }

  if (options.tests) {
    files.push(testFile);
  }

  if (options.stories || options.tests) {
    files.push(mockFile);
  } // Returns
  // {
  //    "path/to/fileA": "<<<template>>>",
  //    "path/to/fileB": "<<<template>>>",
  // }


  return (0, _reduce.default)(files).call(files, (acc, [outputPath, content]) => {
    const template = generateTypescript ? content : (0, _lib.transformTSToJS)(outputPath, content);
    return {
      [outputPath]: template,
      ...acc
    };
  }, {});
};

exports.files = files;
const {
  command,
  description,
  builder,
  handler
} = (0, _helpers.createYargsForComponentGeneration)({
  componentName: 'cell',
  filesFn: files,
  optionsObj: { ..._generate.yargsDefaults,
    list: {
      alias: 'l',
      default: false,
      description: 'Use when you want to generate a cell for a list of the model name.',
      type: 'boolean'
    }
  },
  includeAdditionalTasks: () => {
    return [{
      title: `Generating types ...`,
      task: async () => {
        return (0, _internal.generate)();
      }
    }];
  }
});
exports.handler = handler;
exports.builder = builder;
exports.description = description;
exports.command = command;