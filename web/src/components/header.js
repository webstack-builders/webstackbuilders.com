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
var styles = __importStar(require("components/header.module.css"));
var icon_1 = __importDefault(require("components/icon"));
var helpers_1 = require("lib/helpers");
var Header = function (_a) {
    var onHideNav = _a.onHideNav, onShowNav = _a.onShowNav, showNav = _a.showNav, siteTitle = _a.siteTitle;
    return (<div className={styles.root}>
    <div className={styles.wrapper}>
      <div className={styles.branding}>
        <gatsby_1.Link to="/">{siteTitle}</gatsby_1.Link>
      </div>

      <button className={styles.toggleNavButton} onClick={showNav ? onHideNav : onShowNav}>
        <icon_1["default"] symbol="hamburger"/>
      </button>

      <nav className={helpers_1.cn(styles.nav, showNav && styles.showNav)}>
        <ul>
          <li>
            <gatsby_1.Link to="/archive/">Archive</gatsby_1.Link>
          </li>
        </ul>
      </nav>
    </div>
  </div>);
};
exports["default"] = Header;
//# sourceMappingURL=header.js.map