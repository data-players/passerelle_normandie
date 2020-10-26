import { FC, HtmlHTMLAttributes } from 'react';
import { PublicFieldProps, InjectedFieldProps } from './types';
declare const EmailField: FC<EmailFieldProps>;
export interface EmailFieldProps extends PublicFieldProps, InjectedFieldProps, HtmlHTMLAttributes<HTMLAnchorElement> {
}
export default EmailField;
