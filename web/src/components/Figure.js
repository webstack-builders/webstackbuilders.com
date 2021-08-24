"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
exports.__esModule = true;
exports.Figure = void 0;
var gatsby_plugin_image_1 = require("gatsby-plugin-image");
var gatsby_source_sanity_1 = require("gatsby-source-sanity");
var react_1 = __importDefault(require("react"));
var client_config_1 = __importDefault(require("../gatsby/client-config"));
var Figure = function (_a) {
    var node = _a.node;
    if (!node || !node.asset || !node.asset._id) {
        return null;
    }
    var gatsbyImageData = gatsby_source_sanity_1.getGatsbyImageData(node, { maxWidth: 675 }, client_config_1["default"].sanity);
    return (<figure>
      <gatsby_plugin_image_1.GatsbyImage image={gatsbyImageData} alt={node.alt}/>
      <figcaption>{node.caption}</figcaption>
    </figure>);
};
exports.Figure = Figure;
//# sourceMappingURL=Figure.js.map