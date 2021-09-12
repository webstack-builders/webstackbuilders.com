"use strict";

var _Object$defineProperty = require("@babel/runtime-corejs3/core-js/object/define-property");

_Object$defineProperty(exports, "__esModule", {
  value: true
});

exports.notes = exports.apiPackages = exports.webPackages = exports.config = void 0;
// the lines that need to be added to App.{js,tsx}
const config = {
  imports: [`import firebase from 'firebase/app'`, `import 'firebase/auth'`],
  init: `const firebaseClientConfig = {
  apiKey: process.env.FIREBASE_API_KEY,
  authDomain: process.env.FIREBASE_AUTH_DOMAIN,
  projectId: process.env.FIREBASE_PROJECT_ID,
  storageBucket: process.env.FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.FIREBASE_APP_ID,
}

const firebaseClient = ((config) => {
  if (!firebase.apps.length) {
    firebase.initializeApp(config)
  }
  return firebase
})(firebaseClientConfig)`,
  authProvider: {
    client: 'firebaseClient',
    type: 'firebase'
  }
}; // required packages to install

exports.config = config;
const webPackages = ['firebase'];
exports.webPackages = webPackages;
const apiPackages = ['firebase-admin']; // any notes to print out when the job is done

exports.apiPackages = apiPackages;
const notes = ['You will need to create several environment variables with your Firebase config options.', 'Check out web/src/App.{js,tsx} for the variables you need to add.', 'See: https://firebase.google.com/docs/web/setup#config-object'];
exports.notes = notes;