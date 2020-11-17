import React from 'react';
import { DateField } from 'react-admin';
import { List, SimpleList } from '@semapps/archipelago-layout';

const PlaceList = props => (
  <List {...props}>
    <SimpleList
      primaryText={record => record['pair:label']}
      linkType="show"
    />
  </List>
);

export default PlaceList;
