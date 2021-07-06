import React from 'react';
import { ListBase } from 'react-admin';
import { MasonryList } from '@semapps/archipelago-layout';
import ProjectPreview from '../resources/projects/ProjectPreview';

const FeaturedProjects = () => (
  <ListBase resource="Project" basePath="/Project" perPage={4} filter={{ 'pair:hasStatut': 'true' }} sort={{ order: 'ASC' }}>
    <MasonryList
      image={record => Array.isArray(record?.image) ? record?.image?.[0] : record?.image}
      content={record => <ProjectPreview record={record} />}
      breakpointCols={{ default: 4, 1200: 3, 1000: 2, 700: 1 }}
      linkType="show"
    />
  </ListBase>
);

export default FeaturedProjects;
