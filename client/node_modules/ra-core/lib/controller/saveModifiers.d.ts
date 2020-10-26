/// <reference types="react" />
export declare const SideEffectContext: import("react").Context<SideEffectContextType>;
/**
 * Get modifiers for a save() function, and the way to update them.
 *
 * Used in useCreateController and useEditController.
 *
 * @example
 *
 * const {
 *     onSuccessRef,
 *     setOnSuccess,
 *     onFailureRef,
 *     setOnFailure,
 *     transformRef,
 *     setTransform,
 * } = useSaveModifiers({ onSuccess, onFailure, transform });
 */
export declare const useSaveModifiers: ({ onSuccess, onFailure, transform, }: SaveModifiers) => {
    onSuccessRef: import("react").MutableRefObject<OnSuccess>;
    setOnSuccess: SetOnSuccess;
    onFailureRef: import("react").MutableRefObject<OnFailure>;
    setOnFailure: SetOnFailure;
    transformRef: import("react").MutableRefObject<TransformData>;
    setTransform: SetTransformData;
};
export declare type OnSuccess = (response: any) => void;
export declare type SetOnSuccess = (onSuccess: OnSuccess) => void;
export declare type OnFailure = (error: {
    message?: string;
}) => void;
export declare type SetOnFailure = (onFailure: OnFailure) => void;
export declare type TransformData = (data: any) => any | Promise<any>;
export declare type SetTransformData = (transform: TransformData) => void;
export interface SideEffectContextType {
    setOnSuccess?: SetOnSuccess;
    setOnFailure?: SetOnFailure;
    setTransform?: SetTransformData;
}
export interface SaveModifiers {
    onSuccess?: OnSuccess;
    onFailure?: OnFailure;
    transform?: TransformData;
}
