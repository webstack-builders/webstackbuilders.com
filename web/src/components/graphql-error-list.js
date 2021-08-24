"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
exports.__esModule = true;
var react_1 = __importDefault(require("react"));
var GraphQLErrorList = function (_a) {
    var errors = _a.errors;
    return (<div>
    <h1>GraphQL Error</h1>
    {errors.map(function (error) { return (<pre key={error.message}>{error.message}</pre>); })}
  </div>);
};
exports["default"] = GraphQLErrorList;
//# sourceMappingURL=graphql-error-list.js.map