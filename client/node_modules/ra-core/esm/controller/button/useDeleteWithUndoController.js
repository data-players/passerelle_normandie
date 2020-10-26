import { useCallback } from 'react';
import { useDelete } from '../../dataProvider';
import { CRUD_DELETE } from '../../actions';
import { useRefresh, useNotify, useRedirect, } from '../../sideEffect';
/**
 * Prepare callback for a Delete button with undo support
 *
 * @example
 *
 * import React from 'react';
 * import ActionDelete from '@material-ui/icons/Delete';
 * import { Button, useDeleteWithUndoController } from 'react-admin';
 *
 * const DeleteButton = ({
 *     resource,
 *     record,
 *     basePath,
 *     redirect,
 *     onClick,
 *     ...rest
 * }) => {
 *     const { loading, handleDelete } = useDeleteWithUndoController({
 *         resource,
 *         record,
 *         basePath,
 *         redirect,
 *         onClick,
 *     });
 *
 *     return (
 *         <Button
 *             onClick={handleDelete}
 *             disabled={loading}
 *             label="ra.action.delete"
 *             {...rest}
 *         >
 *             <ActionDelete />
 *         </Button>
 *     );
 * };
 */
var useDeleteWithUndoController = function (_a) {
    var resource = _a.resource, record = _a.record, basePath = _a.basePath, _b = _a.redirect, redirectTo = _b === void 0 ? 'list' : _b, onClick = _a.onClick, onSuccess = _a.onSuccess, onFailure = _a.onFailure;
    var notify = useNotify();
    var redirect = useRedirect();
    var refresh = useRefresh();
    var _c = useDelete(resource, null, null, {
        action: CRUD_DELETE,
        onSuccess: onSuccess !== undefined
            ? onSuccess
            : function () {
                notify('ra.notification.deleted', 'info', { smart_count: 1 }, true);
                redirect(redirectTo, basePath);
                refresh();
            },
        onFailure: onFailure !== undefined
            ? onFailure
            : function (error) {
                return notify(typeof error === 'string'
                    ? error
                    : error.message || 'ra.notification.http_error', 'warning');
            },
        undoable: true,
    }), deleteOne = _c[0], loading = _c[1].loading;
    var handleDelete = useCallback(function (event) {
        event.stopPropagation();
        deleteOne({
            payload: { id: record.id, previousData: record },
        });
        if (typeof onClick === 'function') {
            onClick(event);
        }
    }, [deleteOne, onClick, record]);
    return { loading: loading, handleDelete: handleDelete };
};
export default useDeleteWithUndoController;
