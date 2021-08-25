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
var gatsby_1 = require("gatsby");
var react_1 = __importDefault(require("react"));
var blog_post_preview_1 = __importDefault(require("components/blog-post-preview"));
var styles = __importStar(require("components/blog-post-preview-grid.module.css"));
function BlogPostPreviewGrid(props) {
    return (<div className={styles.root}>
      {props.title && <h2 className={styles.headline}>{props.title}</h2>}
      <ul className={styles.grid}>
        {props.nodes &&
            props.nodes.map(function (node) { return (<li key={node.id}>
              <blog_post_preview_1.default {...node}/>
            </li>); })}
      </ul>
      {props.browseMoreHref && (<div className={styles.browseMoreNav}>
          <gatsby_1.Link to={props.browseMoreHref}>Browse more</gatsby_1.Link>
        </div>)}
    </div>);
}
BlogPostPreviewGrid.defaultProps = {
    title: '',
    nodes: [],
    browseMoreHref: ''
};
exports["default"] = BlogPostPreviewGrid;
//# sourceMappingURL=blog-post-preview-grid.jsx.map