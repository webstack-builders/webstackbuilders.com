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
var react_1 = __importDefault(require("react"));
var author_list_1 = __importDefault(require("components/author-list"));
var styles = __importStar(require("components/blog-post.module.css"));
var container_1 = __importDefault(require("components/container"));
var portableText_1 = __importDefault(require("components/portableText"));
var helpers_1 = require("lib/helpers");
var image_url_1 = require("lib/image-url");
function BlogPost(props) {
    var _rawBody = props._rawBody, authors = props.authors, categories = props.categories, title = props.title, mainImage = props.mainImage, publishedAt = props.publishedAt;
    return (<article className={styles.root}>
      {mainImage && mainImage.asset && (<div className={styles.mainImage}>
          <img src={image_url_1.imageUrlFor(helpers_1.buildImageObj(mainImage))
                .width(1200)
                .height(Math.floor((9 / 16) * 1200))
                .fit('crop')
                .auto('format')
                .url()} alt={mainImage.alt}/>
        </div>)}
      <container_1.default>
        <div className={styles.grid}>
          <div className={styles.mainContent}>
            <h1 className={styles.title}>{title}</h1>
            {_rawBody && <portableText_1.default blocks={_rawBody}/>}
          </div>
          <aside className={styles.metaContent}>
            {publishedAt && (<div className={styles.publishedAt}>
                {date_fns_1.differenceInDays(new Date(publishedAt), new Date()) > 3
                ? date_fns_1.formatDistance(new Date(publishedAt), new Date())
                : date_fns_1.format(new Date(publishedAt), 'MMMM Mo, yyyy')}
              </div>)}
            {authors && <author_list_1.default items={authors} title="Authors"/>}
            {categories && (<div className={styles.categories}>
                <h3 className={styles.categoriesHeadline}>Categories</h3>
                <ul>
                  {categories.map(function (category) { return (<li key={category._id}>{category.title}</li>); })}
                </ul>
              </div>)}
          </aside>
        </div>
      </container_1.default>
    </article>);
}
exports["default"] = BlogPost;
//# sourceMappingURL=blog-post.jsx.map