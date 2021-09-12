"use strict";

var _Object$defineProperty = require("@babel/runtime-corejs3/core-js/object/define-property");

_Object$defineProperty(exports, "__esModule", {
  value: true
});

exports.notes = exports.apiPackages = exports.webPackages = exports.config = void 0;
// the lines that need to be added to App.{js,tsx}
const config = {
  imports: [`import { UserAgentApplication } from 'msal'`],
  init: `const azureActiveDirectoryClient = new UserAgentApplication({
    auth: {
      clientId: process.env.AZURE_ACTIVE_DIRECTORY_CLIENT_ID,
      authority: process.env.AZURE_ACTIVE_DIRECTORY_AUTHORITY,
      redirectUri: process.env.AZURE_ACTIVE_DIRECTORY_REDIRECT_URI,
      postLogoutRedirectUri: process.env.AZURE_ACTIVE_DIRECTORY_LOGOUT_REDIRECT_URI,
    },
  })`,
  authProvider: {
    client: 'azureActiveDirectoryClient',
    type: 'azureActiveDirectory'
  }
}; // required packages to install

exports.config = config;
const webPackages = ['msal'];
exports.webPackages = webPackages;
const apiPackages = []; // any notes to print out when the job is done

exports.apiPackages = apiPackages;
const notes = ['You will need to create several environment variables with your Azure AD config options. Check out web/src/App.{js,tsx} for the variables you need to add.', '\n', 'RedwoodJS specific Documentation:', 'https://redwoodjs.com/docs/authentication#azure-ad', '\n', 'MSAL.js Documentation:', 'https://docs.microsoft.com/en-us/azure/active-directory/develop/msal-js-initializing-client-applications'];
exports.notes = notes;