"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var dataActions_1 = require("../../../../actions/dataActions");
var core_1 = require("../../../../core");
var totalReducer = function (previousState, action) {
    if (previousState === void 0) { previousState = 0; }
    if (action.type === dataActions_1.CRUD_GET_LIST_SUCCESS) {
        return action.payload.total;
    }
    if (action.meta && action.meta.optimistic) {
        if (action.meta.fetch === core_1.DELETE) {
            return previousState - 1;
        }
        if (action.meta.fetch === core_1.DELETE_MANY) {
            return previousState - action.payload.ids.length;
        }
    }
    return previousState;
};
exports.default = totalReducer;
