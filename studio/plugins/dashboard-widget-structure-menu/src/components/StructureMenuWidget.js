"use strict";
var __makeTemplateObject = (this && this.__makeTemplateObject) || function (cooked, raw) {
    if (Object.defineProperty) { Object.defineProperty(cooked, "raw", { value: raw }); } else { cooked.raw = raw; }
    return cooked;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
exports.__esModule = true;
var folder_icon_1 = __importDefault(require("part:@sanity/base/folder-icon"));
var file_icon_1 = __importDefault(require("part:@sanity/base/file-icon"));
var prop_types_1 = __importDefault(require("prop-types"));
var StructureMenuWidget_css_1 = __importDefault(require("./StructureMenuWidget.css"));
function getIconComponent(item) {
    if (item.icon)
        return item.icon;
    if (!item.schemaType)
        return file_icon_1["default"];
    return item.schemaType.icon || folder_icon_1["default"];
}
function StructureMenuWidget(props) {
    return className = { styles: StructureMenuWidget_css_1["default"], : .root } >
        className;
    {
        StructureMenuWidget_css_1["default"].header;
    }
     >
        className;
    {
        StructureMenuWidget_css_1["default"].title;
    }
     > Edit;
    your;
    content < /h3>
        < /div>
        < div;
    className = { styles: StructureMenuWidget_css_1["default"], : .content } >
        { props: props, : .structure.items
                .filter(function (item) { return item.type !== 'divider'; })
                .map(function (item) {
                var Icon = getIconComponent(item);
                return key = { item: item, : .id } >
                    className;
                {
                    StructureMenuWidget_css_1["default"].link;
                }
                href = {}(templateObject_1 || (templateObject_1 = __makeTemplateObject(["/desk/", ""], ["/desk/", ""])), item.id);
            },  >
                className, { styles: StructureMenuWidget_css_1["default"], : .iconWrapper } >
                />
                < /div>
                < div > { item: item, : .title } < /div>
                < /Link>
                < /div>)
        };
}
/div>
    < /div>;
StructureMenuWidget.propTypes = {
    structure: prop_types_1["default"].object
};
exports["default"] = StructureMenuWidget;
var templateObject_1;
//# sourceMappingURL=StructureMenuWidget.js.map