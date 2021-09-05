"use strict";

var _Object$defineProperty = require("@babel/runtime-corejs3/core-js/object/define-property");

var _interopRequireDefault = require("@babel/runtime-corejs3/helpers/interopRequireDefault").default;

_Object$defineProperty(exports, "__esModule", {
  value: true
});

exports.ensureUniquePlural = exports.validatePlural = exports.forcePluralizeWord = exports.isWordNonPluralizable = exports.intForeignKeysForModel = exports.relationsForModel = exports.createYargsForComponentGeneration = exports.pathName = exports.templateForComponentFile = void 0;

var _startsWith = _interopRequireDefault(require("@babel/runtime-corejs3/core-js/instance/starts-with"));

var _endsWith = _interopRequireDefault(require("@babel/runtime-corejs3/core-js/instance/ends-with"));

var _keys = _interopRequireDefault(require("@babel/runtime-corejs3/core-js/object/keys"));

var _map = _interopRequireDefault(require("@babel/runtime-corejs3/core-js/instance/map"));

var _forEach = _interopRequireDefault(require("@babel/runtime-corejs3/core-js/instance/for-each"));

var _entries = _interopRequireDefault(require("@babel/runtime-corejs3/core-js/object/entries"));

var _filter = _interopRequireDefault(require("@babel/runtime-corejs3/core-js/instance/filter"));

var _trim = _interopRequireDefault(require("@babel/runtime-corejs3/core-js/instance/trim"));

var _slice = _interopRequireDefault(require("@babel/runtime-corejs3/core-js/instance/slice"));

var _path = _interopRequireDefault(require("path"));

var _listr = _interopRequireDefault(require("listr"));

var _paramCase = require("param-case");

var _pascalcase = _interopRequireDefault(require("pascalcase"));

var _pluralize = _interopRequireDefault(require("pluralize"));

var _prompts = _interopRequireDefault(require("prompts"));

var _terminalLink = _interopRequireDefault(require("terminal-link"));

var _internal = require("@redwoodjs/internal");

var _lib = require("../../lib");

var _colors = _interopRequireDefault(require("../../lib/colors"));

var _generate = require("../generate");

/**
 * Reduces boilerplate for generating an output path and content to write to disk
 * for a component.
 */
// TODO: Make this read all the files in a template directory instead of
// manually passing in each file.
const templateForComponentFile = ({
  name,
  suffix = '',
  extension = '.js',
  webPathSection,
  apiPathSection,
  generator,
  templatePath,
  templateVars,
  componentName,
  outputPath
}) => {
  const basePath = webPathSection ? (0, _lib.getPaths)().web[webPathSection] : (0, _lib.getPaths)().api[apiPathSection];
  const outputComponentName = componentName || (0, _pascalcase.default)((0, _paramCase.paramCase)(name)) + suffix;

  const componentOutputPath = outputPath || _path.default.join(basePath, outputComponentName, outputComponentName + extension);

  const fullTemplatePath = _path.default.join(generator, 'templates', templatePath);

  const content = (0, _lib.generateTemplate)(fullTemplatePath, {
    name,
    outputPath: (0, _internal.ensurePosixPath)(`./${_path.default.relative((0, _lib.getPaths)().base, componentOutputPath)}`),
    ...templateVars
  });
  return [componentOutputPath, content];
};
/**
 * Creates a route path, either returning the existing path if passed, otherwise
 * creates one based on the name. If the passed path is just a route parameter
 * a new path based on the name is created, with the parameter appended to it
 */


exports.templateForComponentFile = templateForComponentFile;

const pathName = (path, name) => {
  let routePath = path;

  if (path && (0, _startsWith.default)(path).call(path, '{') && (0, _endsWith.default)(path).call(path, '}')) {
    routePath = `/${(0, _paramCase.paramCase)(name)}/${path}`;
  }

  if (!routePath) {
    routePath = `/${(0, _paramCase.paramCase)(name)}`;
  }

  return routePath;
};

exports.pathName = pathName;

const appendPositionalsToCmd = (commandString, positionalsObj) => {
  // Add positionals like `page <name>` + ` [path]` if specified
  if ((0, _keys.default)(positionalsObj).length > 0) {
    var _context;

    const positionalNames = (0, _map.default)(_context = (0, _keys.default)(positionalsObj)).call(_context, positionalName => `[${positionalName}]`).join(' '); // Note space after command is important

    return `${commandString} ${positionalNames}`;
  } else {
    return commandString;
  }
};
/**
 * Reduces boilerplate for creating a yargs handler that writes a component/page/layout to a
 * location.
 */


