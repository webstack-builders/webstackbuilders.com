"use strict";

var _Object$defineProperty = require("@babel/runtime-corejs3/core-js/object/define-property");

_Object$defineProperty(exports, "__esModule", {
  value: true
});

exports.notes = exports.apiProxyPath = void 0;
const apiProxyPath = '/api'; // any notes to print out when the job is done

exports.apiProxyPath = apiProxyPath;
const notes = ['You are ready to deploy to Vercel!', 'See: https://redwoodjs.com/docs/deploy#vercel-deploy'];
exports.notes = notes;