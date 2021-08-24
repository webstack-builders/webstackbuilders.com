"use strict";
/* global __DEV__ */
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
exports.__esModule = true;
exports.loadStructure = exports.getDefaultStructure = exports.serializeStructure = exports.isStructure = exports.isSubscribable = void 0;
var structure_builder_1 = __importDefault(require("@sanity/desk-tool/structure-builder"));
var rxjs_1 = require("rxjs");
var operators_1 = require("rxjs/operators");
var prevStructureError = null;
if (__DEV__) {
    if (module.hot && module.hot.data) {
        prevStructureError = module.hot.data.prevError;
    }
}
function isSubscribable(thing) {
    return (thing &&
        (typeof thing.then === 'function' || typeof thing.subscribe === 'function'));
}
exports.isSubscribable = isSubscribable;
function isStructure(structure) {
    return (structure &&
        (typeof structure === 'function' ||
            typeof structure.serialize !== 'function' ||
            typeof structure.then !== 'function' ||
            typeof structure.subscribe !== 'function' ||
            typeof structure.type !== 'string'));
}
exports.isStructure = isStructure;
function serializeStructure(item, context, resolverArgs) {
    if (resolverArgs === void 0) { resolverArgs = []; }
    // Lazy
    if (typeof item === 'function') {
        return serializeStructure(item.apply(void 0, resolverArgs), context, resolverArgs);
    }
    // Promise/observable returning a function, builder or plain JSON structure
    if (isSubscribable(item)) {
        return rxjs_1.from(item).pipe(operators_1.mergeMap(function (val) { return serializeStructure(val, context, resolverArgs); }));
    }
    // Builder?
    if (item && typeof item.serialize === 'function') {
        return serializeStructure(item.serialize(context));
    }
    // Plain value?
    return rxjs_1.of(item);
}
exports.serializeStructure = serializeStructure;
function getDefaultStructure() {
    var items = structure_builder_1["default"].documentTypeListItems();
    return structure_builder_1["default"].list()
        .id('__root__')
        .title('Content')
        .showIcons(items.some(function (item) { return item.getSchemaType().icon; }))
        .items(items);
}
exports.getDefaultStructure = getDefaultStructure;
// We are lazy-requiring/resolving the structure inside of a function in order to catch errors
// on the root-level of the module. Any loading errors will be caught and emitted as errors
// eslint-disable-next-line complexity
function loadStructure() {
    var structure;
    try {
        var mod = require('part:@sanity/desk-tool/structure?') || getDefaultStructure();
        structure = mod && mod.__esModule ? mod["default"] : mod;
        // On invalid modules, when HMR kicks in, we sometimes get an empty object back when the
        // source has changed without fixing the problem. In this case, keep showing the error
        if (__DEV__ &&
            prevStructureError &&
            structure &&
            structure.constructor.name === 'Object' &&
            Object.keys(structure).length === 0) {
            return rxjs_1.throwError(prevStructureError);
        }
        prevStructureError = null;
    }
    catch (err) {
        prevStructureError = err;
        return rxjs_1.throwError(err);
    }
    if (!isStructure(structure)) {
        return rxjs_1.throwError(new Error("Structure needs to export a function, an observable, a promise or a structure builder, got " + typeof structure));
    }
    // Defer to catch immediately thrown errors on serialization
    return rxjs_1.defer(function () { return serializeStructure(structure); });
}
exports.loadStructure = loadStructure;
//# sourceMappingURL=structure.js.map