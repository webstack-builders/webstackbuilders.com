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
exports.__esModule = true;
/** @jsx jsx */
var theme_ui_1 = require("theme-ui");
var styles = __importStar(require("components/author-list.module.css"));
var helpers_1 = require("lib/helpers");
var image_url_1 = require("lib/image-url");
var AuthorList = function (_a) {
    var items = _a.items, title = _a.title;
    return (<div className={styles.root}>
      <h2 className={styles.headline}>{title}</h2>
      <ul className={styles.list}>
        {items.map(function (_a) {
            var author = _a.author, _key = _a._key;
            var authorName = author && author.name;
            return (<li key={_key} className={styles.listItem}>
              <div>
                <div className={styles.avatar}>
                  {author && author.image && author.image.asset && (<img src={image_url_1.imageUrlFor(helpers_1.buildImageObj(author.image))
                        .width(100)
                        .height(100)
                        .fit('crop')
                        .url()} alt=""/>)}
                </div>
              </div>
              <div>
                <div>{authorName || <em>Missing name</em>}</div>
              </div>
            </li>);
        })}
      </ul>
    </div>);
};
exports["default"] = AuthorList;
//# sourceMappingURL=author-list.jsx.map