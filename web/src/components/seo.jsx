"use strict";
var __makeTemplateObject = (this && this.__makeTemplateObject) || function (cooked, raw) {
    if (Object.defineProperty) { Object.defineProperty(cooked, "raw", { value: raw }); } else { cooked.raw = raw; }
    return cooked;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
exports.__esModule = true;
var gatsby_1 = require("gatsby");
var prop_types_1 = __importDefault(require("prop-types"));
var react_1 = __importDefault(require("react"));
var react_helmet_1 = __importDefault(require("react-helmet"));
var helpers_1 = require("lib/helpers");
var image_url_1 = require("lib/image-url");
function SEO(_a) {
    var _b;
    var description = _a.description, lang = _a.lang, meta = _a.meta, keywords = _a.keywords, title = _a.title, image = _a.image;
    var site = (gatsby_1.useStaticQuery(detailsQuery) || {}).site;
    var metaDescription = description || site.description || '';
    var siteTitle = site.title || '';
    var siteAuthor = ((_b = site.author) === null || _b === void 0 ? void 0 : _b.name) || '';
    var metaImage = (image === null || image === void 0 ? void 0 : image.asset)
        ? image_url_1.imageUrlFor(helpers_1.buildImageObj(image)).width(1200).url()
        : '';
    return (<react_helmet_1.default htmlAttributes={{ lang: lang }} title={title} titleTemplate={title === siteTitle ? '%s' : "%s | " + siteTitle} meta={[
            {
                name: 'description',
                content: metaDescription
            },
            {
                property: 'og:title',
                content: title
            },
            {
                property: 'og:description',
                content: metaDescription
            },
            {
                property: 'og:type',
                content: 'website'
            },
            {
                property: 'og:image',
                content: metaImage
            },
            {
                name: 'twitter:card',
                content: 'summary'
            },
            {
                name: 'twitter:creator',
                content: siteAuthor
            },
            {
                name: 'twitter:title',
                content: title
            },
            {
                name: 'twitter:description',
                content: metaDescription
            },
        ]
            .concat(keywords && keywords.length > 0
            ? {
                name: 'keywords',
                content: keywords.join(', ')
            }
            : [])
            .concat(meta)}/>);
}
SEO.defaultProps = {
    lang: 'en',
    meta: [],
    keywords: []
};
SEO.propTypes = {
    description: prop_types_1["default"].string,
    image: prop_types_1["default"].string,
    lang: prop_types_1["default"].string,
    meta: prop_types_1["default"].array,
    keywords: prop_types_1["default"].arrayOf(prop_types_1["default"].string),
    title: prop_types_1["default"].string.isRequired
};
exports["default"] = SEO;
var detailsQuery = gatsby_1.graphql(templateObject_1 || (templateObject_1 = __makeTemplateObject(["\n  query DefaultSEOQuery {\n    site: sanitySiteSettings(_id: { eq: \"siteSettings\" }) {\n      title\n      description\n      keywords\n      author {\n        name\n      }\n    }\n  }\n"], ["\n  query DefaultSEOQuery {\n    site: sanitySiteSettings(_id: { eq: \"siteSettings\" }) {\n      title\n      description\n      keywords\n      author {\n        name\n      }\n    }\n  }\n"])));
var templateObject_1;
//# sourceMappingURL=seo.jsx.map