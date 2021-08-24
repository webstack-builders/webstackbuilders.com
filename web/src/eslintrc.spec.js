"use strict";
exports.__esModule = true;
var eslint = require('eslint');
var getErrors = function () {
    var CLIEngine = eslint.CLIEngine;
    var cli = new CLIEngine();
    return cli.executeOnText('');
};
describe('Validate ESLint configs', function () {
    it("load config in ESLint to validate all rules are correct", function () {
        expect(getErrors().results[0].messages).toEqual([]);
    });
});
//# sourceMappingURL=eslintrc.spec.js.map