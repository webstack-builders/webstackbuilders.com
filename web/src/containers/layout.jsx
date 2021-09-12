"use strict";
var __makeTemplateObject = (this && this.__makeTemplateObject) || function (cooked, raw) {
    if (Object.defineProperty) { Object.defineProperty(cooked, "raw", { value: raw }); } else { cooked.raw = raw; }
    return cooked;
};
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
exports.__esModule = true;
var gatsby_1 = require("gatsby");
var react_1 = __importStar(require("react"));
var layout_1 = __importDefault(require("components/layout"));
var query = gatsby_1.graphql(templateObject_1 || (templateObject_1 = __makeTemplateObject(["\n  query SiteTitleQuery {\n    site: sanitySiteSettings(_id: { regex: \"/(drafts.|)siteSettings/\" }) {\n      title\n    }\n  }\n"], ["\n  query SiteTitleQuery {\n    site: sanitySiteSettings(_id: { regex: \"/(drafts.|)siteSettings/\" }) {\n      title\n    }\n  }\n"])));
function LayoutContainer(props) {
    var _a = react_1.useState(false), showNav = _a[0], setShowNav = _a[1];
    function handleShowNav() {
        setShowNav(true);
    }
    function handleHideNav() {
        setShowNav(false);
    }
    var data = gatsby_1.useStaticQuery(query);
    if (!data.site) {
        throw new Error('Missing "Site settings". Open the Studio at http://localhost:3333 and some content in "Site settings"');
    }
    return (<layout_1.default {...props} showNav={showNav} siteTitle={data.site.title} onHideNav={handleHideNav} onShowNav={handleShowNav}/>);
}
exports["default"] = LayoutContainer;
var templateObject_1;
//# sourceMappingURL=layout.jsx.map