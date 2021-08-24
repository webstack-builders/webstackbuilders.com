"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
exports.__esModule = true;
var react_1 = __importDefault(require("react"));
var Figure_1 = require("components/Figure");
var serializers = {
    types: {
        /* eslint-disable-next-line react/display-name */
        authorReference: function (_a) {
            var node = _a.node;
            return <span>{node.author.name}</span>;
        },
        mainImage: Figure_1.Figure
    }
};
exports["default"] = serializers;
//# sourceMappingURL=serializers.js.map