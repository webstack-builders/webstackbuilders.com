"use strict";

var _Object$defineProperty = require("@babel/runtime-corejs3/core-js/object/define-property");

var _interopRequireDefault = require("@babel/runtime-corejs3/helpers/interopRequireDefault").default;

_Object$defineProperty(exports, "__esModule", {
  value: true
});

exports.notes = exports.prismaBinaryTargetAdditions = exports.gitIgnoreAdditions = exports.files = exports.apiDevPackages = exports.preRequisites = void 0;

var _map = _interopRequireDefault(require("@babel/runtime-corejs3/core-js/instance/map"));

var _includes = _interopRequireDefault(require("@babel/runtime-corejs3/core-js/instance/includes"));

var _fs = _interopRequireDefault(require("fs"));

var _path = _interopRequireDefault(require("path"));

var _internal = require("@redwoodjs/internal");

var _lib = require("../../../../lib");

var _context;

const config = (0, _internal.getConfig)();
const SERVERLESS_YML = `# See the full yml reference at https://www.serverless.com/framework/docs/providers/aws/guide/serverless.yml/
service: app

# Uncomment org and app if you want to integrate your deployment with the Serverless dashboard. See https://www.serverless.com/framework/docs/dashboard/ for more details.
# org: your-org
# app: your-app

plugins:
  - serverless-dotenv-plugin

custom:
  dotenv:
    include:
      - # List the environment variables you want to include from your .env file here.

provider:
  name: aws
  runtime: nodejs12.x
  region: us-east-2 # This is the AWS region where the service will be deployed.
  httpApi: # HTTP API is used by default. To learn about the available options in API Gateway, see https://docs.aws.amazon.com/apigateway/latest/developerguide/http-api-vs-rest.html
    cors: true
    payload: '1.0'
  stackTags: # Add CloudFormation stack tags here
    source: serverless
    name: Redwood Lambda API with HTTP API Gateway
  tags: # Add service wide tags here
    name: Redwood Lambda API with HTTP API Gateway

package:
  individually: true

${_fs.default.existsSync(_path.default.resolve((0, _lib.getPaths)().api.functions)) ? `functions:
  ${(0, _map.default)(_context = _fs.default.readdirSync(_path.default.resolve((0, _lib.getPaths)().api.functions))).call(_context, file => {
  const basename = _path.default.basename(file, '.js');

  return `${basename}:
    description: ${basename} function deployed on AWS Lambda
    package:
      artifact: api/dist/zipball/${basename}.zip # This is the default location of the zip file generated during the deploy command.
    memorySize: 1024 # mb
    timeout: 25 # seconds (max: 29)
    tags: # Tags for this specific lambda function
      endpoint: ${config.web.apiProxyPath}/${basename}
    # Uncomment this section to add environment variables either from the Serverless dotenv plugin or using Serverless params
    # environment:
    #   YOUR_FIRST_ENV_VARIABLE: \${env:YOUR_FIRST_ENV_VARIABLE}
    handler: ${basename}.handler
    events:
      - httpApi:
          path: ${config.web.apiProxyPath}/${basename}
          method: GET
      - httpApi:
          path: ${config.web.apiProxyPath}/${basename}
          method: POST
`;
}).join('  ')}` : ''}
`;
const preRequisites = [{
  title: 'Checking if the Serverless framework is installed...',
  command: ['serverless', ['--version']],
  errorMessage: ['Looks like Serverless is not installed.', 'Please follow the steps at https://www.serverless.com/framework/docs/providers/aws/guide/installation/ to install Serverless.']
}];
exports.preRequisites = preRequisites;
const apiDevPackages = ['@netlify/zip-it-and-ship-it', 'serverless-dotenv-plugin'];
exports.apiDevPackages = apiDevPackages;
const files = [{
  path: _path.default.join((0, _lib.getPaths)().base, 'serverless.yml'),
  content: SERVERLESS_YML
}];
exports.files = files;
const gitIgnoreAdditions = ['.serverless'];
exports.gitIgnoreAdditions = gitIgnoreAdditions;

const prismaBinaryTargetAdditions = () => {
  const content = _fs.default.readFileSync((0, _lib.getPaths)().api.dbSchema).toString();

  if (!(0, _includes.default)(content).call(content, 'rhel-openssl-1.0.x')) {
    const result = content.replace(/binaryTargets =.*\n/, `binaryTargets = ["native", "rhel-openssl-1.0.x"]\n`);

    _fs.default.writeFileSync((0, _lib.getPaths)().api.dbSchema, result);
  }
}; // any notes to print out when the job is done


exports.prismaBinaryTargetAdditions = prismaBinaryTargetAdditions;
const notes = ['You are ready to deploy to AWS using the Serverless framework!', 'To configure AWS credentials, see https://www.serverless.com/framework/docs/providers/aws/guide/credentials/', 'For a more detailed way to configure the credentials using the AWS CLI, see https://docs.aws.amazon.com/cli/latest/userguide/cli-chap-configure.html', 'To deploy, see https://redwoodjs.com/docs/deploy#aws_serverless'];
exports.notes = notes;