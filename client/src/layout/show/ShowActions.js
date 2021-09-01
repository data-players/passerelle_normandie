import React from 'react';
import { EditButton, ListButton } from 'react-admin';
import {TopToolbar} from '@semapps/archipelago-layout';

const ShowActions = ({ basePath, className, data, hasList, hasEdit, ...otherProps }) => (
  <TopToolbar className={className} {...otherProps}>
    {hasList && <ListButton basePath={basePath} record={data} />}
    {hasEdit && process.env.REACT_APP_ADMIN==='true' && <EditButton basePath={basePath} record={data} />}
  </TopToolbar>
);

export default ShowActions;
