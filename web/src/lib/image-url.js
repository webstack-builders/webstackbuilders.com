"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
exports.__esModule = true;
exports.imageUrlFor = void 0;
var image_url_1 = __importDefault(require("@sanity/image-url"));
var client_config_1 = __importDefault(require("gatsby/client-config"));
var builder = image_url_1["default"](client_config_1["default"].sanity);
function imageUrlFor(source) {
    return builder.image(source);
}
exports.imageUrlFor = imageUrlFor;
//# sourceMappingURL=image-url.js.map