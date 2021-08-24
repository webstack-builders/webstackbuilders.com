"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
exports.__esModule = true;
var react_1 = __importDefault(require("react"));
var layout_1 = __importDefault(require("components/layout"));
var seo_1 = __importDefault(require("components/seo"));
var NotFoundPage = function () { return (<layout_1["default"]>
    {/* eslint-disable react/jsx-pascal-case */}
    <seo_1["default"] title="404: Not found"/>
    {/* eslint-enable react/jsx-pascal-case */}
    <h1>NOT FOUND</h1>
    <p>You just hit a route that doesn&#39;t exist... the sadness.</p>
  </layout_1["default"]>); };
exports["default"] = NotFoundPage;
//# sourceMappingURL=404.js.map