import { ReactEventHandler, SyntheticEvent } from 'react';
import { RedirectionSideEffect } from '../../sideEffect';
import { Record } from '../../types';
import { OnFailure, OnSuccess } from '../saveModifiers';
/**
 * Prepare a set of callbacks for a delete button guarded by confirmation dialog
 *
 * @example
 *
 * const DeleteButton = ({
 *     resource,
 *     record,
 *     basePath,
 *     redirect,
 *     onClick,
 *     ...rest
 * }) => {
 *     const {
 *         open,
 *         loading,
 *         handleDialogOpen,
 *         handleDialogClose,
 *         handleDelete,
 *     } = useDeleteWithConfirmController({
 *         resource,
 *         record,
 *         redirect,
 *         basePath,
 *         onClick,
 *     });
 *
 *     return (
 *         <Fragment>
 *             <Button
 *                 onClick={handleDialogOpen}
 *                 label="ra.action.delete"
 *                 {...rest}
 *             >
 *                 {icon}
 *             </Button>
 *             <Confirm
 *                 isOpen={open}
 *                 loading={loading}
 *                 title="ra.message.delete_title"
 *                 content="ra.message.delete_content"
 *                 translateOptions={{
 *                     name: resource,
 *                     id: record.id,
 *                 }}
 *                 onConfirm={handleDelete}
 *                 onClose={handleDialogClose}
 *             />
 *         </Fragment>
 *     );
 * };
 */
declare const useDeleteWithConfirmController: ({ resource, record, redirect: redirectTo, basePath, onClick, onSuccess, onFailure, }: UseDeleteWithConfirmControllerParams) => UseDeleteWithConfirmControllerReturn;
export interface UseDeleteWithConfirmControllerParams {
    basePath?: string;
    record?: Record;
    redirect?: RedirectionSideEffect;
    resource: string;
    onClick?: ReactEventHandler<any>;
    onSuccess?: OnSuccess;
    onFailure?: OnFailure;
}
export interface UseDeleteWithConfirmControllerReturn {
    open: boolean;
    loading: boolean;
    handleDialogOpen: (e: SyntheticEvent) => void;
    handleDialogClose: (e: SyntheticEvent) => void;
    handleDelete: ReactEventHandler<any>;
}
export default useDeleteWithConfirmController;
