"use strict";
exports.__esModule = true;
exports.toPlainText = exports.buildImageObj = exports.getBlogUrl = exports.filterOutDocsPublishedInTheFuture = exports.filterOutDocsWithoutSlugs = exports.mapEdgesToNodes = exports.cn = void 0;
var date_fns_1 = require("date-fns");
function cn() {
    var args = [];
    for (var _i = 0; _i < arguments.length; _i++) {
        args[_i] = arguments[_i];
    }
    return args.filter(Boolean).join(' ');
}
exports.cn = cn;
function mapEdgesToNodes(data) {
    if (!data.edges) {
        return [];
    }
    return data.edges.map(function (edge) { return edge.node; });
}
exports.mapEdgesToNodes = mapEdgesToNodes;
function filterOutDocsWithoutSlugs(_a) {
    var slug = _a.slug;
    return (slug || {}).current;
}
exports.filterOutDocsWithoutSlugs = filterOutDocsWithoutSlugs;
function filterOutDocsPublishedInTheFuture(_a) {
    var publishedAt = _a.publishedAt;
    return !date_fns_1.isFuture(new Date(publishedAt));
}
exports.filterOutDocsPublishedInTheFuture = filterOutDocsPublishedInTheFuture;
function getBlogUrl(publishedAt, slug) {
    return "/blog/" + date_fns_1.format(new Date(publishedAt), 'yyyy/MM') + "/" + (slug.current || slug) + "/";
}
exports.getBlogUrl = getBlogUrl;
function buildImageObj(source) {
    if (source === void 0) { source = { asset: {} }; }
    var imageObj = {
        asset: { _ref: source.asset._ref || source.asset._id }
    };
    if (source.crop) {
        imageObj.crop = source.crop;
    }
    if (source.hotspot) {
        imageObj.hotspot = source.hotspot;
    }
    return imageObj;
}
exports.buildImageObj = buildImageObj;
function toPlainText(blocks) {
    if (!blocks) {
        return '';
    }
    return blocks
        .map(function (block) {
        if (block._type !== 'block' || !block.children) {
            return '';
        }
        return block.children.map(function (child) { return child.text; }).join('');
    })
        .join('\n\n');
}
exports.toPlainText = toPlainText;
//# sourceMappingURL=helpers.js.map