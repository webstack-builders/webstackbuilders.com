"use strict";

var _Object$defineProperty = require("@babel/runtime-corejs3/core-js/object/define-property");

var _interopRequireDefault = require("@babel/runtime-corejs3/helpers/interopRequireDefault").default;

_Object$defineProperty(exports, "__esModule", {
  value: true
});

exports.handler = exports.builder = exports.description = exports.command = void 0;

var _fs = _interopRequireDefault(require("fs"));

var _path = _interopRequireDefault(require("path"));

var _chalk = _interopRequireDefault(require("chalk"));

var _execa = _interopRequireDefault(require("execa"));

var _listr = _interopRequireDefault(require("listr"));

var _lib = require("../../../lib");

var _colors = _interopRequireDefault(require("../../../lib/colors"));

const command = 'tailwind';
exports.command = command;
const description = 'Setup tailwindcss and PostCSS';
exports.description = description;

const builder = yargs => {
  yargs.option('force', {
    alias: 'f',
    default: false,
    description: 'Overwrite existing configuration',
    type: 'boolean'
  });
};

exports.builder = builder;
const tailwindImportsAndNotes = ['/**', ' * START --- TAILWIND GENERATOR EDIT', ' *', ' * `yarn rw setup tailwind` placed these imports here', " * to inject Tailwind's styles into your CSS.", ' * For more information, see: https://tailwindcss.com/docs/installation#add-tailwind-to-your-css', ' */', '@import "tailwindcss/base";', '@import "tailwindcss/components";', '@import "tailwindcss/utilities";', '/**', ' * END --- TAILWIND GENERATOR EDIT', ' */\n'];

const INDEX_CSS_PATH = _path.default.join((0, _lib.getPaths)().web.src, 'index.css');

const tailwindImportsExist = indexCSS => {
  let content = indexCSS.toString();

  const hasBaseImport = () => /@import "tailwindcss\/base"/.test(content);

  const hasComponentsImport = () => /@import "tailwindcss\/components"/.test(content);

  const hasUtilitiesImport = () => /@import "tailwindcss\/utilities"/.test(content);

  return hasBaseImport() && hasComponentsImport() && hasUtilitiesImport();
};

const postCSSConfigExists = () => {
  return _fs.default.existsSync((0, _lib.getPaths)().web.postcss);
};

const handler = async ({
  force
}) => {
  const tasks = new _listr.default([{
    title: 'Installing packages...',
    task: () => {
      return new _listr.default([{
        title: 'Install postcss-loader, tailwindcss, and autoprefixer',
        task: async () => {
          /**
           * Install postcss-loader, tailwindcss, and autoprefixer
           * RedwoodJS currently uses PostCSS v7; postcss-loader and autoprefixers pinned for compatibility
           */
          await (0, _execa.default)('yarn', ['workspace', 'web', 'add', '-D', 'postcss-loader@4.0.2', 'tailwindcss@npm:@tailwindcss/postcss7-compat', 'autoprefixer@9.8.6']);
        }
      }, {
        title: 'Sync yarn.lock and node_modules',
        task: async () => {
          /**
           * Sync yarn.lock file and node_modules folder.
           * Refer https://github.com/redwoodjs/redwood/issues/1301 for more details.
           */
          await (0, _execa.default)('yarn', ['install', '--check-files']);
        }
      }]);
    }
  }, {
    title: 'Configuring PostCSS...',
    task: () => {
      /**
       * Make web/config if it doesn't exist
       * and write postcss.config.js there
       */

      /**
       * Check if PostCSS config already exists.
       * If it exists, throw an error.
       */
      if (!force && postCSSConfigExists()) {
        throw new Error('PostCSS config already exists.\nUse --force to override existing config.');
      } else {
        return (0, _lib.writeFile)((0, _lib.getPaths)().web.postcss, _fs.default.readFileSync(_path.default.resolve(__dirname, 'templates', 'postcss.config.js.template')).toString(), {
          overwriteExisting: force
        });
      }
    }
  }, {
    title: 'Initializing Tailwind CSS...',
    task: async () => {
      const basePath = (0, _lib.getPaths)().web.base;

      const tailwindConfigPath = _path.default.join(basePath, 'tailwind.config.js');

      const configExists = _fs.default.existsSync(tailwindConfigPath);

      if (configExists) {
        if (force) {
          // yarn tailwindcss init will fail if the file already exists
          _fs.default.unlinkSync(tailwindConfigPath);
        } else {
          throw new Error('Tailwindcss config already exists.\nUse --force to override existing config.');
        }
      }

      await (0, _execa.default)('yarn', ['tailwindcss', 'init'], {
        cwd: basePath
      }); // opt-in to upcoming changes

      const config = _fs.default.readFileSync(tailwindConfigPath, 'utf-8');

      const uncommentFlags = str => str.replace(/\/{2} ([\w-]+: true)/g, '$1');

      const newConfig = config.replace(/future.*purge/s, uncommentFlags);

      _fs.default.writeFileSync(tailwindConfigPath, newConfig);
    }
  }, {
    title: 'Adding imports to index.css...',
    task: (_ctx, task) => {
      /**
       * Add tailwind imports and notes to the top of index.css
       */
      let indexCSS = _fs.default.readFileSync(INDEX_CSS_PATH);

      if (tailwindImportsExist(indexCSS)) {
        task.skip('Imports already exist in index.css');
      } else {
        indexCSS = tailwindImportsAndNotes.join('\n') + indexCSS;

        _fs.default.writeFileSync(INDEX_CSS_PATH, indexCSS);
      }
    }
  }, {
    title: 'One more thing...',
    task: (_ctx, task) => {
      task.title = `One more thing...\n
          ${_colors.default.green('Tailwind configured with "upcoming change" opt-in enabled')}\n
          ${_chalk.default.hex('#e8e8e8')('See this doc for info: https://tailwindcss.com/docs/upcoming-changes')}
        `;
    }
  }]);

  try {
    await tasks.run();
  } catch (e) {
    console.error(_colors.default.error(e.message));
    process.exit((e === null || e === void 0 ? void 0 : e.exitCode) || 1);
  }
};

exports.handler = handler;