"use strict";
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
var date_fns_1 = require("date-fns");
var gatsby_1 = require("gatsby");
var react_1 = __importDefault(require("react"));
var styles = __importStar(require("components/blog-post-preview.module.css"));
var portableText_1 = __importDefault(require("components/portableText"));
var typography_module_css_1 = require("components/typography.module.css");
var helpers_1 = require("lib/helpers");
var image_url_1 = require("lib/image-url");
function BlogPostPreview(props) {
    return (<gatsby_1.Link className={props.isInList ? styles.inList : styles.inGrid} to={helpers_1.getBlogUrl(props.publishedAt, props.slug.current)}>
      <div className={styles.leadMediaThumb}>
        {props.mainImage && props.mainImage.asset && (<img src={image_url_1.imageUrlFor(helpers_1.buildImageObj(props.mainImage))
                .width(600)
                .height(Math.floor((9 / 16) * 600))
                .auto('format')
                .url()} alt={props.mainImage.alt}/>)}
      </div>
      <div className={styles.text}>
        <h3 className={helpers_1.cn(typography_module_css_1.responsiveTitle3, styles.title)}>{props.title}</h3>
        {props._rawExcerpt && (<div className={styles.excerpt}>
            <portableText_1["default"] blocks={props._rawExcerpt}/>
          </div>)}
        <div className={styles.date}>
          {date_fns_1.format(new Date(props.publishedAt), 'MMMM Mo, yyyy')}
        </div>
      </div>
    </gatsby_1.Link>);
}
exports["default"] = BlogPostPreview;
//# sourceMappingURL=blog-post-preview.js.map