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
exports.ShowView = void 0;
var React = __importStar(require("react"));
var react_1 = require("react");
var prop_types_1 = __importDefault(require("prop-types"));
var Card_1 = __importDefault(require("@material-ui/core/Card"));
var styles_1 = require("@material-ui/core/styles");
var classnames_1 = __importDefault(require("classnames"));
var ra_core_1 = require("ra-core");
var ShowActions_1 = __importDefault(require("./ShowActions"));
var TitleForRecord_1 = __importDefault(require("../layout/TitleForRecord"));
/**
 * Page component for the Show view
 *
 * The `<Show>` component renders the page title and actions,
 * fetches the record from the data provider.
 * It is not responsible for rendering the actual form -
 * that's the job of its child component (usually `<SimpleShowLayout>`),
 * to which it passes pass the `record` as prop.
 *
 * The <Show> component accepts the following props:
 *
 * - actions
 * - aside
 * - component
 * - title
 *
 * @example
 *
 * // in src/posts.js
 * import * as React from "react";
 * import { Show, SimpleShowLayout, TextField } from 'react-admin';
 *
 * export const PostShow = (props) => (
 *     <Show {...props}>
 *         <SimpleShowLayout>
 *             <TextField source="title" />
 *         </SimpleShowLayout>
 *     </Show>
 * );
 *
 * // in src/App.js
 * import * as React from "react";
 * import { Admin, Resource } from 'react-admin';
 *
 * import { PostShow } from './posts';
 *
 * const App = () => (
 *     <Admin dataProvider={...}>
 *         <Resource name="posts" show={PostShow} />
 *     </Admin>
 * );
 * export default App;
 */
var Show = function (props) { return (React.createElement(exports.ShowView, __assign({}, props, ra_core_1.useShowController(props)))); };
Show.propTypes = {
    actions: prop_types_1.default.element,
    aside: prop_types_1.default.element,
    children: prop_types_1.default.element,
    classes: prop_types_1.default.object,
    className: prop_types_1.default.string,
    hasCreate: prop_types_1.default.bool,
    hasEdit: prop_types_1.default.bool,
    hasList: prop_types_1.default.bool,
    hasShow: prop_types_1.default.bool,
    id: prop_types_1.default.any.isRequired,
    resource: prop_types_1.default.string.isRequired,
    title: prop_types_1.default.node,
};
exports.ShowView = function (props) {
    var _a;
    var actions = props.actions, aside = props.aside, basePath = props.basePath, children = props.children, classesOverride = props.classes, className = props.className, Content = props.component, defaultTitle = props.defaultTitle, hasEdit = props.hasEdit, hasList = props.hasList, record = props.record, resource = props.resource, title = props.title, version = props.version, rest = __rest(props, ["actions", "aside", "basePath", "children", "classes", "className", "component", "defaultTitle", "hasEdit", "hasList", "record", "resource", "title", "version"]);
    var classes = useStyles(props);
    var finalActions = typeof actions === 'undefined' && hasEdit ? (React.createElement(ShowActions_1.default, null)) : (actions);
    if (!children) {
        return null;
    }
    return (React.createElement("div", __assign({ className: classnames_1.default('show-page', classes.root, className) }, sanitizeRestProps(rest)),
        React.createElement(TitleForRecord_1.default, { title: title, record: record, defaultTitle: defaultTitle }),
        finalActions &&
            react_1.cloneElement(finalActions, __assign({ basePath: basePath, data: record, hasList: hasList,
                hasEdit: hasEdit,
                resource: resource }, finalActions.props)),
        React.createElement("div", { className: classnames_1.default(classes.main, (_a = {},
                _a[classes.noActions] = !finalActions,
                _a)) },
            React.createElement(Content, { className: classes.card }, record &&
                react_1.cloneElement(react_1.Children.only(children), {
                    resource: resource,
                    basePath: basePath,
                    record: record,
                    version: version,
                })),
            aside &&
                react_1.cloneElement(aside, {
                    resource: resource,
                    basePath: basePath,
                    record: record,
                    version: version,
                }))));
};
exports.ShowView.propTypes = {
    actions: prop_types_1.default.element,
    aside: prop_types_1.default.element,
    basePath: prop_types_1.default.string,
    children: prop_types_1.default.element,
    classes: prop_types_1.default.object,
    className: prop_types_1.default.string,
    defaultTitle: prop_types_1.default.any,
    hasEdit: prop_types_1.default.bool,
    hasList: prop_types_1.default.bool,
    loading: prop_types_1.default.bool,
    loaded: prop_types_1.default.bool,
    record: prop_types_1.default.object,
    resource: prop_types_1.default.string,
    title: prop_types_1.default.any,
    version: prop_types_1.default.node,
};
exports.ShowView.defaultProps = {
    classes: {},
    component: Card_1.default,
};
var useStyles = styles_1.makeStyles({
    root: {},
    main: {
        display: 'flex',
    },
    noActions: {
        marginTop: '1em',
    },
    card: {
        flex: '1 1 auto',
    },
}, { name: 'RaShow' });
var sanitizeRestProps = function (_a) {
    var _b = _a.hasCreate, hasCreate = _b === void 0 ? null : _b, _c = _a.hasEdit, hasEdit = _c === void 0 ? null : _c, _d = _a.history, history = _d === void 0 ? null : _d, _e = _a.id, id = _e === void 0 ? null : _e, _f = _a.loaded, loaded = _f === void 0 ? null : _f, _g = _a.loading, loading = _g === void 0 ? null : _g, _h = _a.location, location = _h === void 0 ? null : _h, _j = _a.match, match = _j === void 0 ? null : _j, _k = _a.options, options = _k === void 0 ? null : _k, _l = _a.permissions, permissions = _l === void 0 ? null : _l, rest = __rest(_a, ["hasCreate", "hasEdit", "history", "id", "loaded", "loading", "location", "match", "options", "permissions"]);
    return rest;
};
exports.default = Show;
