import React from 'react';
import { List, SimpleList } from '@semapps/archipelago-layout';

const ProjectList = props => (
  <List {...props}>
    <SimpleList
      primaryText={record => record['pair:label']}
      secondaryText={record => record['pair:comment']}
      linkType="show"
    />
  </List>
);

export default ProjectList;
