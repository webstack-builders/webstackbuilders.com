"use strict";

var _Object$defineProperty = require("@babel/runtime-corejs3/core-js/object/define-property");

var _interopRequireDefault = require("@babel/runtime-corejs3/helpers/interopRequireDefault").default;

_Object$defineProperty(exports, "__esModule", {
  value: true
});

exports.handler = exports.builder = exports.description = exports.command = exports.graphFunctionDoesExist = exports.webIndexDoesExist = exports.apiSrcDoesExist = exports.isProviderSupported = exports.addApiConfig = exports.addConfigToApp = exports.files = void 0;

var _interopRequireWildcard2 = _interopRequireDefault(require("@babel/runtime-corejs3/helpers/interopRequireWildcard"));

var _filter = _interopRequireDefault(require("@babel/runtime-corejs3/core-js/instance/filter"));

var _map = _interopRequireDefault(require("@babel/runtime-corejs3/core-js/instance/map"));

var _reduce = _interopRequireDefault(require("@babel/runtime-corejs3/core-js/instance/reduce"));

var _promise = _interopRequireDefault(require("@babel/runtime-corejs3/core-js/promise"));

var _includes = _interopRequireDefault(require("@babel/runtime-corejs3/core-js/instance/includes"));

var _indexOf = _interopRequireDefault(require("@babel/runtime-corejs3/core-js/instance/index-of"));

var _keys = _interopRequireDefault(require("@babel/runtime-corejs3/core-js/object/keys"));

var _fs = _interopRequireDefault(require("fs"));

var _path = _interopRequireDefault(require("path"));

var _execa = _interopRequireDefault(require("execa"));

var _listr = _interopRequireDefault(require("listr"));

var _prompts = _interopRequireDefault(require("prompts"));

var _terminalLink = _interopRequireDefault(require("terminal-link"));

var _internal = require("@redwoodjs/internal");

var _structure = require("@redwoodjs/structure");

var _lib = require("../../../lib");

var _colors = _interopRequireDefault(require("../../../lib/colors"));

const AUTH_PROVIDER_IMPORT = `import { AuthProvider } from '@redwoodjs/auth'`;

const OUTPUT_PATH = _path.default.join((0, _lib.getPaths)().api.lib, (0, _structure.getProject)().isTypeScriptProject ? 'auth.ts' : 'auth.js');

const getGraphqlPath = () => (0, _internal.resolveFile)(_path.default.join((0, _lib.getPaths)().api.functions, 'graphql'));

const getWebAppPath = () => (0, _lib.getPaths)().web.app;

const getSupportedProviders = () => {
  var _context, _context2;

  return (0, _filter.default)(_context = (0, _map.default)(_context2 = _fs.default.readdirSync(_path.default.resolve(__dirname, 'providers'))).call(_context2, file => _path.default.basename(file, '.js'))).call(_context, file => file !== 'README.md');
};

const getTemplates = () => {
  var _context3;

  return (0, _reduce.default)(_context3 = _fs.default.readdirSync(_path.default.resolve(__dirname, 'templates'))).call(_context3, (templates, file) => {
    if (file === 'auth.js.template') {
      return { ...templates,
        base: _path.default.resolve(__dirname, 'templates', file)
      };
    } else {
      const provider = file.replace('.auth.js.template', '');
      return { ...templates,
        [provider]: _path.default.resolve(__dirname, 'templates', file)
      };
    }
  }, {});
}; // returns the content of App.{js,tsx} with import statements added


const addWebImports = (content, imports) => {
  return `${AUTH_PROVIDER_IMPORT}\n` + imports.join('\n') + '\n' + content;
}; // returns the content of App.{js,tsx} with init lines added


const addWebInit = (content, init) => {
  return content.replace('const App = () => (', `${init}\n\nconst App = () => (`);
}; // returns the content of App.{js,tsx} with <AuthProvider> added


