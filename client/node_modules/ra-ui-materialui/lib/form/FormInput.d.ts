import { FC, HtmlHTMLAttributes, ReactElement } from 'react';
import { Record } from 'ra-core';
import { ClassesOverride } from '../types';
declare const useStyles: (props?: any) => globalThis.Record<"input", string>;
declare const FormInput: FC<FormInputProps>;
export interface FormInputProps extends HtmlHTMLAttributes<HTMLDivElement> {
    basePath: string;
    classes?: ClassesOverride<typeof useStyles>;
    input: ReactElement;
    margin?: 'none' | 'normal' | 'dense';
    record: Record;
    resource: string;
    variant?: 'standard' | 'outlined' | 'filled';
}
export default FormInput;
