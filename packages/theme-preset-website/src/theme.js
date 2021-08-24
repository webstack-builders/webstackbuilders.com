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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
/*
 * Theme UI template theme
 */
// @TODO: Can this could be refactored to turn this package into a Gatsby plugin, and
// the Prisma code highlighting added as the `prismPreset` option to the `gatsby-config.js`
// file here for the `gatsby-plugin-theme-ui` plugin?
var vs_dark_json_1 = __importDefault(require("@theme-ui/prism/presets/vs-dark.json"));
var heading = {
    color: 'text',
    fontFamily: 'heading',
    lineHeight: 'heading',
    fontWeight: 'heading'
};
var baseThemeTemplate = {
    space: [0, 4, 8, 16, 32, 64, 128, 256, 512],
    fonts: {
        body: 'system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", sans-serif',
        heading: 'inherit',
        monospace: 'Menlo, monospace'
    },
    fontSizes: [12, 14, 16, 20, 24, 32, 48, 64, 96],
    fontWeights: {
        body: 400,
        heading: 700,
        bold: 700
    },
    lineHeights: {
        body: 1.5,
        heading: 1.125
    },
    colors: {
        text: '#000',
        heading: '#07c',
        background: '#fff',
        primary: '#07c',
        secondary: '#30c',
        muted: '#f6f6f6'
    },
    styles: {
        root: {
            fontFamily: 'body',
            lineHeight: 'body',
            fontWeight: 'body'
        },
        h1: __assign(__assign({}, heading), { fontSize: 5 }),
        h2: __assign(__assign({}, heading), { fontSize: 4 }),
        h3: __assign(__assign({}, heading), { fontSize: 3 }),
        h4: __assign(__assign({}, heading), { fontSize: 2 }),
        h5: __assign(__assign({}, heading), { fontSize: 1 }),
        h6: __assign(__assign({}, heading), { fontSize: 0 }),
        p: {
            color: 'text',
            fontFamily: 'body',
            fontWeight: 'body',
            lineHeight: 'body'
        },
        a: {
            color: 'primary'
        },
        pre: {
            fontFamily: 'monospace',
            overflowX: 'auto',
            code: {
                color: 'inherit'
            }
        },
        code: __assign({}, vs_dark_json_1["default"]),
        table: {
            width: '100%',
            borderCollapse: 'separate',
            borderSpacing: 0
        },
        th: {
            textAlign: 'left',
            borderBottomStyle: 'solid'
        },
        td: {
            textAlign: 'left',
            borderBottomStyle: 'solid'
        },
        img: {
            maxWidth: '100%'
        }
    }
};
module.exports = baseThemeTemplate;
//# sourceMappingURL=theme.js.map