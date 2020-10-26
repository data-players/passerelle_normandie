import { FC, ReactElement } from 'react';
declare const Menu: FC<MenuProps>;
export interface MenuProps {
    classes?: object;
    className?: string;
    dense?: boolean;
    hasDashboard: boolean;
    logout?: ReactElement;
    onMenuClick?: () => void;
}
export default Menu;
