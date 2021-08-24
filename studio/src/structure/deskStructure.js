"use strict";
var __spreadArray = (this && this.__spreadArray) || function (to, from) {
    for (var i = 0, il = from.length, j = to.length; i < il; i++, j++)
        to[j] = from[i];
    return to;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
exports.__esModule = true;
exports.getDefaultDocumentNode = void 0;
var structure_builder_1 = __importDefault(require("@sanity/desk-tool/structure-builder"));
var md_1 = require("react-icons/md");
var IframePreview_1 = __importDefault(require("../previews/IframePreview"));
// Web preview configuration
var remoteURL = 'https://webstackbuilders-com.netlify.app';
var localURL = 'http://localhost:8002';
var previewURL = window.location.hostname === 'localhost' ? localURL : remoteURL;
var getDefaultDocumentNode = function (props) {
    /**
     * Here you can define fallback views for document types without
     * a structure definition for the document node. If you want different
     * fallbacks for different types, or document values (e.g. if there is a slug present)
     * you can set up that logic in here too.
     * https://www.sanity.io/docs/structure-builder-reference#getdefaultdocumentnode-97e44ce262c9
     */
    var schemaType = props.schemaType;
    if (schemaType == 'post') {
        return structure_builder_1["default"].document().views([
            structure_builder_1["default"].view.form(),
            structure_builder_1["default"].view
                .component(IframePreview_1["default"])
                .title('Web preview')
                .options({ previewURL: previewURL }),
        ]);
    }
    return structure_builder_1["default"].document().views([structure_builder_1["default"].view.form()]);
};
exports.getDefaultDocumentNode = getDefaultDocumentNode;
/**
 * This defines how documents are grouped and listed out in the Studio.
 * Relevant documentation:
 * - https://www.sanity.io/guides/getting-started-with-structure-builder
 * - https://www.sanity.io/docs/structure-builder-introduction
 * - https://www.sanity.io/docs/structure-builder-typical-use-cases
 * - https://www.sanity.io/docs/structure-builder-reference
 */
exports["default"] = (function () {
    return structure_builder_1["default"].list()
        .title('Content')
        .items(__spreadArray([
        structure_builder_1["default"].listItem()
            .title('Settings')
            .icon(md_1.MdSettings)
            .child(structure_builder_1["default"].editor()
            .id('siteSettings')
            .schemaType('siteSettings')
            .documentId('siteSettings')),
        structure_builder_1["default"].divider(),
        structure_builder_1["default"].listItem()
            .title('Blog posts')
            .icon(md_1.MdDescription)
            .schemaType('post')
            .child(structure_builder_1["default"].documentTypeList('post').title('Blog posts')),
        structure_builder_1["default"].listItem()
            .title('Authors')
            .icon(md_1.MdPerson)
            .schemaType('author')
            .child(structure_builder_1["default"].documentTypeList('author').title('Authors')),
        structure_builder_1["default"].listItem()
            .title('Categories')
            .icon(md_1.MdLocalOffer)
            .schemaType('category')
            .child(structure_builder_1["default"].documentTypeList('category').title('Categories'))
    ], structure_builder_1["default"].documentTypeListItems().filter(function (listItem) {
        return !['category', 'author', 'post', 'siteSettings'].includes(listItem.getId());
    })));
});
//# sourceMappingURL=deskStructure.js.map