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
exports.ListView = void 0;
var React = __importStar(require("react"));
var react_1 = require("react");
var prop_types_1 = __importDefault(require("prop-types"));
var Card_1 = __importDefault(require("@material-ui/core/Card"));
var classnames_1 = __importDefault(require("classnames"));
var styles_1 = require("@material-ui/core/styles");
var ra_core_1 = require("ra-core");
var Title_1 = __importStar(require("../layout/Title"));
var ListToolbar_1 = __importDefault(require("./ListToolbar"));
var Pagination_1 = __importDefault(require("./pagination/Pagination"));
var BulkDeleteButton_1 = __importDefault(require("../button/BulkDeleteButton"));
var BulkActionsToolbar_1 = __importDefault(require("./BulkActionsToolbar"));
var ListActions_1 = __importDefault(require("./ListActions"));
var Empty_1 = __importDefault(require("./Empty"));
exports.ListView = function (props) {
    var actions = props.actions, aside = props.aside, filters = props.filters, bulkActionButtons = props.bulkActionButtons, pagination = props.pagination, children = props.children, className = props.className, classesOverride = props.classes, Content = props.component, _a = props.exporter, exporter = _a === void 0 ? ra_core_1.defaultExporter : _a, title = props.title, empty = props.empty, rest = __rest(props, ["actions", "aside", "filters", "bulkActionButtons", "pagination", "children", "className", "classes", "component", "exporter", "title", "empty"]);
    var controllerProps = ra_core_1.getListControllerProps(props); // deprecated, to be removed in v4
    var listContext = ra_core_1.useListContext(props);
    var classes = useStyles(props);
    var defaultTitle = listContext.defaultTitle, total = listContext.total, loaded = listContext.loaded, loading = listContext.loading, hasCreate = listContext.hasCreate, filterValues = listContext.filterValues, selectedIds = listContext.selectedIds;
    var version = ra_core_1.useVersion();
    var renderList = function () {
        var _a;
        return (React.createElement(React.Fragment, null,
            (filters || actions) && (React.createElement(ListToolbar_1.default, __assign({ filters: filters }, controllerProps, { actions: actions, exporter: exporter }))),
            React.createElement("div", { className: classes.main },
                React.createElement(Content, { className: classnames_1.default(classes.content, (_a = {},
                        _a[classes.bulkActionsDisplayed] = selectedIds.length > 0,
                        _a)), key: version },
                    bulkActionButtons !== false && bulkActionButtons && (React.createElement(BulkActionsToolbar_1.default, __assign({}, controllerProps), bulkActionButtons)),
                    children &&
                        // @ts-ignore-line
                        react_1.cloneElement(react_1.Children.only(children), __assign(__assign({}, controllerProps), { hasBulkActions: bulkActionButtons !== false })),
                    pagination && react_1.cloneElement(pagination, listContext)),
                aside && react_1.cloneElement(aside, listContext))));
    };
    var shouldRenderEmptyPage = hasCreate &&
        loaded &&
        !loading &&
        !total &&
        !Object.keys(filterValues).length;
    return (React.createElement("div", __assign({ className: classnames_1.default('list-page', classes.root, className) }, sanitizeRestProps(rest)),
        React.createElement(Title_1.default, { title: title, defaultTitle: defaultTitle }),
        shouldRenderEmptyPage && empty !== false
            ? react_1.cloneElement(empty, listContext)
            : renderList()));
};
exports.ListView.propTypes = {
    // @ts-ignore-line
    actions: prop_types_1.default.oneOfType([prop_types_1.default.bool, prop_types_1.default.element]),
    aside: prop_types_1.default.element,
    basePath: prop_types_1.default.string,
    // @ts-ignore-line
    bulkActionButtons: prop_types_1.default.oneOfType([prop_types_1.default.bool, prop_types_1.default.element]),
    children: prop_types_1.default.element,
    className: prop_types_1.default.string,
    classes: prop_types_1.default.object,
    component: ra_core_1.ComponentPropType,
    // @ts-ignore-line
    currentSort: prop_types_1.default.shape({
        field: prop_types_1.default.string.isRequired,
        order: prop_types_1.default.string.isRequired,
    }),
    data: prop_types_1.default.any,
    defaultTitle: prop_types_1.default.string,
    displayedFilters: prop_types_1.default.object,
    // @ts-ignore-line
    exporter: prop_types_1.default.oneOfType([prop_types_1.default.func, prop_types_1.default.bool]),
    filterDefaultValues: prop_types_1.default.object,
    filters: prop_types_1.default.element,
    filterValues: prop_types_1.default.object,
    hasCreate: prop_types_1.default.bool,
    hideFilter: prop_types_1.default.func,
    ids: prop_types_1.default.array,
    loading: prop_types_1.default.bool,
    onSelect: prop_types_1.default.func,
    onToggleItem: prop_types_1.default.func,
    onUnselectItems: prop_types_1.default.func,
    page: prop_types_1.default.number,
    // @ts-ignore-line
    pagination: prop_types_1.default.oneOfType([prop_types_1.default.element, prop_types_1.default.bool]),
    perPage: prop_types_1.default.number,
    refresh: prop_types_1.default.func,
    resource: prop_types_1.default.string,
    selectedIds: prop_types_1.default.array,
    setFilters: prop_types_1.default.func,
    setPage: prop_types_1.default.func,
    setPerPage: prop_types_1.default.func,
    setSort: prop_types_1.default.func,
    showFilter: prop_types_1.default.func,
    title: Title_1.TitlePropType,
    total: prop_types_1.default.number,
    version: prop_types_1.default.number,
};
var DefaultBulkActionButtons = function (props) { return React.createElement(BulkDeleteButton_1.default, __assign({}, props)); };
exports.ListView.defaultProps = {
    actions: React.createElement(ListActions_1.default, null),
    classes: {},
    component: Card_1.default,
    bulkActionButtons: React.createElement(DefaultBulkActionButtons, null),
    pagination: React.createElement(Pagination_1.default, null),
    empty: React.createElement(Empty_1.default, null),
};
var useStyles = styles_1.makeStyles(function (theme) {
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
exports.default = exports.ListView;
