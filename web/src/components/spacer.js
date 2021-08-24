"use strict";
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
exports.__esModule = true;
var react_1 = __importDefault(require("react"));
var Spacer = function (_a) {
    var x = _a.x, y = _a.y, basis = _a.basis, restProps = __rest(_a, ["x", "y", "basis"]);
    var theme = useTheme();
    return (<div data-testid="Spacer" width={x ? theme.spacing(x) : undefined} height={y ? theme.spacing(y) : undefined} flexBasis={basis ? theme.spacing(basis) : undefined} flexGrow={0} flexShrink={0} {...restProps}/>);
};
exports["default"] = Spacer;
//# sourceMappingURL=spacer.js.map