const createYargsForComponentGeneration = ({
  componentName,
  filesFn,
  optionsObj = _generate.yargsDefaults,
  positionalsObj = {},
  includeAdditionalTasks = () => [],
  // function that takes the options object and returns an array of listr tasks
  shouldEnsureUniquePlural = false
}) => {
  return {
    command: appendPositionalsToCmd(`${componentName} <name>`, positionalsObj),
    description: `Generate a ${componentName} component`,
    builder: yargs => {
      var _context2, _context3;

      yargs.positional('name', {
        description: `Name of the ${componentName}`,
        type: 'string'
      }).epilogue(`Also see the ${(0, _terminalLink.default)('Redwood CLI Reference', `https://redwoodjs.com/reference/command-line-interface#generate-${componentName}`)}`).option('tests', {
        description: 'Generate test files',
        type: 'boolean'
      }).option('stories', {
        description: 'Generate storybook files',
        type: 'boolean'
      }); // Add in passed in positionals

      (0, _forEach.default)(_context2 = (0, _entries.default)(positionalsObj)).call(_context2, ([option, config]) => {
        yargs.positional(option, config);
      }); // Add in passed in options

      (0, _forEach.default)(_context3 = (0, _entries.default)(optionsObj)).call(_context3, ([option, config]) => {
        yargs.option(option, config);
      });
    },
    handler: async options => {
      if (options.tests === undefined) {
        options.tests = (0, _internal.getConfig)().generate.tests;
      }

      if (options.stories === undefined) {
        options.stories = (0, _internal.getConfig)().generate.stories;
      }

      if (shouldEnsureUniquePlural) {
        await ensureUniquePlural({
          model: options.name
        });
      }

      const tasks = new _listr.default([{
        title: `Generating ${componentName} files...`,
        task: async () => {
          const f = await filesFn(options);
          return (0, _lib.writeFilesTask)(f, {
            overwriteExisting: options.force
          });
        }
      }, ...includeAdditionalTasks(options)], {
        collapse: false,
        exitOnError: true
      });

      try {
        await tasks.run();
      } catch (e) {
        console.error(_colors.default.error(e.message));
        process.exit((e === null || e === void 0 ? void 0 : e.exitCode) || 1);
      }
    }
  };
}; // Returns all relations to other models


exports.createYargsForComponentGeneration = createYargsForComponentGeneration;

const relationsForModel = model => {
  var _context4, _context5;

  return (0, _map.default)(_context4 = (0, _filter.default)(_context5 = model.fields).call(_context5, f => f.relationName)).call(_context4, field => {
    return field.name;
  });
}; // Returns only relations that are of datatype Int


exports.relationsForModel = relationsForModel;

const intForeignKeysForModel = model => {
  var _context6, _context7;

  return (0, _map.default)(_context6 = (0, _filter.default)(_context7 = model.fields).call(_context7, f => f.name.match(/Id$/) && f.type === 'Int')).call(_context6, f => f.name);
};

exports.intForeignKeysForModel = intForeignKeysForModel;

const isWordNonPluralizable = word => {
  return _pluralize.default.isPlural(word) === _pluralize.default.isSingular(word);
};
/**
 * Adds an s if it can't pluralize the word
 */


exports.isWordNonPluralizable = isWordNonPluralizable;

const forcePluralizeWord = word => {
  // If word is already plural, check if plural === singular, then add s
  // else use plural
  const shouldAppendList = isWordNonPluralizable(word); // equipment === equipment

  if (shouldAppendList) {
    return (0, _pascalcase.default)(`${word}_list`);
  }

  return _pluralize.default.plural(word);
};

exports.forcePluralizeWord = forcePluralizeWord;

const validatePlural = (plural, singular) => {
  const trimmedPlural = (0, _trim.default)(plural).call(plural);

  if (trimmedPlural === singular) {
    return 'Plural can not be same as singular.';
  }

  if (trimmedPlural.match(/[\n\r\s]+/)) {
    return 'Only one word please!';
  } // Control Char u0017 is retured if default input is cleared in the prompt using option+backspace
  // eslint-disable-next-line no-control-regex


  if (trimmedPlural.match(/^[\n\r\s\u0017]*$/)) {
    return 'Plural can not be empty.';
  }

  return true;
}; // Ask user for plural version, if singular & plural are same for a word. For example: Pokemon


exports.validatePlural = validatePlural;

const ensureUniquePlural = async ({
  model,
  inDestroyer = false
}) => {
  var _promptResult$plural;

  if (!isWordNonPluralizable(model)) {
    return;
  }

  const promptMessage = inDestroyer ? `Cannot determine the plural of "${model}" originally used to generate scaffolding. \nTo continue, the destroy command requires the plural form:` : `Cannot determine the plural of "${model}". \nTo continue, the generator requires a unique plural form:`;
  const initialPlural = (0, _slice.default)(model).call(model, -1) === 's' ? `${model}es` : `${model}s`; // News => Newses; Equipment => Equipments

  const promptResult = await (0, _prompts.default)({
    type: 'text',
    name: 'plural',
    message: promptMessage,
    initial: initialPlural,
    validate: pluralInput => validatePlural(pluralInput, model)
  }); // Quickfix is to remove that control char u0017, which is preprended if default input is cleared using option+backspace
  // eslint-disable-next-line no-control-regex

  const pluralToUse = (_promptResult$plural = promptResult.plural) === null || _promptResult$plural === void 0 ? void 0 : (0, _trim.default)(_promptResult$plural).call(_promptResult$plural).replace(/\u0017/g, '');

  if (!pluralToUse) {
    throw Error('Plural name must not be empty');
  } // Set the rule


  _pluralize.default.addIrregularRule(model, pluralToUse);
};

exports.ensureUniquePlural = ensureUniquePlural;