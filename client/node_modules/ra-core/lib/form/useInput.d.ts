import { FieldProps, FieldRenderProps, FieldInputProps } from 'react-final-form';
import { Validator } from './validate';
import { ChangeEvent, FocusEvent } from 'react';
export interface InputProps<T = any> extends Omit<FieldProps<any, FieldRenderProps<any, HTMLElement>, HTMLElement>, 'validate' | 'children'> {
    source: string;
    name?: string;
    id?: string;
    defaultValue?: any;
    validate?: Validator | Validator[];
    onBlur?: (event: FocusEvent<T>) => void;
    onChange?: (event: ChangeEvent | any) => void;
    onFocus?: (event: FocusEvent<T>) => void;
    options?: T;
    input?: FieldInputProps<any, HTMLElement>;
    meta?: any;
}
interface ComputedInputProps extends FieldRenderProps<any, HTMLElement> {
    id: string;
    isRequired: boolean;
}
declare const useInput: ({ defaultValue, id, name, source, validate, onBlur: customOnBlur, onChange: customOnChange, onFocus: customOnFocus, ...options }: InputProps) => ComputedInputProps;
export default useInput;
