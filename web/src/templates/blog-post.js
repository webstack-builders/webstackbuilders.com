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
var blog_post_1 = __importDefault(require("components/blog-post"));
var container_1 = __importDefault(require("components/container"));
var graphql_error_list_1 = __importDefault(require("components/graphql-error-list"));
var seo_1 = __importDefault(require("components/seo"));
var layout_1 = __importDefault(require("containers/layout"));
var helpers_1 = require("lib/helpers");
exports.query = gatsby_1.graphql(templateObject_1 || (templateObject_1 = __makeTemplateObject(["\n  query BlogPostTemplateQuery($id: String!) {\n    post: sanityPost(id: { eq: $id }) {\n      id\n      publishedAt\n      categories {\n        _id\n        title\n      }\n      mainImage {\n        ...SanityImage\n        alt\n      }\n      title\n      slug {\n        current\n      }\n      _rawExcerpt(resolveReferences: { maxDepth: 5 })\n      _rawBody(resolveReferences: { maxDepth: 5 })\n      authors {\n        _key\n        author {\n          image {\n            crop {\n              _key\n              _type\n              top\n              bottom\n              left\n              right\n            }\n            hotspot {\n              _key\n              _type\n              x\n              y\n              height\n              width\n            }\n            asset {\n              _id\n            }\n          }\n          name\n        }\n      }\n    }\n  }\n"], ["\n  query BlogPostTemplateQuery($id: String!) {\n    post: sanityPost(id: { eq: $id }) {\n      id\n      publishedAt\n      categories {\n        _id\n        title\n      }\n      mainImage {\n        ...SanityImage\n        alt\n      }\n      title\n      slug {\n        current\n      }\n      _rawExcerpt(resolveReferences: { maxDepth: 5 })\n      _rawBody(resolveReferences: { maxDepth: 5 })\n      authors {\n        _key\n        author {\n          image {\n            crop {\n              _key\n              _type\n              top\n              bottom\n              left\n              right\n            }\n            hotspot {\n              _key\n              _type\n              x\n              y\n              height\n              width\n            }\n            asset {\n              _id\n            }\n          }\n          name\n        }\n      }\n    }\n  }\n"])));
var BlogPostTemplate = function (props) {
    var data = props.data, errors = props.errors;
    var post = data && data.post;
    return (<layout_1["default"]>
      {/* eslint-disable react/jsx-pascal-case */}
      {errors && <seo_1["default"] title="GraphQL Error"/>}
      {post && (<seo_1["default"] title={post.title || 'Untitled'} description={helpers_1.toPlainText(post._rawExcerpt)} image={post.mainImage}/>)}
      {/* eslint-enable react/jsx-pascal-case */}

      {errors && (<container_1["default"]>
          <graphql_error_list_1["default"] errors={errors}/>
        </container_1["default"]>)}

      {post && <blog_post_1["default"] {...post}/>}
    </layout_1["default"]>);
};
exports["default"] = BlogPostTemplate;
var templateObject_1;
//# sourceMappingURL=blog-post.js.map