"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
exports.__esModule = true;
var react_1 = __importDefault(require("react"));
var hamburger_1 = __importDefault(require("components/icon/hamburger"));
function Icon(props) {
    switch (props.symbol) {
        case 'hamburger':
            return <hamburger_1.default />;
        default:
            return <span>Unknown icon: {props.symbol}</span>;
    }
}
exports["default"] = Icon;
//# sourceMappingURL=index.jsx.map