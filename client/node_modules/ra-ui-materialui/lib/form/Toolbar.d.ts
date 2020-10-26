import * as React from 'react';
import { ReactNode } from 'react';
import { Record, RedirectionSideEffect } from 'ra-core';
import { FormRenderProps } from 'react-final-form';
import { ClassesOverride } from '../types';
declare const useStyles: (props?: any) => globalThis.Record<"toolbar" | "spacer" | "desktopToolbar" | "mobileToolbar" | "defaultToolbar", string>;
export interface ToolbarProps<RecordType extends Record = Record> {
    children?: ReactNode;
    alwaysEnableSaveButton?: boolean;
    className?: string;
    classes?: ClassesOverride<typeof useStyles>;
    handleSubmitWithRedirect?: (redirect?: RedirectionSideEffect) => void;
    handleSubmit?: FormRenderProps['handleSubmit'];
    invalid?: boolean;
    pristine?: boolean;
    saving?: boolean;
    submitOnEnter?: boolean;
    redirect?: RedirectionSideEffect;
    basePath?: string;
    record?: RecordType;
    resource?: string;
    undoable?: boolean;
    width?: string;
}
declare const _default: React.ComponentType<Pick<React.PropsWithChildren<ToolbarProps<Record>>, "classes" | "className" | "resource" | "children" | "handleSubmit" | "invalid" | "pristine" | "basePath" | "handleSubmitWithRedirect" | "record" | "redirect" | "saving" | "submitOnEnter" | "undoable" | "alwaysEnableSaveButton"> & import("@material-ui/core/withWidth").WithWidthProps>;
export default _default;
