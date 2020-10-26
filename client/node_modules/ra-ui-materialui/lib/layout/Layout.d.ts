import React, { ErrorInfo, ReactElement, ReactNode, ComponentType, HtmlHTMLAttributes } from 'react';
import PropTypes from 'prop-types';
import { RouteComponentProps } from 'react-router-dom';
import { ThemeOptions } from '@material-ui/core';
import { CustomRoutes, LayoutProps } from 'ra-core';
export interface MuiLayoutProps extends LayoutProps, RouteComponentProps, Omit<HtmlHTMLAttributes<HTMLDivElement>, 'title'> {
    className?: string;
    classes?: any;
    customRoutes?: CustomRoutes;
    appBar?: ComponentType<{
        title?: string | ReactElement<any>;
        open?: boolean;
        logout?: ReactNode;
    }>;
    sidebar?: ComponentType<{
        children: JSX.Element;
    }>;
    error?: ComponentType<{
        error?: string;
        errorInfo?: React.ErrorInfo;
        title?: string | ReactElement<any>;
    }>;
    notification?: ComponentType;
    open?: boolean;
}
export declare type RestProps = Omit<MuiLayoutProps, 'appBar' | 'children' | 'classes' | 'className' | 'customRoutes' | 'error' | 'dashboard' | 'logout' | 'menu' | 'notification' | 'open' | 'sidebar' | 'title'>;
export interface LayoutState {
    hasError: boolean;
    errorMessage: string;
    errorInfo: ErrorInfo;
}
declare const LayoutWithTheme: {
    ({ theme: themeOverride, ...props }: LayoutWithThemeProps): JSX.Element;
    propTypes: {
        theme: PropTypes.Requireable<object>;
    };
    defaultProps: {
        theme: {
            palette: {
                secondary: {
                    light: string;
                    main: string;
                    dark: string;
                    contrastText: string;
                };
            };
            typography: {
                h6: {
                    fontWeight: number;
                };
            };
            sidebar: {
                width: number;
                closedWidth: number;
            };
            overrides: {
                MuiFilledInput: {
                    root: {
                        backgroundColor: string;
                        '&$disabled': {
                            backgroundColor: string;
                        };
                    };
                };
            };
        };
    };
};
interface LayoutWithThemeProps extends LayoutProps {
    theme?: ThemeOptions;
}
export default LayoutWithTheme;
