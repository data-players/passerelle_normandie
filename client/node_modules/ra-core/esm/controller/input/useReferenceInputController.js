import { getStatusForInput as getDataStatus } from './referenceDataStatus';
import useTranslate from '../../i18n/useTranslate';
import useReference from '../useReference';
import useGetMatchingReferences from './useGetMatchingReferences';
import usePaginationState from '../usePaginationState';
import { useSortState } from '..';
import useFilterState from '../useFilterState';
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
    var translate = useTranslate();
    var _e = usePaginationState({ perPage: perPage }), pagination = _e.pagination, setPagination = _e.setPagination;
    var _f = useSortState(sortOverride), sort = _f.sort, setSort = _f.setSort;
    var _g = useFilterState({
        permanentFilter: filter,
        filterToQuery: filterToQuery,
    }), filterValue = _g.filter, setFilter = _g.setFilter;
    var matchingReferences = useGetMatchingReferences({
        reference: reference,
        referenceSource: referenceSource,
        filter: filterValue,
        pagination: pagination,
        sort: sort,
        resource: resource,
        source: source,
        id: input.value,
    }).matchingReferences;
    var referenceRecord = useReference({
        id: input.value,
        reference: reference,
    }).referenceRecord;
    var dataStatus = getDataStatus({
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
export default useReferenceInputController;