const addWebRender = (content, authProvider) => {
  var _context4, _context5, _context6;

  const [_, indent, redwoodApolloProvider] = content.match(/(\s+)(<RedwoodApolloProvider>.*<\/RedwoodApolloProvider>)/s);
  const redwoodApolloProviderLines = (0, _map.default)(_context4 = redwoodApolloProvider.split('\n')).call(_context4, line => {
    return '  ' + line;
  });
  const customRenderOpen = (0, _reduce.default)(_context5 = authProvider.render || []).call(_context5, (acc, component) => acc + indent + `<${component}>`, '');
  const customRenderClose = (0, _reduce.default)(_context6 = authProvider.render || []).call(_context6, (acc, component) => indent + `</${component}>` + acc, '');
  const renderContent = customRenderOpen + indent + `<AuthProvider client={${authProvider.client}} type="${authProvider.type}">` + indent + redwoodApolloProviderLines.join('\n') + indent + `</AuthProvider>` + customRenderClose;
  return content.replace(/\s+<RedwoodApolloProvider>.*<\/RedwoodApolloProvider>/s, renderContent);
}; // returns the content of App.{js,tsx} with <AuthProvider> updated


const updateWebRender = (content, authProvider) => {
  const renderContent = `<AuthProvider client={${authProvider.client}} type="${authProvider.type}">`;
  return content.replace(/<AuthProvider client={.*} type=".*">/s, renderContent);
}; // returns the content of App.{js,tsx} without the old auth import


const removeOldWebImports = (content, imports) => {
  return content.replace(`${AUTH_PROVIDER_IMPORT}\n` + imports.join('\n'), '');
}; // returns the content of App.{js,tsx} without the old auth init


const removeOldWebInit = (content, init) => {
  return content.replace(init, '');
}; // returns content with old auth provider removes


const removeOldAuthProvider = async content => {
  // get the current auth provider
  const [_, currentAuthProvider] = content.match(/<AuthProvider client={.*} type="(.*)">/s);
  let oldAuthProvider;

  try {
    oldAuthProvider = await _promise.default.resolve(`./providers/${currentAuthProvider}`).then(s => (0, _interopRequireWildcard2.default)(require(s)));
  } catch (e) {
    throw new Error('Could not replace existing auth provider init');
  }

  content = removeOldWebImports(content, oldAuthProvider.config.imports);
  content = removeOldWebInit(content, oldAuthProvider.config.init);
  return content;
}; // check to make sure AuthProvider doesn't exist


const checkAuthProviderExists = async () => {
  const content = _fs.default.readFileSync(getWebAppPath()).toString();

  if ((0, _includes.default)(content).call(content, AUTH_PROVIDER_IMPORT)) {
    throw new Error('Existing auth provider found.\nUse --force to override existing provider.');
  }
}; // the files to create to support auth


const files = provider => {
  var _templates$provider;

  const templates = getTemplates();
  const template = (_templates$provider = templates[provider]) !== null && _templates$provider !== void 0 ? _templates$provider : templates.base;
  return {
    [OUTPUT_PATH]: _fs.default.readFileSync(template).toString()
  };
}; // actually inserts the required config lines into App.{js,tsx}


exports.files = files;

const addConfigToApp = async (config, force) => {
  const webAppPath = getWebAppPath();

  let content = _fs.default.readFileSync(webAppPath).toString(); // update existing AuthProvider if --force else add new AuthProvider


  if ((0, _includes.default)(content).call(content, AUTH_PROVIDER_IMPORT) && force) {
    content = await removeOldAuthProvider(content);
    content = updateWebRender(content, config.authProvider);
  } else {
    content = addWebRender(content, config.authProvider);
  }

  content = addWebImports(content, config.imports);
  content = addWebInit(content, config.init);

  _fs.default.writeFileSync(webAppPath, content);
};

exports.addConfigToApp = addConfigToApp;

const addApiConfig = () => {
  const graphqlPath = getGraphqlPath();

  let content = _fs.default.readFileSync(graphqlPath).toString(); // default to an array to avoid destructure errors


  const [_, hasAuthImport] = content.match(/(import {.*} from 'src\/lib\/auth.*')/s) || [];

  if (!hasAuthImport) {
    // add import statement
    content = content.replace(/^(.*services.*)$/m, `$1\n\nimport { getCurrentUser } from 'src/lib/auth'`); // add object to handler

    content = content.replace(/^(\s*)(schema: makeMergedSchema)(.*)$/m, `$1getCurrentUser,\n$1$2$3`);

    _fs.default.writeFileSync(graphqlPath, content);
  }
};

exports.addApiConfig = addApiConfig;

