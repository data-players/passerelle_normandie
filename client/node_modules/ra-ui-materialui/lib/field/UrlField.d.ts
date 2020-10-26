import { FC, HtmlHTMLAttributes } from 'react';
import { PublicFieldProps, InjectedFieldProps } from './types';
declare const UrlField: FC<UrlFieldProps>;
export interface UrlFieldProps extends PublicFieldProps, InjectedFieldProps, HtmlHTMLAttributes<HTMLAnchorElement> {
}
export default UrlField;
