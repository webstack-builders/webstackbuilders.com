"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
exports.__esModule = true;
/**
 * Sanity client variables from environmental file
 *
 * Used in client-side React components fetching image data from Sanity CMS
 */
var clientConfig = {
    sanity: __assign({ dataset: process.env.SANITY_DATASET, projectId: process.env.SANITY_PROJECT_ID }, (process.env.NODE_ENV === 'development' && {
        token: process.env.SANITY_TOKEN
    }))
};
exports["default"] = clientConfig;
//# sourceMappingURL=client-config.js.map