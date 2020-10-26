import { FC } from 'react';
import { ListControllerProps } from 'ra-core';
import { ListProps } from '../types';
export declare const ListView: FC<ListViewProps>;
export interface ListViewProps extends Omit<ListProps, 'basePath' | 'hasCreate' | 'perPage' | 'resource'>, ListControllerProps {
}
export default ListView;
