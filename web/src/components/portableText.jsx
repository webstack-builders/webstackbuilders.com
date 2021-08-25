"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
exports.__esModule = true;
var block_content_to_react_1 = __importDefault(require("@sanity/block-content-to-react"));
var react_1 = __importDefault(require("react"));
var serializers_1 = __importDefault(require("components/serializers"));
var client_config_1 = __importDefault(require("gatsby/client-config"));
var PortableText = function (_a) {
    var blocks = _a.blocks;
    return (<block_content_to_react_1.default blocks={blocks} serializers={serializers_1["default"]} {...client_config_1["default"].sanity}/>);
};
exports["default"] = PortableText;
//# sourceMappingURL=portableText.jsx.map