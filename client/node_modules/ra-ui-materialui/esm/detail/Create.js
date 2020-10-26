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
import * as React from 'react';
import { Children, cloneElement, useMemo } from 'react';
import PropTypes from 'prop-types';
import Card from '@material-ui/core/Card';
import { makeStyles } from '@material-ui/core/styles';
import classnames from 'classnames';
import { useCheckMinimumRequiredProps, useCreateController, SideEffectContext, } from 'ra-core';
import TitleForRecord from '../layout/TitleForRecord';
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
var Create = function (props) { return (React.createElement(CreateView, __assign({}, props, useCreateController(props)))); };
Create.propTypes = {
    actions: PropTypes.element,
    aside: PropTypes.element,
    children: PropTypes.element,
    classes: PropTypes.object,
    className: PropTypes.string,
    hasCreate: PropTypes.bool,
    hasEdit: PropTypes.bool,
    hasShow: PropTypes.bool,
    resource: PropTypes.string.isRequired,
    title: PropTypes.node,
    record: PropTypes.object,
    hasList: PropTypes.bool,
    successMessage: PropTypes.string,
    onSuccess: PropTypes.func,
    onFailure: PropTypes.func,
    transform: PropTypes.func,
};
export var CreateView = function (props) {
    var _a;
    var actions = props.actions, aside = props.aside, basePath = props.basePath, children = props.children, classesOverride = props.classes, className = props.className, Content = props.component, defaultTitle = props.defaultTitle, hasList = props.hasList, hasShow = props.hasShow, _b = props.record, record = _b === void 0 ? {} : _b, redirect = props.redirect, resource = props.resource, save = props.save, setOnSuccess = props.setOnSuccess, setOnFailure = props.setOnFailure, setTransform = props.setTransform, saving = props.saving, title = props.title, version = props.version, rest = __rest(props, ["actions", "aside", "basePath", "children", "classes", "className", "component", "defaultTitle", "hasList", "hasShow", "record", "redirect", "resource", "save", "setOnSuccess", "setOnFailure", "setTransform", "saving", "title", "version"]);
    useCheckMinimumRequiredProps('Create', ['children'], props);
    var classes = useStyles(props);
    var sideEffectContextValue = useMemo(function () { return ({ setOnSuccess: setOnSuccess, setOnFailure: setOnFailure, setTransform: setTransform }); }, [setOnFailure, setOnSuccess, setTransform]);
    return (React.createElement(SideEffectContext.Provider, { value: sideEffectContextValue },
        React.createElement("div", __assign({ className: classnames('create-page', classes.root, className) }, sanitizeRestProps(rest)),
            React.createElement(TitleForRecord, { title: title, record: record, defaultTitle: defaultTitle }),
            actions &&
                cloneElement(actions, __assign({ basePath: basePath,
                    resource: resource,
                    hasList: hasList }, actions.props)),
            React.createElement("div", { className: classnames(classes.main, (_a = {},
                    _a[classes.noActions] = !actions,
                    _a)) },
                React.createElement(Content, { className: classes.card }, cloneElement(Children.only(children), {
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
                    cloneElement(aside, {
                        basePath: basePath,
                        record: record,
                        resource: resource,
                        save: save,
                        saving: saving,
                        version: version,
                    })))));
};
CreateView.propTypes = {
    actions: PropTypes.element,
    aside: PropTypes.element,
    basePath: PropTypes.string,
    children: PropTypes.element,
    classes: PropTypes.object,
    className: PropTypes.string,
    defaultTitle: PropTypes.any,
    hasList: PropTypes.bool,
    hasShow: PropTypes.bool,
    record: PropTypes.object,
    redirect: PropTypes.oneOfType([PropTypes.string, PropTypes.bool]),
    resource: PropTypes.string,
    save: PropTypes.func,
    title: PropTypes.node,
    onSuccess: PropTypes.func,
    onFailure: PropTypes.func,
    setOnSuccess: PropTypes.func,
    setOnFailure: PropTypes.func,
    setTransform: PropTypes.func,
};
CreateView.defaultProps = {
    classes: {},
    component: Card,
};
var useStyles = makeStyles(function (theme) {
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
export default Create;
