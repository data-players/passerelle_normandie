import { FC, ReactElement } from 'react';
import { UseReferenceProps, getResourceLinkPath, LinkToType } from 'ra-core';
import { PublicFieldProps, InjectedFieldProps } from './types';
import { ClassesOverride } from '../types';
/**
 * Fetch reference record, and delegate rendering to child component.
 *
 * The reference prop sould be the name of one of the <Resource> components
 * added as <Admin> child.
 *
 * @example
 * <ReferenceField label="User" source="userId" reference="users">
 *     <TextField source="name" />
 * </ReferenceField>
 *
 * @default
 * By default, includes a link to the <Edit> page of the related record
 * (`/users/:userId` in the previous example).
 *
 * Set the `link` prop to "show" to link to the <Show> page instead.
 *
 * @example
 * <ReferenceField label="User" source="userId" reference="users" link="show">
 *     <TextField source="name" />
 * </ReferenceField>
 *
 * @default
 * You can also prevent `<ReferenceField>` from adding link to children by setting
 * `link` to false.
 *
 * @example
 * <ReferenceField label="User" source="userId" reference="users" link={false}>
 *     <TextField source="name" />
 * </ReferenceField>
 *
 * @default
 * Alternatively, you can also pass a custom function to `link`. It must take reference and record
 * as arguments and return a string
 *
 * @example
 * <ReferenceField label="User" source="userId" reference="users" link={(reference, record) => "/path/to/${reference}/${record}"}>
 *     <TextField source="name" />
 * </ReferenceField>
 *
 * @default
 * In previous versions of React-Admin, the prop `linkType` was used. It is now deprecated and replaced with `link`. However
 * backward-compatibility is still kept
 */
declare const ReferenceField: FC<ReferenceFieldProps>;
export interface ReferenceFieldProps extends PublicFieldProps, InjectedFieldProps {
    children: ReactElement;
    classes?: ClassesOverride<typeof useStyles>;
    reference: string;
    resource?: string;
    source: string;
    translateChoice?: Function | boolean;
    linkType?: LinkToType;
    link?: LinkToType;
}
declare const useStyles: (props?: any) => Record<"link", string>;
export declare const ReferenceFieldView: FC<ReferenceFieldViewProps>;
export interface ReferenceFieldViewProps extends PublicFieldProps, InjectedFieldProps, UseReferenceProps {
    classes?: ClassesOverride<typeof useStyles>;
    reference: string;
    resource?: string;
    translateChoice?: Function | boolean;
    resourceLinkPath?: ReturnType<typeof getResourceLinkPath>;
    children?: ReactElement;
}
export default ReferenceField;
