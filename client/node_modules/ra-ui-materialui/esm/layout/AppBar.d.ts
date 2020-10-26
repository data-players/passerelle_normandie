/// <reference types="react" />
import PropTypes from 'prop-types';
import { AppBarProps as MuiAppBarProps } from '@material-ui/core/AppBar';
import { ClassesOverride } from '../types';
declare const useStyles: (props?: any) => Record<"toolbar" | "title" | "menuButton" | "menuButtonIconClosed" | "menuButtonIconOpen", string>;
/**
 * The AppBar component renders a custom MuiAppBar.
 *
 * @param {ReactNode} children React node/s to be render as children of the AppBar
 * @param {Object} classes CSS class names
 * @param {string} className CSS class applied to the MuiAppBar component
 * @param {string} color The color of the AppBar
 * @param {Component} logout The logout button component that will be pass to the UserMenu component
 * @param {boolean} open State of the <Admin/> Sidebar
 * @param {Element} userMenu A custom user menu component for the AppBar. <UserMenu/> component by default
 *
 * @example
 *
 * const MyAppBar = props => {
 *   const classes = useStyles();
 *   return (
 *       <AppBar {...props}>
 *           <Typography
 *               variant="h6"
 *               color="inherit"
 *               className={classes.title}
 *               id="react-admin-title"
 *           />
 *        </AppBar>
 *    );
 *};
 */
declare const AppBar: {
    (props: AppBarProps): JSX.Element;
    propTypes: {
        children: PropTypes.Requireable<PropTypes.ReactNodeLike>;
        classes: PropTypes.Requireable<object>;
        className: PropTypes.Requireable<string>;
        color: PropTypes.Requireable<string>;
        logout: PropTypes.Requireable<PropTypes.ReactElementLike>;
        open: PropTypes.Requireable<boolean>;
        userMenu: PropTypes.Requireable<PropTypes.ReactElementLike>;
    };
    defaultProps: {
        userMenu: JSX.Element;
    };
};
export interface AppBarProps extends Omit<MuiAppBarProps, 'title' | 'classes'> {
    classes?: ClassesOverride<typeof useStyles>;
    logout?: JSX.Element;
    open?: boolean;
    title?: string | JSX.Element;
    userMenu?: JSX.Element;
}
export default AppBar;
