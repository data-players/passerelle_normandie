import React from 'react';
import { List, SimpleList } from '@semapps/archipelago-layout';
import SectorFilterSidebar from './../../components/SectorFilterSidebar';

const ProjectList = props => (
  <List {...props} aside={<SectorFilterSidebar />}>
    <SimpleList
      primaryText={record => record['pair:label']}
      secondaryText={record => record['pair:comment']}
      linkType="show"
    />
  </List>
);

export default ProjectList;
