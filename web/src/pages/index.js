"use strict";
//import type { Query, SanitySiteSettings } from 'generated/gatsby-types'
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
var blog_post_preview_list_1 = __importDefault(require("components/blog-post-preview-list"));
var container_1 = __importDefault(require("components/container"));
var graphql_error_list_1 = __importDefault(require("components/graphql-error-list"));
var seo_1 = __importDefault(require("components/seo"));
var layout_1 = __importDefault(require("containers/layout"));
var helpers_1 = require("lib/helpers");
// SanityMainImage
// Query_sanitySiteSettingsArgs, sanitySiteSettings
// Query_allSanityPostArgs, Query.allSanityPost
exports.query = gatsby_1.graphql(templateObject_1 || (templateObject_1 = __makeTemplateObject(["\n  fragment SanityImage on SanityMainImage {\n    crop {\n      _key\n      _type\n      top\n      bottom\n      left\n      right\n    }\n    hotspot {\n      _key\n      _type\n      x\n      y\n      height\n      width\n    }\n    asset {\n      _id\n    }\n  }\n\n  query IndexPageQuery {\n    site: sanitySiteSettings(_id: { regex: \"/(drafts.|)siteSettings/\" }) {\n      title\n      description\n      keywords\n    }\n    posts: allSanityPost(\n      limit: 6\n      sort: { fields: [publishedAt], order: DESC }\n      filter: { slug: { current: { ne: null } }, publishedAt: { ne: null } }\n    ) {\n      edges {\n        node {\n          id\n          publishedAt\n          mainImage {\n            ...SanityImage\n            alt\n          }\n          title\n          _rawExcerpt\n          slug {\n            current\n          }\n        }\n      }\n    }\n  }\n"], ["\n  fragment SanityImage on SanityMainImage {\n    crop {\n      _key\n      _type\n      top\n      bottom\n      left\n      right\n    }\n    hotspot {\n      _key\n      _type\n      x\n      y\n      height\n      width\n    }\n    asset {\n      _id\n    }\n  }\n\n  query IndexPageQuery {\n    site: sanitySiteSettings(_id: { regex: \"/(drafts.|)siteSettings/\" }) {\n      title\n      description\n      keywords\n    }\n    posts: allSanityPost(\n      limit: 6\n      sort: { fields: [publishedAt], order: DESC }\n      filter: { slug: { current: { ne: null } }, publishedAt: { ne: null } }\n    ) {\n      edges {\n        node {\n          id\n          publishedAt\n          mainImage {\n            ...SanityImage\n            alt\n          }\n          title\n          _rawExcerpt\n          slug {\n            current\n          }\n        }\n      }\n    }\n  }\n"])));
var IndexPage = function (props) {
    var data = props.data, errors = props.errors;
    if (errors) {
        return (<layout_1["default"]>
        <graphql_error_list_1["default"] errors={errors}/>
      </layout_1["default"]>);
    }
    var site = (data || {}).site;
    var postNodes = (data || {}).posts
        ? helpers_1.mapEdgesToNodes(data.posts)
            .filter(helpers_1.filterOutDocsWithoutSlugs)
            .filter(helpers_1.filterOutDocsPublishedInTheFuture)
        : [];
    if (!site) {
        throw new Error('Missing "Site settings". Open the studio at http://localhost:3333 and add some content to "Site settings" and restart the development server.');
    }
    return (<layout_1["default"]>
      {/* eslint-disable react/jsx-pascal-case */}
      <seo_1["default"] title={site.title} description={site.description} keywords={site.keywords}/>
      {/* eslint-enable react/jsx-pascal-case */}
      <container_1["default"]>
        <h1 hidden>Welcome to {site.title}</h1>
        {postNodes && (<blog_post_preview_list_1["default"] title="Latest blog posts" nodes={postNodes} browseMoreHref="/archive/"/>)}
      </container_1["default"]>
    </layout_1["default"]>);
};
exports["default"] = IndexPage;
var templateObject_1;
//# sourceMappingURL=index.js.map