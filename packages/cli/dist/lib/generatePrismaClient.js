"use strict";

var _Object$defineProperty = require("@babel/runtime-corejs3/core-js/object/define-property");

var _interopRequireDefault = require("@babel/runtime-corejs3/helpers/interopRequireDefault").default;

_Object$defineProperty(exports, "__esModule", {
  value: true
});

exports.generatePrismaClient = void 0;

var _fs = _interopRequireDefault(require("fs"));

var _path = _interopRequireDefault(require("path"));

var _ = require("./");

// helper used in Dev and Build commands

/**
 * Conditionally generate the prisma client, skip if it already exists.
 */
const generatePrismaClient = async ({
  verbose = true,
  force = true,
  schema = (0, _.getPaths)().api.dbSchema
}) => {
  if (!_fs.default.existsSync(schema)) {
    console.log(`Skipping database and Prisma client generation, no \`schema.prisma\` file found: \`${schema}\``);
    return;
  } // Do not generate the Prisma client if it exists.


  if (!force) {
    // The Prisma client throws if it is not generated.
    try {
      // Import the client from the redwood apps node_modules path.
      const {
        PrismaClient
      } = require(_path.default.join((0, _.getPaths)().base, 'node_modules/.prisma/client')); // eslint-disable-next-line


      new PrismaClient();
      return; // Client exists, so abort.
    } catch (e) {// Swallow your pain, and generate.
    }
  }

  return await (0, _.runCommandTask)([{
    title: 'Generating the Prisma client...',
    cmd: 'yarn prisma',
    args: ['generate', schema && `--schema="${schema}"`]
  }], {
    verbose
  });
};

exports.generatePrismaClient = generatePrismaClient;