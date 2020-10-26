/// <reference types="react" />
import PropTypes from 'prop-types';
import Card from '@material-ui/core/Card';
import { EditControllerProps } from 'ra-core';
import { EditProps } from '../types';
/**
 * Page component for the Edit view
 *
 * The `<Edit>` component renders the page title and actions,
 * fetches the record from the data provider.
 * It is not responsible for rendering the actual form -
 * that's the job of its child component (usually `<SimpleForm>`),
 * to which it passes pass the `record` as prop.
 *
 * The <Edit> component accepts the following props:
 *
 * - actions
 * - aside
 * - component
 * - successMessage
 * - title
 * - undoable
 *
 * @example
 *
 * // in src/posts.js
 * import * as React from "react";
 * import { Edit, SimpleForm, TextInput } from 'react-admin';
 *
 * export const PostEdit = (props) => (
 *     <Edit {...props}>
 *         <SimpleForm>
 *             <TextInput source="title" />
 *         </SimpleForm>
 *     </Edit>
 * );
 *
 * // in src/App.js
 * import * as React from "react";
 * import { Admin, Resource } from 'react-admin';
 *
 * import { PostEdit } from './posts';
 *
 * const App = () => (
 *     <Admin dataProvider={...}>
 *         <Resource name="posts" edit={PostEdit} />
 *     </Admin>
 * );
 * export default App;
 */
declare const Edit: {
    (props: EditProps): JSX.Element;
    propTypes: {
        actions: PropTypes.Requireable<PropTypes.ReactElementLike>;
        aside: PropTypes.Requireable<PropTypes.ReactElementLike>;
        children: PropTypes.Requireable<PropTypes.ReactNodeLike>;
        classes: PropTypes.Requireable<object>;
        className: PropTypes.Requireable<string>;
        hasCreate: PropTypes.Requireable<boolean>;
        hasEdit: PropTypes.Requireable<boolean>;
        hasShow: PropTypes.Requireable<boolean>;
        hasList: PropTypes.Requireable<boolean>;
        id: PropTypes.Validator<any>;
        resource: PropTypes.Validator<string>;
        title: PropTypes.Requireable<PropTypes.ReactNodeLike>;
        successMessage: PropTypes.Requireable<string>;
        onSuccess: PropTypes.Requireable<(...args: any[]) => any>;
        onFailure: PropTypes.Requireable<(...args: any[]) => any>;
        transform: PropTypes.Requireable<(...args: any[]) => any>;
        undoable: PropTypes.Requireable<boolean>;
    };
};
interface EditViewProps extends EditProps, Omit<EditControllerProps, 'resource'> {
}
export declare const EditView: {
    (props: EditViewProps): JSX.Element;
    propTypes: {
        actions: PropTypes.Requireable<PropTypes.ReactElementLike>;
        aside: PropTypes.Requireable<PropTypes.ReactElementLike>;
        basePath: PropTypes.Requireable<string>;
        children: PropTypes.Requireable<PropTypes.ReactElementLike>;
        classes: PropTypes.Requireable<object>;
        className: PropTypes.Requireable<string>;
        component: (props: any, propName: any, componentName: any) => Error;
        defaultTitle: PropTypes.Requireable<any>;
        hasList: PropTypes.Requireable<boolean>;
        hasShow: PropTypes.Requireable<boolean>;
        record: PropTypes.Requireable<object>;
        redirect: PropTypes.Requireable<string | boolean>;
        resource: PropTypes.Requireable<string>;
        save: PropTypes.Requireable<(...args: any[]) => any>;
        title: PropTypes.Requireable<PropTypes.ReactNodeLike>;
        version: PropTypes.Requireable<number>;
        onSuccess: PropTypes.Requireable<(...args: any[]) => any>;
        onFailure: PropTypes.Requireable<(...args: any[]) => any>;
        setOnSuccess: PropTypes.Requireable<(...args: any[]) => any>;
        setOnFailure: PropTypes.Requireable<(...args: any[]) => any>;
        setTransform: PropTypes.Requireable<(...args: any[]) => any>;
    };
    defaultProps: {
        classes: {};
        component: typeof Card;
    };
};
export default Edit;
