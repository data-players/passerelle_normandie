declare const useDeclarativeSideEffects: () => (resource: any, { onSuccess, onFailure }?: any) => {
    onSuccess: any;
    onFailure: any;
};
export default useDeclarativeSideEffects;
