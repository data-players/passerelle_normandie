import { FC, ReactElement, ReactNode } from 'react';
import { StaticContext } from 'react-router';
import { NavLinkProps } from 'react-router-dom';
import { MenuItemProps } from '@material-ui/core/MenuItem';
declare const MenuItemLink: FC<MenuItemLinkProps>;
interface Props {
    leftIcon?: ReactElement;
    primaryText?: ReactNode;
    staticContext?: StaticContext;
    sidebarIsOpen: boolean;
}
export declare type MenuItemLinkProps = Props & NavLinkProps & MenuItemProps<'li', {
    button?: true;
}>;
export default MenuItemLink;
