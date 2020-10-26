"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var react_1 = require("react");
var react_final_form_1 = require("react-final-form");
var merge_1 = __importDefault(require("lodash/merge"));
/**
 * Restore the record values which should override any default values specified on the form.
 */
var useInitializeFormWithRecord = function (record) {
    var form = react_final_form_1.useForm();
    react_1.useEffect(function () {
        if (!record) {
            return;
        }
        var initialValues = form.getState().initialValues;
        var initialValuesMergedWithRecord = merge_1.default({}, initialValues, record);
        form.initialize(initialValuesMergedWithRecord);
    }, [form, JSON.stringify(record)]); // eslint-disable-line react-hooks/exhaustive-deps
};
exports.default = useInitializeFormWithRecord;
