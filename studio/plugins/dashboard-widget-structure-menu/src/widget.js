"use strict";
exports.__esModule = true;
var router_1 = require("part:@sanity/base/router");
var react_props_stream_1 = require("react-props-stream");
var components_1 = require("./components");
var props_1 = require("./props");
exports["default"] = {
    name: 'structure-menu',
    component: router_1.withRouterHOC(react_props_stream_1.withPropsStream(props_1.toPropsStream, components_1.StructureMenuWidget)),
    layout: { width: 'full' }
};
//# sourceMappingURL=widget.js.map