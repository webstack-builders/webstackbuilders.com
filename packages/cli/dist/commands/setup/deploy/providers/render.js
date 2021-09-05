"use strict";

var _Object$defineProperty = require("@babel/runtime-corejs3/core-js/object/define-property");

var _interopRequireDefault = require("@babel/runtime-corejs3/helpers/interopRequireDefault").default;

_Object$defineProperty(exports, "__esModule", {
  value: true
});

exports.notes = exports.apiProxyPath = exports.files = exports.apiPackages = exports.prismaDataSourceCheck = void 0;

var _fs = _interopRequireDefault(require("fs"));

var _path = _interopRequireDefault(require("path"));

var _sdk = require("@prisma/sdk");

var _lib = require("../../../../lib");

const PROJECT_NAME = (0, _lib.getPaths)().base.match(/[^/|\\]+$/)[0];

const RENDER_YAML = database => {
  return `#####
# Documentation
# Redwood: https://render.com/docs/deploy-redwood
# YAML (all config values): https://render.com/docs/yaml-spec
#####

services:
- name: ${PROJECT_NAME}-web
  type: web
  env: static
  buildCommand: yarn rw deploy render web
  staticPublishPath: ./web/dist
  envVars:
  - key: NODE_VERSION
    value: 14
  routes:
  - type: rewrite
    source: /.redwood/functions/*
#####
# NOTE: replace destination api url after first deploy to Render
# example:
#   destination: https://myredwoodproject-api.onrender.com/*
#####
    destination: replace_with_api_url/*
  - type: rewrite
    source: /*
    destination: /index.html

- name: ${PROJECT_NAME}-api
  type: web
  env: node
  region: oregon
  buildCommand: yarn && yarn rw build api
  startCommand: yarn rw deploy render api
  envVars:
  - key: NODE_VERSION
    value: 14
${database}
`;
};

const POSTGRES_YAML = `  - key: DATABASE_URL
    fromDatabase:
      name: ${PROJECT_NAME}-db
      property: connectionString

databases:
  - name: ${PROJECT_NAME}-db
    region: oregon
`;
const SQLITE_YAML = `  - key: DATABASE_URL
    value: file:./data/sqlite.db
  disk:
    name: sqlite-data
    mountPath: /opt/render/project/src/api/db/data
    sizeGB: 1`;
const RENDER_HEALTH_CHECK = `// render-health-check
export const handler = async () => {
  return {
    statusCode: 200,
  }
}
`; // prisma data source check

const prismaDataSourceCheck = async database => {
  if (database === 'none') {
    return {
      path: _path.default.join((0, _lib.getPaths)().base, 'render.yaml'),
      content: RENDER_YAML('')
    };
  }

  if (!_fs.default.existsSync('api/db/schema.prisma')) {
    throw new Error("Could not find prisma schema at 'api/db/schema.prisma'");
  }

  const schema = await (0, _sdk.getSchema)('api/db/schema.prisma');
  const config = await (0, _sdk.getConfig)({
    datamodel: schema
  });
  const detectedDatabase = config.datasources[0].activeProvider;

  if (detectedDatabase === database) {
    switch (database) {
      case 'postgresql':
        return {
          path: _path.default.join((0, _lib.getPaths)().base, 'render.yaml'),
          content: RENDER_YAML(POSTGRES_YAML)
        };

      case 'sqlite':
        return {
          path: _path.default.join((0, _lib.getPaths)().base, 'render.yaml'),
          content: RENDER_YAML(SQLITE_YAML)
        };

      default:
        throw new Error(`
       Unexpected datasource provider found: ${database}`);
    }
  } else {
    throw new Error(`
    Prisma datasource provider is detected to be ${detectedDatabase}.

    Option 1: Update your schema.prisma provider to be ${database}, then run
    yarn rw prisma migrate dev
    yarn rw setup deploy render --database ${database}

    Option 2: Rerun setup deloy command with current schema.prisma provider:
    yarn rw setup deploy render --database ${detectedDatabase}`);
  }
}; //any packages to install


exports.prismaDataSourceCheck = prismaDataSourceCheck;
const apiPackages = ['@redwoodjs/api-server']; // any files to create

exports.apiPackages = apiPackages;
const files = [{
  path: _path.default.join((0, _lib.getPaths)().base, 'api/src/functions/healthz.js'),
  content: RENDER_HEALTH_CHECK
}];
exports.files = files;
const apiProxyPath = '/.redwood/functions'; // any notes to print out when the job is done

exports.apiProxyPath = apiProxyPath;
const notes = ['You are ready to deploy to Render!\n', 'Go to https://dashboard.render.com/iacs to create your account and deploy to Render', 'Check out the deployment docs at https://render.com/docs/deploy-redwood for detailed instructions', 'Note: After first deployment to Render update the rewrite rule destination in `./render.yaml`'];
exports.notes = notes;