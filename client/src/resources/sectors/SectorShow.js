import React from 'react';
import { ChipField, SingleFieldList, TextField, UrlField, DateField } from 'react-admin';
import { Column, ColumnShowLayout, Hero, Show, MarkdownField, UserIcon, GridList} from '@semapps/archipelago-layout';
import { UriArrayField } from '@semapps/semantic-data-provider';

const ProjectTitle = ({ record }) => {
  return <span>{record ? record['pair:label'] : ''}</span>;
};

const SectorShow = props => (
  <Show  title={<ProjectTitle />} {...props}>
    <ColumnShowLayout>
      <Column xs={12} sm={6}>
        <Hero>
          <TextField label="Courte description" source="pair:comment" />
        </Hero>
        <MarkdownField source="pair:description" addLabel />
      </Column>
    </ColumnShowLayout>
  </Show>
);

export default SectorShow;
