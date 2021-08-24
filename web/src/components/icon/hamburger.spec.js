"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
exports.__esModule = true;
var react_1 = __importDefault(require("react"));
var react_test_renderer_1 = __importDefault(require("react-test-renderer"));
var hamburger_1 = __importDefault(require("./hamburger"));
describe('HamburgerIcon', function () {
    it('renders correctly', function () {
        var tree = react_test_renderer_1["default"]
            .create(<hamburger_1["default"] />)
            .toJSON();
        expect(tree).toMatchSnapshot();
    });
});
//# sourceMappingURL=hamburger.spec.js.map