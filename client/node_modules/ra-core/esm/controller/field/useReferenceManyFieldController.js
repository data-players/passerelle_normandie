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
import get from 'lodash/get';
import { useCallback, useEffect, useRef } from 'react';
import isEqual from 'lodash/isEqual';
import { useSafeSetState, removeEmpty } from '../../util';
import { useGetManyReference } from '../../dataProvider';
import { useNotify } from '../../sideEffect';
import usePaginationState from '../usePaginationState';
import useSelectionState from '../useSelectionState';
import useSortState from '../useSortState';
var defaultFilter = {};
/**
 * Fetch reference records, and return them when avaliable
 *
 * The reference prop sould be the name of one of the <Resource> components
 * added as <Admin> child.
 *
 * @example
 *
 * const { loaded, referenceRecord, resourceLinkPath } = useReferenceManyFieldController({
 *     resource
 *     reference: 'users',
 *     record: {
 *         userId: 7
 *     }
 *     target: 'comments',
 *     source: 'userId',
 *     basePath: '/comments',
 *     page: 1,
 *     perPage: 25,
 * });
 *
 * @param {Object} option
 * @param {string} option.resource The current resource name
 * @param {string} option.reference The linked resource name
 * @param {Object} option.record The current resource record
 * @param {string} option.target The target resource key
 * @param {Object} option.filter The filter applied on the recorded records list
 * @param {string} option.source The key of the linked resource identifier
 * @param {string} option.basePath basepath to current resource
 * @param {number} option.page the page number
 * @param {number} option.perPage the number of item per page
 * @param {Object} option.sort the sort to apply to the referenced records
 *
 * @returns {ReferenceManyProps} The reference many props
 */
var useReferenceManyFieldController = function (_a) {
    var resource = _a.resource, reference = _a.reference, record = _a.record, target = _a.target, _b = _a.filter, filter = _b === void 0 ? defaultFilter : _b, source = _a.source, basePath = _a.basePath, initialPage = _a.page, initialPerPage = _a.perPage, _c = _a.sort, initialSort = _c === void 0 ? { field: 'id', order: 'DESC' } : _c;
    var notify = useNotify();
    // pagination logic
    var _d = usePaginationState({
        page: initialPage,
        perPage: initialPerPage,
    }), page = _d.page, setPage = _d.setPage, perPage = _d.perPage, setPerPage = _d.setPerPage;
    // sort logic
    var _e = useSortState(initialSort), sort = _e.sort, setSortObject = _e.setSort;
    var setSort = useCallback(function (field, order) {
        if (order === void 0) { order = 'ASC'; }
        setSortObject({ field: field, order: order });
        setPage(1);
    }, [setPage, setSortObject]);
    // selection logic
    var _f = useSelectionState(), selectedIds = _f.selectedIds, onSelect = _f.onSelect, onToggleItem = _f.onToggleItem, onUnselectItems = _f.onUnselectItems;
    // filter logic
    var filterRef = useRef(filter);
    var _g = useSafeSetState({}), displayedFilters = _g[0], setDisplayedFilters = _g[1];
    var _h = useSafeSetState(filter), filterValues = _h[0], setFilterValues = _h[1];
    var hideFilter = useCallback(function (filterName) {
        setDisplayedFilters(function (previousState) {
            var _a = previousState, _b = filterName, _ = _a[_b], newState = __rest(_a, [typeof _b === "symbol" ? _b : _b + ""]);
            return newState;
        });
        setFilterValues(function (previousState) {
            var _a = previousState, _b = filterName, _ = _a[_b], newState = __rest(_a, [typeof _b === "symbol" ? _b : _b + ""]);
            return newState;
        });
    }, [setDisplayedFilters, setFilterValues]);
    var showFilter = useCallback(function (filterName, defaultValue) {
        setDisplayedFilters(function (previousState) {
            var _a;
            return (__assign(__assign({}, previousState), (_a = {}, _a[filterName] = true, _a)));
        });
        setFilterValues(function (previousState) {
            var _a;
            return (__assign(__assign({}, previousState), (_a = {}, _a[filterName] = defaultValue, _a)));
        });
    }, [setDisplayedFilters, setFilterValues]);
    var setFilters = useCallback(function (filters, displayedFilters) {
        setFilterValues(removeEmpty(filters));
        setDisplayedFilters(displayedFilters);
        setPage(1);
    }, [setDisplayedFilters, setFilterValues, setPage]);
    // handle filter prop change
    useEffect(function () {
        if (!isEqual(filter, filterRef.current)) {
            filterRef.current = filter;
            setFilterValues(filter);
        }
    });
    var referenceId = get(record, source);
    var _j = useGetManyReference(reference, target, referenceId, { page: page, perPage: perPage }, sort, filterValues, resource, {
        onFailure: function (error) {
            return notify(typeof error === 'string'
                ? error
                : error.message || 'ra.notification.http_error', 'warning');
        },
    }), data = _j.data, ids = _j.ids, total = _j.total, error = _j.error, loading = _j.loading, loaded = _j.loaded;
    return {
        basePath: basePath.replace(resource, reference),
        currentSort: sort,
        data: data,
        defaultTitle: null,
        displayedFilters: displayedFilters,
        error: error,
        filterValues: filterValues,
        hasCreate: false,
        hideFilter: hideFilter,
        ids: ids,
        loaded: loaded,
        loading: loading,
        onSelect: onSelect,
        onToggleItem: onToggleItem,
        onUnselectItems: onUnselectItems,
        page: page,
        perPage: perPage,
        resource: reference,
        selectedIds: selectedIds,
        setFilters: setFilters,
        setPage: setPage,
        setPerPage: setPerPage,
        setSort: setSort,
        showFilter: showFilter,
        total: total,
    };
};
export default useReferenceManyFieldController;
