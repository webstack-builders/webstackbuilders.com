"use strict";
var __makeTemplateObject = (this && this.__makeTemplateObject) || function (cooked, raw) {
    if (Object.defineProperty) { Object.defineProperty(cooked, "raw", { value: raw }); } else { cooked.raw = raw; }
    return cooked;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
exports.__esModule = true;
exports.query = void 0;
var gatsby_1 = require("gatsby");
var react_1 = __importDefault(require("react"));
var blog_post_preview_grid_1 = __importDefault(require("components/blog-post-preview-grid"));
var container_1 = __importDefault(require("components/container"));
var graphql_error_list_1 = __importDefault(require("components/graphql-error-list"));
var seo_1 = __importDefault(require("components/seo"));
var typography_module_css_1 = require("components/typography.module.css");
var layout_1 = __importDefault(require("containers/layout"));
var helpers_1 = require("lib/helpers");
exports.query = gatsby_1.graphql(templateObject_1 || (templateObject_1 = __makeTemplateObject(["\n  query ArchivePageQuery {\n    posts: allSanityPost(\n      sort: { fields: [publishedAt], order: DESC }\n      filter: { slug: { current: { ne: null } }, publishedAt: { ne: null } }\n    ) {\n      edges {\n        node {\n          id\n          publishedAt\n          mainImage {\n            ...SanityImage\n            alt\n          }\n          title\n          _rawExcerpt\n          slug {\n            current\n          }\n        }\n      }\n    }\n  }\n"], ["\n  query ArchivePageQuery {\n    posts: allSanityPost(\n      sort: { fields: [publishedAt], order: DESC }\n      filter: { slug: { current: { ne: null } }, publishedAt: { ne: null } }\n    ) {\n      edges {\n        node {\n          id\n          publishedAt\n          mainImage {\n            ...SanityImage\n            alt\n          }\n          title\n          _rawExcerpt\n          slug {\n            current\n          }\n        }\n      }\n    }\n  }\n"])));
var ArchivePage = function (props) {
    var data = props.data, errors = props.errors;
    if (errors) {
        return (<layout_1["default"]>
        <graphql_error_list_1["default"] errors={errors}/>
      </layout_1["default"]>);
    }
    var postNodes = data && data.posts && helpers_1.mapEdgesToNodes(data.posts);
    return (<layout_1["default"]>
      {/* eslint-disable react/jsx-pascal-case */}
      <seo_1["default"] title="Archive"/>
      {/* eslint-enable react/jsx-pascal-case */}
      <container_1["default"]>
        <h1 className={typography_module_css_1.responsiveTitle1}>Archive</h1>
        {postNodes && postNodes.length > 0 && (<blog_post_preview_grid_1["default"] nodes={postNodes}/>)}
      </container_1["default"]>
    </layout_1["default"]>);
};
exports["default"] = ArchivePage;
var templateObject_1;
//# sourceMappingURL=archive.js.map