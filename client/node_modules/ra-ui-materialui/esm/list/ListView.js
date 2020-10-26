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
import { Children, cloneElement } from 'react';
import PropTypes from 'prop-types';
import Card from '@material-ui/core/Card';
import classnames from 'classnames';
import { makeStyles } from '@material-ui/core/styles';
import { ComponentPropType, defaultExporter, useListContext, getListControllerProps, useVersion, } from 'ra-core';
import Title, { TitlePropType } from '../layout/Title';
import ListToolbar from './ListToolbar';
import DefaultPagination from './pagination/Pagination';
import BulkDeleteButton from '../button/BulkDeleteButton';
import BulkActionsToolbar from './BulkActionsToolbar';
import DefaultActions from './ListActions';
import Empty from './Empty';
export var ListView = function (props) {
    var actions = props.actions, aside = props.aside, filters = props.filters, bulkActionButtons = props.bulkActionButtons, pagination = props.pagination, children = props.children, className = props.className, classesOverride = props.classes, Content = props.component, _a = props.exporter, exporter = _a === void 0 ? defaultExporter : _a, title = props.title, empty = props.empty, rest = __rest(props, ["actions", "aside", "filters", "bulkActionButtons", "pagination", "children", "className", "classes", "component", "exporter", "title", "empty"]);
    var controllerProps = getListControllerProps(props); // deprecated, to be removed in v4
    var listContext = useListContext(props);
    var classes = useStyles(props);
    var defaultTitle = listContext.defaultTitle, total = listContext.total, loaded = listContext.loaded, loading = listContext.loading, hasCreate = listContext.hasCreate, filterValues = listContext.filterValues, selectedIds = listContext.selectedIds;
    var version = useVersion();
    var renderList = function () {
        var _a;
        return (React.createElement(React.Fragment, null,
            (filters || actions) && (React.createElement(ListToolbar, __assign({ filters: filters }, controllerProps, { actions: actions, exporter: exporter }))),
            React.createElement("div", { className: classes.main },
                React.createElement(Content, { className: classnames(classes.content, (_a = {},
                        _a[classes.bulkActionsDisplayed] = selectedIds.length > 0,
                        _a)), key: version },
                    bulkActionButtons !== false && bulkActionButtons && (React.createElement(BulkActionsToolbar, __assign({}, controllerProps), bulkActionButtons)),
                    children &&
                        // @ts-ignore-line
                        cloneElement(Children.only(children), __assign(__assign({}, controllerProps), { hasBulkActions: bulkActionButtons !== false })),
                    pagination && cloneElement(pagination, listContext)),
                aside && cloneElement(aside, listContext))));
    };
    var shouldRenderEmptyPage = hasCreate &&
        loaded &&
        !loading &&
        !total &&
        !Object.keys(filterValues).length;
    return (React.createElement("div", __assign({ className: classnames('list-page', classes.root, className) }, sanitizeRestProps(rest)),
        React.createElement(Title, { title: title, defaultTitle: defaultTitle }),
        shouldRenderEmptyPage && empty !== false
            ? cloneElement(empty, listContext)
            : renderList()));
};
ListView.propTypes = {
    // @ts-ignore-line
    actions: PropTypes.oneOfType([PropTypes.bool, PropTypes.element]),
    aside: PropTypes.element,
    basePath: PropTypes.string,
    // @ts-ignore-line
    bulkActionButtons: PropTypes.oneOfType([PropTypes.bool, PropTypes.element]),
    children: PropTypes.element,
    className: PropTypes.string,
    classes: PropTypes.object,
    component: ComponentPropType,
    // @ts-ignore-line
    currentSort: PropTypes.shape({
        field: PropTypes.string.isRequired,
        order: PropTypes.string.isRequired,
    }),
    data: PropTypes.any,
    defaultTitle: PropTypes.string,
    displayedFilters: PropTypes.object,
    // @ts-ignore-line
    exporter: PropTypes.oneOfType([PropTypes.func, PropTypes.bool]),
    filterDefaultValues: PropTypes.object,
    filters: PropTypes.element,
    filterValues: PropTypes.object,
    hasCreate: PropTypes.bool,
    hideFilter: PropTypes.func,
    ids: PropTypes.array,
    loading: PropTypes.bool,
    onSelect: PropTypes.func,
    onToggleItem: PropTypes.func,
    onUnselectItems: PropTypes.func,
    page: PropTypes.number,
    // @ts-ignore-line
    pagination: PropTypes.oneOfType([PropTypes.element, PropTypes.bool]),
    perPage: PropTypes.number,
    refresh: PropTypes.func,
    resource: PropTypes.string,
    selectedIds: PropTypes.array,
    setFilters: PropTypes.func,
    setPage: PropTypes.func,
    setPerPage: PropTypes.func,
    setSort: PropTypes.func,
    showFilter: PropTypes.func,
    title: TitlePropType,
    total: PropTypes.number,
    version: PropTypes.number,
};
var DefaultBulkActionButtons = function (props) { return React.createElement(BulkDeleteButton, __assign({}, props)); };
ListView.defaultProps = {
    actions: React.createElement(DefaultActions, null),
    classes: {},
    component: Card,
    bulkActionButtons: React.createElement(DefaultBulkActionButtons, null),
    pagination: React.createElement(DefaultPagination, null),
    empty: React.createElement(Empty, null),
};
var useStyles = makeStyles(function (theme) {
    var _a;
    return ({
        root: {},
        main: {
            display: 'flex',
        },
        content: (_a = {
                marginTop: 0,
                transition: theme.transitions.create('margin-top'),
                position: 'relative',
                flex: '1 1 auto'
            },
            _a[theme.breakpoints.down('xs')] = {
                boxShadow: 'none',
            },
            _a.overflow = 'inherit',
            _a),
        bulkActionsDisplayed: {
            marginTop: -theme.spacing(8),
            transition: theme.transitions.create('margin-top'),
        },
        actions: {
            zIndex: 2,
            display: 'flex',
            justifyContent: 'flex-end',
            flexWrap: 'wrap',
        },
        noResults: { padding: 20 },
    });
}, { name: 'RaList' });
var sanitizeRestProps = function (_a) {
    var basePath = _a.basePath, currentSort = _a.currentSort, data = _a.data, defaultTitle = _a.defaultTitle, displayedFilters = _a.displayedFilters, filterDefaultValues = _a.filterDefaultValues, filterValues = _a.filterValues, hasCreate = _a.hasCreate, hasEdit = _a.hasEdit, hasList = _a.hasList, hasShow = _a.hasShow, hideFilter = _a.hideFilter, history = _a.history, ids = _a.ids, loading = _a.loading, loaded = _a.loaded, location = _a.location, match = _a.match, onSelect = _a.onSelect, onToggleItem = _a.onToggleItem, onUnselectItems = _a.onUnselectItems, options = _a.options, page = _a.page, permissions = _a.permissions, perPage = _a.perPage, resource = _a.resource, selectedIds = _a.selectedIds, setFilters = _a.setFilters, setPage = _a.setPage, setPerPage = _a.setPerPage, setSort = _a.setSort, showFilter = _a.showFilter, sort = _a.sort, total = _a.total, rest = __rest(_a, ["basePath", "currentSort", "data", "defaultTitle", "displayedFilters", "filterDefaultValues", "filterValues", "hasCreate", "hasEdit", "hasList", "hasShow", "hideFilter", "history", "ids", "loading", "loaded", "location", "match", "onSelect", "onToggleItem", "onUnselectItems", "options", "page", "permissions", "perPage", "resource", "selectedIds", "setFilters", "setPage", "setPerPage", "setSort", "showFilter", "sort", "total"]);
    return rest;
};
export default ListView;
