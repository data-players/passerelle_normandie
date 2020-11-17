import React from 'react';
import { List, SimpleList } from '@semapps/archipelago-layout';

const SkillList = props => (
  <List {...props}>
    <SimpleList
      primaryText={record => record['pair:label']}
      linkType="show"
    />
  </List>
);

export default SkillList;