const isProviderSupported = provider => {
  var _context7;

  return (0, _indexOf.default)(_context7 = getSupportedProviders()).call(_context7, provider) !== -1;
};

exports.isProviderSupported = isProviderSupported;

const apiSrcDoesExist = () => {
  return _fs.default.existsSync(_path.default.join((0, _lib.getPaths)().api.src));
};

exports.apiSrcDoesExist = apiSrcDoesExist;

const webIndexDoesExist = () => {
  return _fs.default.existsSync(getWebAppPath());
};

exports.webIndexDoesExist = webIndexDoesExist;

const graphFunctionDoesExist = () => {
  return _fs.default.existsSync(getGraphqlPath());
};

exports.graphFunctionDoesExist = graphFunctionDoesExist;
const command = 'auth <provider>';
exports.command = command;
const description = 'Generate an auth configuration';
exports.description = description;

const builder = yargs => {
  yargs.positional('provider', {
    choices: getSupportedProviders(),
    description: 'Auth provider to configure',
    type: 'string'
  }).option('force', {
    alias: 'f',
    default: false,
    description: 'Overwrite existing configuration',
    type: 'boolean'
  }).epilogue(`Also see the ${(0, _terminalLink.default)('Redwood CLI Reference', 'https://redwoodjs.com/reference/command-line-interface#generate-auth')}`);
};

exports.builder = builder;

const handler = async ({
  provider,
  force
}) => {
  var _context8;

  const providerData = await _promise.default.resolve(`./providers/${provider}`).then(s => (0, _interopRequireWildcard2.default)(require(s))); // check if api/src/lib/auth.js already exists and if so, ask the user to overwrite

  if (force === false) {
    if (_fs.default.existsSync((0, _keys.default)(files(provider))[0])) {
      const response = await (0, _prompts.default)({
        type: 'confirm',
        name: 'answer',
        message: `Overwrite existing ${(0, _lib.getPaths)().api.lib.replace((0, _lib.getPaths)().base, '')}/auth.[jt]s?`,
        initial: false
      });
      force = response.answer;
    }
  }

  const tasks = new _listr.default((0, _filter.default)(_context8 = [{
    title: 'Generating auth lib...',
    task: (_ctx, task) => {
      if (apiSrcDoesExist()) {
        return (0, _lib.writeFilesTask)(files(provider), {
          overwriteExisting: force
        });
      } else {
        task.skip('api/src not found, skipping');
      }
    }
  }, {
    title: 'Adding auth config to web...',
    task: (_ctx, task) => {
      if (webIndexDoesExist()) {
        addConfigToApp(providerData.config, force);
      } else {
        task.skip('web/src/App.{js,tsx} not found, skipping');
      }
    }
  }, {
    title: 'Adding auth config to GraphQL API...',
    task: (_ctx, task) => {
      if (graphFunctionDoesExist()) {
        addApiConfig();
      } else {
        task.skip('GraphQL function not found, skipping');
      }
    }
  }, {
    title: 'Adding required web packages...',
    task: async () => {
      if (!isProviderSupported(provider)) {
        throw new Error(`Unknown auth provider '${provider}'`);
      }

      await (0, _execa.default)('yarn', ['workspace', 'web', 'add', ...providerData.webPackages, '@redwoodjs/auth']);
    }
  }, providerData.apiPackages.length > 0 && {
    title: 'Adding required api packages...',
    task: async () => {
      if (!isProviderSupported(provider)) {
        throw new Error(`Unknown auth provider '${provider}'`);
      }

      await (0, _execa.default)('yarn', ['workspace', 'api', 'add', ...providerData.apiPackages]);
    }
  }, {
    title: 'Installing packages...',
    task: async () => {
      await (0, _execa.default)('yarn', ['install']);
    }
  }, {
    title: 'One more thing...',
    task: (_ctx, task) => {
      task.title = `One more thing...\n\n   ${providerData.notes.join('\n   ')}\n`;
    }
  }]).call(_context8, Boolean), {
    collapse: false
  });

  try {
    // Don't throw existing provider error when --force exists
    if (!force) {
      await checkAuthProviderExists();
    }

    await tasks.run();
  } catch (e) {
    console.error(_colors.default.error(e.message));
    process.exit((e === null || e === void 0 ? void 0 : e.exitCode) || 1);
  }
};

exports.handler = handler;