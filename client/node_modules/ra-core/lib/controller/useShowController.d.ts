import { Record, Identifier } from '../types';
export interface ShowProps {
    basePath?: string;
    hasCreate?: boolean;
    hasedit?: boolean;
    hasShow?: boolean;
    hasList?: boolean;
    id?: Identifier;
    resource?: string;
    [key: string]: any;
}
export interface ShowControllerProps<RecordType extends Record = Record> {
    loading: boolean;
    loaded: boolean;
    defaultTitle: string;
    resource: string;
    basePath?: string;
    record?: RecordType;
    version: number;
}
/**
 * Prepare data for the Show view
 *
 * @param {Object} props The props passed to the Show component.
 *
 * @return {Object} controllerProps Fetched data and callbacks for the Show view
 *
 * @example
 *
 * import { useShowController } from 'react-admin';
 * import ShowView from './ShowView';
 *
 * const MyShow = props => {
 *     const controllerProps = useShowController(props);
 *     return <ShowView {...controllerProps} {...props} />;
 * }
 */
declare const useShowController: <RecordType extends Record = Record>(props: ShowProps) => ShowControllerProps<RecordType>;
export default useShowController;
