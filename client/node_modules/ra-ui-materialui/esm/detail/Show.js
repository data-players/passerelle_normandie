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
import { cloneElement, Children } from 'react';
import PropTypes from 'prop-types';
import Card from '@material-ui/core/Card';
import { makeStyles } from '@material-ui/core/styles';
import classnames from 'classnames';
import { useShowController } from 'ra-core';
import DefaultActions from './ShowActions';
import TitleForRecord from '../layout/TitleForRecord';
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
var Show = function (props) { return (React.createElement(ShowView, __assign({}, props, useShowController(props)))); };
Show.propTypes = {
    actions: PropTypes.element,
    aside: PropTypes.element,
    children: PropTypes.element,
    classes: PropTypes.object,
    className: PropTypes.string,
    hasCreate: PropTypes.bool,
    hasEdit: PropTypes.bool,
    hasList: PropTypes.bool,
    hasShow: PropTypes.bool,
    id: PropTypes.any.isRequired,
    resource: PropTypes.string.isRequired,
    title: PropTypes.node,
};
export var ShowView = function (props) {
    var _a;
    var actions = props.actions, aside = props.aside, basePath = props.basePath, children = props.children, classesOverride = props.classes, className = props.className, Content = props.component, defaultTitle = props.defaultTitle, hasEdit = props.hasEdit, hasList = props.hasList, record = props.record, resource = props.resource, title = props.title, version = props.version, rest = __rest(props, ["actions", "aside", "basePath", "children", "classes", "className", "component", "defaultTitle", "hasEdit", "hasList", "record", "resource", "title", "version"]);
    var classes = useStyles(props);
    var finalActions = typeof actions === 'undefined' && hasEdit ? (React.createElement(DefaultActions, null)) : (actions);
    if (!children) {
        return null;
    }
    return (React.createElement("div", __assign({ className: classnames('show-page', classes.root, className) }, sanitizeRestProps(rest)),
        React.createElement(TitleForRecord, { title: title, record: record, defaultTitle: defaultTitle }),
        finalActions &&
            cloneElement(finalActions, __assign({ basePath: basePath, data: record, hasList: hasList,
                hasEdit: hasEdit,
                resource: resource }, finalActions.props)),
        React.createElement("div", { className: classnames(classes.main, (_a = {},
                _a[classes.noActions] = !finalActions,
                _a)) },
            React.createElement(Content, { className: classes.card }, record &&
                cloneElement(Children.only(children), {
                    resource: resource,
                    basePath: basePath,
                    record: record,
                    version: version,
                })),
            aside &&
                cloneElement(aside, {
                    resource: resource,
                    basePath: basePath,
                    record: record,
                    version: version,
                }))));
};
ShowView.propTypes = {
    actions: PropTypes.element,
    aside: PropTypes.element,
    basePath: PropTypes.string,
    children: PropTypes.element,
    classes: PropTypes.object,
    className: PropTypes.string,
    defaultTitle: PropTypes.any,
    hasEdit: PropTypes.bool,
    hasList: PropTypes.bool,
    loading: PropTypes.bool,
    loaded: PropTypes.bool,
    record: PropTypes.object,
    resource: PropTypes.string,
    title: PropTypes.any,
    version: PropTypes.node,
};
ShowView.defaultProps = {
    classes: {},
    component: Card,
};
var useStyles = makeStyles({
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
export default Show;
