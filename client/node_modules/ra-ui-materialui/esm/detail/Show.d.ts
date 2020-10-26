/// <reference types="react" />
import PropTypes from 'prop-types';
import Card from '@material-ui/core/Card';
import { ShowControllerProps } from 'ra-core';
import { ShowProps } from '../types';
/**
 * Page component for the Show view
 *
 * The `<Show>` component renders the page title and actions,
 * fetches the record from the data provider.
 * It is not responsible for rendering the actual form -
 * that's the job of its child component (usually `<SimpleShowLayout>`),
 * to which it passes pass the `record` as prop.
 *
 * The <Show> component accepts the following props:
 *
 * - actions
 * - aside
 * - component
 * - title
 *
 * @example
 *
 * // in src/posts.js
 * import * as React from "react";
 * import { Show, SimpleShowLayout, TextField } from 'react-admin';
 *
 * export const PostShow = (props) => (
 *     <Show {...props}>
 *         <SimpleShowLayout>
 *             <TextField source="title" />
 *         </SimpleShowLayout>
 *     </Show>
 * );
 *
 * // in src/App.js
 * import * as React from "react";
 * import { Admin, Resource } from 'react-admin';
 *
 * import { PostShow } from './posts';
 *
 * const App = () => (
 *     <Admin dataProvider={...}>
 *         <Resource name="posts" show={PostShow} />
 *     </Admin>
 * );
 * export default App;
 */
declare const Show: {
    (props: ShowProps): JSX.Element;
    propTypes: {
        actions: PropTypes.Requireable<PropTypes.ReactElementLike>;
        aside: PropTypes.Requireable<PropTypes.ReactElementLike>;
        children: PropTypes.Requireable<PropTypes.ReactElementLike>;
        classes: PropTypes.Requireable<object>;
        className: PropTypes.Requireable<string>;
        hasCreate: PropTypes.Requireable<boolean>;
        hasEdit: PropTypes.Requireable<boolean>;
        hasList: PropTypes.Requireable<boolean>;
        hasShow: PropTypes.Requireable<boolean>;
        id: PropTypes.Validator<any>;
        resource: PropTypes.Validator<string>;
        title: PropTypes.Requireable<PropTypes.ReactNodeLike>;
    };
};
interface ShowViewProps extends ShowProps, Omit<ShowControllerProps, 'resource'> {
}
export declare const ShowView: {
    (props: ShowViewProps): JSX.Element;
    propTypes: {
        actions: PropTypes.Requireable<PropTypes.ReactElementLike>;
        aside: PropTypes.Requireable<PropTypes.ReactElementLike>;
        basePath: PropTypes.Requireable<string>;
        children: PropTypes.Requireable<PropTypes.ReactElementLike>;
        classes: PropTypes.Requireable<object>;
        className: PropTypes.Requireable<string>;
        defaultTitle: PropTypes.Requireable<any>;
        hasEdit: PropTypes.Requireable<boolean>;
        hasList: PropTypes.Requireable<boolean>;
        loading: PropTypes.Requireable<boolean>;
        loaded: PropTypes.Requireable<boolean>;
        record: PropTypes.Requireable<object>;
        resource: PropTypes.Requireable<string>;
        title: PropTypes.Requireable<any>;
        version: PropTypes.Requireable<PropTypes.ReactNodeLike>;
    };
    defaultProps: {
        classes: {};
        component: typeof Card;
    };
};
export default Show;
