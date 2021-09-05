"use strict";

var _Object$defineProperty = require("@babel/runtime-corejs3/core-js/object/define-property");

var _interopRequireDefault = require("@babel/runtime-corejs3/helpers/interopRequireDefault").default;

_Object$defineProperty(exports, "__esModule", {
  value: true
});

exports.notes = exports.apiProxyPath = exports.files = void 0;

var _path = _interopRequireDefault(require("path"));

var _lib = require("../../../../lib");

const config = (0, _lib.getConfig)();
const NETLIFY_TOML = `[build]
command = "yarn rw deploy netlify"
publish = "web/dist"
functions = "api/dist/functions"

[dev]
  # To use [Netlify Dev](https://www.netlify.com/products/dev/),
  # install netlify-cli from https://docs.netlify.com/cli/get-started/#installation
  # and then use netlify link https://docs.netlify.com/cli/get-started/#link-and-unlink-sites
  # to connect your local project to a site already on Netlify
  # then run netlify dev and our app will be accessible on the port specified below
  framework = "redwoodjs"
  # Set targetPort to the [web] side port as defined in redwood.toml
  targetPort = ${config.web.port}
  # Point your browser to this port to access your RedwoodJS app
  port = 8888

[[redirects]]
  from = "/*"
  to = "/index.html"
  status = 200
`; // any files to create

const files = [{
  path: _path.default.join((0, _lib.getPaths)().base, 'netlify.toml'),
  content: NETLIFY_TOML
}];
exports.files = files;
const apiProxyPath = '/.netlify/functions'; // any notes to print out when the job is done

exports.apiProxyPath = apiProxyPath;
const notes = ['You are ready to deploy to Netlify!', 'See: https://redwoodjs.com/docs/deploy#netlify-deploy'];
exports.notes = notes;