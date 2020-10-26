import { ComponentType, FunctionComponent } from 'react';
import { AdminChildren, CustomRoutes, CatchAllComponent, LayoutComponent, LayoutProps } from '../types';
export interface AdminRouterProps extends LayoutProps {
    layout: LayoutComponent;
    catchAll: CatchAllComponent;
    children?: AdminChildren;
    customRoutes?: CustomRoutes;
    loading: ComponentType;
}
declare const CoreAdminRouter: FunctionComponent<AdminRouterProps>;
export default CoreAdminRouter;
