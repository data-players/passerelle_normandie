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
Object.defineProperty(exports, "__esModule", { value: true });
exports.CreateView = void 0;
var React = __importStar(require("react"));
var react_1 = require("react");
var prop_types_1 = __importDefault(require("prop-types"));
var Card_1 = __importDefault(require("@material-ui/core/Card"));
var styles_1 = require("@material-ui/core/styles");
var classnames_1 = __importDefault(require("classnames"));
var ra_core_1 = require("ra-core");
var TitleForRecord_1 = __importDefault(require("../layout/TitleForRecord"));
/**
 * Page component for the Create view
 *
 * The `<Create>` component renders the page title and actions.
 * It is not responsible for rendering the actual form -
 * that's the job of its child component (usually `<SimpleForm>`),
 * to which it passes pass the `record` as prop.
 *
 * The <Create> component accepts the following props:
 *
 * - actions
 * - aside
 * - component
 * - successMessage
 * - title
 *
 * @example
 *
 * // in src/posts.js
 * import * as React from "react";
 * import { Create, SimpleForm, TextInput } from 'react-admin';
 *
 * export const PostCreate = (props) => (
 *     <Create {...props}>
 *         <SimpleForm>
 *             <TextInput source="title" />
 *         </SimpleForm>
 *     </Create>
 * );
 *
 * // in src/App.js
 * import * as React from "react";
 * import { Admin, Resource } from 'react-admin';
 *
 * import { PostCreate } from './posts';
 *
 * const App = () => (
 *     <Admin dataProvider={...}>
 *         <Resource name="posts" create={PostCreate} />
 *     </Admin>
 * );
 * export default App;
 */
var Create = function (props) { return (React.createElement(exports.CreateView, __assign({}, props, ra_core_1.useCreateController(props)))); };
Create.propTypes = {
    actions: prop_types_1.default.element,
    aside: prop_types_1.default.element,
    children: prop_types_1.default.element,
    classes: prop_types_1.default.object,
    className: prop_types_1.default.string,
    hasCreate: prop_types_1.default.bool,
    hasEdit: prop_types_1.default.bool,
    hasShow: prop_types_1.default.bool,
    resource: prop_types_1.default.string.isRequired,
    title: prop_types_1.default.node,
    record: prop_types_1.default.object,
    hasList: prop_types_1.default.bool,
    successMessage: prop_types_1.default.string,
    onSuccess: prop_types_1.default.func,
    onFailure: prop_types_1.default.func,
    transform: prop_types_1.default.func,
};
exports.CreateView = function (props) {
    var _a;
    var actions = props.actions, aside = props.aside, basePath = props.basePath, children = props.children, classesOverride = props.classes, className = props.className, Content = props.component, defaultTitle = props.defaultTitle, hasList = props.hasList, hasShow = props.hasShow, _b = props.record, record = _b === void 0 ? {} : _b, redirect = props.redirect, resource = props.resource, save = props.save, setOnSuccess = props.setOnSuccess, setOnFailure = props.setOnFailure, setTransform = props.setTransform, saving = props.saving, title = props.title, version = props.version, rest = __rest(props, ["actions", "aside", "basePath", "children", "classes", "className", "component", "defaultTitle", "hasList", "hasShow", "record", "redirect", "resource", "save", "setOnSuccess", "setOnFailure", "setTransform", "saving", "title", "version"]);
    ra_core_1.useCheckMinimumRequiredProps('Create', ['children'], props);
    var classes = useStyles(props);
    var sideEffectContextValue = react_1.useMemo(function () { return ({ setOnSuccess: setOnSuccess, setOnFailure: setOnFailure, setTransform: setTransform }); }, [setOnFailure, setOnSuccess, setTransform]);
    return (React.createElement(ra_core_1.SideEffectContext.Provider, { value: sideEffectContextValue },
        React.createElement("div", __assign({ className: classnames_1.default('create-page', classes.root, className) }, sanitizeRestProps(rest)),
            React.createElement(TitleForRecord_1.default, { title: title, record: record, defaultTitle: defaultTitle }),
            actions &&
                react_1.cloneElement(actions, __assign({ basePath: basePath,
                    resource: resource,
                    hasList: hasList }, actions.props)),
            React.createElement("div", { className: classnames_1.default(classes.main, (_a = {},
                    _a[classes.noActions] = !actions,
                    _a)) },
                React.createElement(Content, { className: classes.card }, react_1.cloneElement(react_1.Children.only(children), {
                    basePath: basePath,
                    record: record,
                    redirect: typeof children.props.redirect === 'undefined'
                        ? redirect
                        : children.props.redirect,
                    resource: resource,
                    save: save,
                    saving: saving,
                    version: version,
                })),
                aside &&
                    react_1.cloneElement(aside, {
                        basePath: basePath,
                        record: record,
                        resource: resource,
                        save: save,
                        saving: saving,
                        version: version,
                    })))));
};
exports.CreateView.propTypes = {
    actions: prop_types_1.default.element,
    aside: prop_types_1.default.element,
    basePath: prop_types_1.default.string,
    children: prop_types_1.default.element,
    classes: prop_types_1.default.object,
    className: prop_types_1.default.string,
    defaultTitle: prop_types_1.default.any,
    hasList: prop_types_1.default.bool,
    hasShow: prop_types_1.default.bool,
    record: prop_types_1.default.object,
    redirect: prop_types_1.default.oneOfType([prop_types_1.default.string, prop_types_1.default.bool]),
    resource: prop_types_1.default.string,
    save: prop_types_1.default.func,
    title: prop_types_1.default.node,
    onSuccess: prop_types_1.default.func,
    onFailure: prop_types_1.default.func,
    setOnSuccess: prop_types_1.default.func,
    setOnFailure: prop_types_1.default.func,
    setTransform: prop_types_1.default.func,
};
exports.CreateView.defaultProps = {
    classes: {},
    component: Card_1.default,
};
var useStyles = styles_1.makeStyles(function (theme) {
    var _a;
    return ({
        root: {},
        main: {
            display: 'flex',
        },
        noActions: (_a = {},
            _a[theme.breakpoints.up('sm')] = {
                marginTop: '1em',
            },
            _a),
        card: {
            flex: '1 1 auto',
        },
    });
}, { name: 'RaCreate' });
var sanitizeRestProps = function (_a) {
    var _b = _a.hasCreate, hasCreate = _b === void 0 ? null : _b, _c = _a.hasEdit, hasEdit = _c === void 0 ? null : _c, _d = _a.history, history = _d === void 0 ? null : _d, _e = _a.loaded, loaded = _e === void 0 ? null : _e, _f = _a.loading, loading = _f === void 0 ? null : _f, _g = _a.location, location = _g === void 0 ? null : _g, _h = _a.match, match = _h === void 0 ? null : _h, _j = _a.onFailure, onFailure = _j === void 0 ? null : _j, _k = _a.onSuccess, onSuccess = _k === void 0 ? null : _k, _l = _a.options, options = _l === void 0 ? null : _l, _m = _a.permissions, permissions = _m === void 0 ? null : _m, _o = _a.transform, transform = _o === void 0 ? null : _o, rest = __rest(_a, ["hasCreate", "hasEdit", "history", "loaded", "loading", "location", "match", "onFailure", "onSuccess", "options", "permissions", "transform"]);
    return rest;
};
exports.default = Create;
