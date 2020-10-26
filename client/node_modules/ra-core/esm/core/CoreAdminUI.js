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
import * as React from 'react';
import { createElement } from 'react';
import { Switch, Route } from 'react-router-dom';
import CoreAdminRouter from './CoreAdminRouter';
var DefaultLayout = function (_a) {
    var children = _a.children;
    return (React.createElement(React.Fragment, null, children));
};
var CoreAdminUI = function (_a) {
    var _b = _a.catchAll, catchAll = _b === void 0 ? Noop : _b, children = _a.children, _c = _a.customRoutes, customRoutes = _c === void 0 ? [] : _c, dashboard = _a.dashboard, _d = _a.layout, layout = _d === void 0 ? DefaultLayout : _d, _e = _a.loading, loading = _e === void 0 ? Noop : _e, _f = _a.loginPage, loginPage = _f === void 0 ? false : _f, logout = _a.logout, menu = _a.menu, // deprecated, use a custom layout instead
    theme = _a.theme, _g = _a.title, title = _g === void 0 ? 'React Admin' : _g;
    return (React.createElement(Switch, null,
        loginPage !== false && loginPage !== true ? (React.createElement(Route, { exact: true, path: "/login", render: function (props) {
                return createElement(loginPage, __assign(__assign({}, props), { title: title,
                    theme: theme }));
            } })) : null,
        React.createElement(Route, { path: "/", render: function (props) { return (React.createElement(CoreAdminRouter, __assign({ catchAll: catchAll, customRoutes: customRoutes, dashboard: dashboard, layout: layout, loading: loading, logout: logout && createElement(logout), menu: menu, theme: theme, title: title }, props), children)); } })));
};
var Noop = function () { return null; };
export default CoreAdminUI;
