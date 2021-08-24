"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
exports.__esModule = true;
var prop_types_1 = __importDefault(require("prop-types"));
var date_fns_1 = require("date-fns");
var IframePreview_module_css_1 = __importDefault(require("./IframePreview.module.css"));
/**
 * Explore more examples of previews:
 * https://www.sanity.io/blog/evolve-authoring-experiences-with-views-and-split-panes
 */
var assemblePostUrl = function (_a) {
    var displayed = _a.displayed, options = _a.options;
    var slug = displayed.slug, publishedAt = displayed.publishedAt;
    var previewURL = options.previewURL;
    if (!slug || !previewURL) {
        console.warn('Missing slug or previewURL', { slug: slug, previewURL: previewURL });
        return '';
    }
    var dateSegment = date_fns_1.format(new Date(publishedAt), 'yyyy/MM');
    var path = "/" + dateSegment + "/" + slug.current + "/";
    return previewURL + "/blog" + path;
};
var IframePreview = function (props) {
    var options = props.options;
    var displayed = props.document.displayed;
    if (!displayed) {
        return className = { styles: IframePreview_module_css_1["default"], : .componentWrapper } >
            There;
        is;
        no;
        document;
        to;
        preview < /p>
            < /div>;
    }
};
var url = assemblePostUrl({ displayed: displayed, options: options });
if (!url) {
    return className = { styles: IframePreview_module_css_1["default"], : .componentWrapper } >
        Hmm.Having;
    problems;
    constructing;
    the;
    web;
    front - end;
    URL. < /p>
        < /div>;
}
return className = { styles: IframePreview_module_css_1["default"], : .componentWrapper } >
    className;
{
    IframePreview_module_css_1["default"].iframeContainer;
}
 >
    src;
{
    url;
}
frameBorder = { '0':  } /  >
    /div>
    < /div>;
IframePreview.propTypes = {
    document: prop_types_1["default"].object,
    options: prop_types_1["default"].object
};
IframePreview.defaultProps = {
    document: null
};
exports["default"] = IframePreview;
//# sourceMappingURL=IframePreview.js.map