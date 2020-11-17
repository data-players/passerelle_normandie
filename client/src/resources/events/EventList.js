import React from 'react';
import { DateField } from 'react-admin';
import { List, SimpleList } from '@semapps/archipelago-layout';

const EventList = props => (
  <List {...props}>
    <SimpleList
      primaryText={record => record['pair:label']}
      secondaryText={record => (
        <>
          Du&nbsp;
          <DateField record={record} source="pair:startDate" showTime />
          &nbsp;au&nbsp;
          <DateField record={record} source="pair:endDate" showTime />
        </>
      )}
      linkType="show"
    />
  </List>
);

export default EventList;
