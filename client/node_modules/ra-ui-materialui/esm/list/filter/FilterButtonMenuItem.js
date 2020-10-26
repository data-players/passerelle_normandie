import * as React from 'react';
import { forwardRef, useCallback } from 'react';
import PropTypes from 'prop-types';
import MenuItem from '@material-ui/core/MenuItem';
import { FieldTitle } from 'ra-core';
var FilterButtonMenuItem = forwardRef(function (_a, ref) {
    var filter = _a.filter, onShow = _a.onShow, resource = _a.resource;
    var handleShow = useCallback(function () {
        onShow({
            source: filter.props.source,
            defaultValue: filter.props.defaultValue,
        });
    }, [filter.props.defaultValue, filter.props.source, onShow]);
    return (React.createElement(MenuItem, { className: "new-filter-item", "data-key": filter.props.source, "data-default-value": filter.props.defaultValue, key: filter.props.source, onClick: handleShow, ref: ref },
        React.createElement(FieldTitle, { label: filter.props.label, source: filter.props.source, resource: resource })));
});
FilterButtonMenuItem.propTypes = {
    filter: PropTypes.element.isRequired,
    onShow: PropTypes.func.isRequired,
    resource: PropTypes.string.isRequired,
};
export default FilterButtonMenuItem;
