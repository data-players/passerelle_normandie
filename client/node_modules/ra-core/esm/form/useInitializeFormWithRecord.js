import { useEffect } from 'react';
import { useForm } from 'react-final-form';
import merge from 'lodash/merge';
/**
 * Restore the record values which should override any default values specified on the form.
 */
var useInitializeFormWithRecord = function (record) {
    var form = useForm();
    useEffect(function () {
        if (!record) {
            return;
        }
        var initialValues = form.getState().initialValues;
        var initialValuesMergedWithRecord = merge({}, initialValues, record);
        form.initialize(initialValuesMergedWithRecord);
    }, [form, JSON.stringify(record)]); // eslint-disable-line react-hooks/exhaustive-deps
};
export default useInitializeFormWithRecord;
