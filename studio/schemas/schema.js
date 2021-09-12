"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
exports.__esModule = true;
// First, we must import the schema creator
/* eslint-disable import/no-unresolved */
var schema_type_1 = __importDefault(require("all:part:@sanity/base/schema-type"));
var schema_creator_1 = __importDefault(require("part:@sanity/base/schema-creator"));
/* eslint-enable import/no-unresolved */
// Then import schema types from any plugins that might expose them
// document schemas
var author_1 = __importDefault(require("./documents/author"));
var category_1 = __importDefault(require("./documents/category"));
var post_1 = __importDefault(require("./documents/post"));
var siteSettings_1 = __importDefault(require("./documents/siteSettings"));
// Object types
var authorReference_1 = __importDefault(require("./objects/authorReference"));
var bioPortableText_1 = __importDefault(require("./objects/bioPortableText"));
var bodyPortableText_1 = __importDefault(require("./objects/bodyPortableText"));
var excerptPortableText_1 = __importDefault(require("./objects/excerptPortableText"));
var mainImage_1 = __importDefault(require("./objects/mainImage"));
// Then we give our schema to the builder and provide the result to Sanity
exports["default"] = schema_creator_1["default"]({
    // We name our schema
    name: 'blog',
    // Then proceed to concatenate our our document type
    // to the ones provided by any plugins that are installed
    types: schema_type_1["default"].concat([
        // The following are document types which will appear
        // in the studio.
        siteSettings_1["default"],
        post_1["default"],
        category_1["default"],
        author_1["default"],
        mainImage_1["default"],
        authorReference_1["default"],
        bodyPortableText_1["default"],
        bioPortableText_1["default"],
        excerptPortableText_1["default"],
        // When added to this list, object types can be used as
        // { type: 'typename' } in other document schemas
    ])
});
//# sourceMappingURL=schema.js.map