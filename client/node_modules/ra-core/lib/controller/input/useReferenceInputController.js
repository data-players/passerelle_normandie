"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var referenceDataStatus_1 = require("./referenceDataStatus");
var useTranslate_1 = __importDefault(require("../../i18n/useTranslate"));
var useReference_1 = __importDefault(require("../useReference"));
var useGetMatchingReferences_1 = __importDefault(require("./useGetMatchingReferences"));
var usePaginationState_1 = __importDefault(require("../usePaginationState"));
var __1 = require("..");
var useFilterState_1 = __importDefault(require("../useFilterState"));
var defaultReferenceSource = function (resource, source) {
    return resource + "@" + source;
};
var defaultFilter = {};
/**
 * A hook for choosing a reference record. Useful for foreign keys.
 *
 * This hook fetches the possible values in the reference resource
 * (using `dataProvider.getMatching()`), it returns the possible choices
 * as the `choices` attribute.
 *
 * @example
 * const {
 *      choices, // the available reference resource
 * } = useReferenceInputController({
 *      input, // the input props
 *      resource: 'comments',
 *      reference: 'posts',
 *      source: 'post_id',
 * });
 *
 * The hook also allow to filter results. It returns a `setFilter`
 * function. It uses the value to create a filter
 * for the query - by default { q: [searchText] }. You can customize the mapping
 * searchText => searchQuery by setting a custom `filterToQuery` function option
 * You can also add a permanentFilter to further filter the result:
 *
 * @example
 * const {
 *      choices, // the available reference resource
 *      setFilter,
 * } = useReferenceInputController({
 *      input, // the input props
 *      resource: 'comments',
 *      reference: 'posts',
 *      source: 'post_id',
 *      permanentFilter: {
 *          author: 'john'
 *      },
 *      filterToQuery: searchText => ({ title: searchText })
 * });
 */
var useReferenceInputController = function (_a) {
    var input = _a.input, _b = _a.perPage, perPage = _b === void 0 ? 25 : _b, _c = _a.filter, filter = _c === void 0 ? defaultFilter : _c, reference = _a.reference, filterToQuery = _a.filterToQuery, _d = _a.referenceSource, referenceSource = _d === void 0 ? defaultReferenceSource : _d, resource = _a.resource, sortOverride = _a.sort, source = _a.source;
    var translate = useTranslate_1.default();
    var _e = usePaginationState_1.default({ perPage: perPage }), pagination = _e.pagination, setPagination = _e.setPagination;
    var _f = __1.useSortState(sortOverride), sort = _f.sort, setSort = _f.setSort;
    var _g = useFilterState_1.default({
        permanentFilter: filter,
        filterToQuery: filterToQuery,
    }), filterValue = _g.filter, setFilter = _g.setFilter;
    var matchingReferences = useGetMatchingReferences_1.default({
        reference: reference,
        referenceSource: referenceSource,
        filter: filterValue,
        pagination: pagination,
        sort: sort,
        resource: resource,
        source: source,
        id: input.value,
    }).matchingReferences;
    var referenceRecord = useReference_1.default({
        id: input.value,
        reference: reference,
    }).referenceRecord;
    var dataStatus = referenceDataStatus_1.getStatusForInput({
        input: input,
        matchingReferences: matchingReferences,
        referenceRecord: referenceRecord,
        translate: translate,
    });
    return {
        choices: dataStatus.choices,
        error: dataStatus.error,
        loading: dataStatus.waiting,
        filter: filterValue,
        setFilter: setFilter,
        pagination: pagination,
        setPagination: setPagination,
        sort: sort,
        setSort: setSort,
        warning: dataStatus.warning,
    };
};
exports.default = useReferenceInputController;
