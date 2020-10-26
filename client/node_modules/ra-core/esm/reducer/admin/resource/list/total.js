import { CRUD_GET_LIST_SUCCESS, } from '../../../../actions/dataActions';
import { DELETE, DELETE_MANY } from '../../../../core';
var totalReducer = function (previousState, action) {
    if (previousState === void 0) { previousState = 0; }
    if (action.type === CRUD_GET_LIST_SUCCESS) {
        return action.payload.total;
    }
    if (action.meta && action.meta.optimistic) {
        if (action.meta.fetch === DELETE) {
            return previousState - 1;
        }
        if (action.meta.fetch === DELETE_MANY) {
            return previousState - action.payload.ids.length;
        }
    }
    return previousState;
};
export default totalReducer;
