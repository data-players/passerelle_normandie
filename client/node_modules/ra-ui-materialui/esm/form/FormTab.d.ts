import { FC, ReactElement } from 'react';
import { Record } from 'ra-core';
declare const FormTab: FC<FormTabProps>;
export interface FormTabProps {
    basePath?: string;
    className?: string;
    contentClassName?: string;
    hidden?: boolean;
    icon?: ReactElement;
    intent?: 'header' | 'content';
    label: string;
    margin?: 'none' | 'normal' | 'dense';
    path?: string;
    record?: Record;
    resource?: string;
    value?: string;
    variant?: 'standard' | 'outlined' | 'filled';
}
export default FormTab;
