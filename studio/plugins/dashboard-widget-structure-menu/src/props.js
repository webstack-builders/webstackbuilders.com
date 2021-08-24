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
exports.toPropsStream = void 0;
var rxjs_1 = require("rxjs");
var operators_1 = require("rxjs/operators");
var structure_1 = require("./lib/structure");
var toPropsStream = function (props$) {
    var structure$ = structure_1.loadStructure();
    return rxjs_1.combineLatest([props$, structure$]).pipe(operators_1.map(function (_a) {
        var props = _a[0], structure = _a[1];
        return (__assign(__assign({}, props), { structure: structure }));
    }));
};
exports.toPropsStream = toPropsStream;
//# sourceMappingURL=props.js.map