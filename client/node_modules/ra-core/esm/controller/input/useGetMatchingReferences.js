import { useCallback } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { crudGetMatchingAccumulate } from '../../actions/accumulateActions';
import { getPossibleReferences, getPossibleReferenceValues, getReferenceResource, } from '../../reducer';
import { useDeepCompareEffect } from '../../util/hooks';
var defaultReferenceSource = function (resource, source) {
    return resource + "@" + source;
};
export default (function (_a) {
    var reference = _a.reference, _b = _a.referenceSource, referenceSource = _b === void 0 ? defaultReferenceSource : _b, resource = _a.resource, source = _a.source, filter = _a.filter, pagination = _a.pagination, sort = _a.sort, id = _a.id;
    var dispatch = useDispatch();
    useDeepCompareEffect(function () {
        dispatch(crudGetMatchingAccumulate(reference, referenceSource(resource, source), pagination, sort, filter));
    }, [
        dispatch,
        filter,
        reference,
        referenceSource,
        resource,
        source,
        pagination,
        sort,
    ]);
    var matchingReferences = useGetMatchingReferenceSelector({
        referenceSource: referenceSource,
        reference: reference,
        resource: resource,
        source: source,
        id: id,
    });
    if (!matchingReferences) {
        return {
            loading: true,
            error: null,
            matchingReferences: null,
        };
    }
    if (matchingReferences.error) {
        return {
            loading: false,
            matchingReferences: null,
            error: matchingReferences.error,
        };
    }
    return {
        loading: false,
        error: null,
        matchingReferences: matchingReferences,
    };
});
var useGetMatchingReferenceSelector = function (_a) {
    var referenceSource = _a.referenceSource, reference = _a.reference, resource = _a.resource, source = _a.source, id = _a.id;
    var getMatchingReferences = useCallback(function (state) {
        var referenceResource = getReferenceResource(state, {
            reference: reference,
        });
        if (
        // resources are registered
        Object.keys(state.admin.resources).length > 0 &&
            // no registered resource matching the reference
            !referenceResource) {
            throw new Error("Cannot fetch a reference to \"" + reference + "\" (unknown resource).\nYou must add <Resource name=\"" + reference + "\" /> as child of <Admin> to use \"" + reference + "\" in a reference");
        }
        var possibleValues = getPossibleReferenceValues(state, {
            referenceSource: referenceSource,
            resource: resource,
            source: source,
        });
        return getPossibleReferences(referenceResource, possibleValues, [
            id,
        ]);
    }, [referenceSource, reference, resource, source, id]);
    return useSelector(getMatchingReferences);
};
