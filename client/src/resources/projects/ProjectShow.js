import React from 'react';
import { ChipField, SingleFieldList, TextField, UrlField } from 'react-admin';
import { Column, ColumnShowLayout, Hero, GridList, Show, MarkdownField ,UserIcon} from '@semapps/archipelago-layout';
import { UriArrayField } from '@semapps/semantic-data-provider';
import { Typography, Box, makeStyles } from '@material-ui/core';

const ProjectTitle = ({ record }) => {
  return <span>{record ? record['pair:label'] : ''}</span>;
};

const ProjectShow = props => (
  <Show title={<ProjectTitle />} {...props}>
    <ColumnShowLayout>
      <Column xs={12} sm={9} showLabel>
        <Typography variant="h3" color="primary" component="h1" id="react-admin-title" />
        <TextField label="Courte description" source="pair:comment" />
        <UrlField label="Site web" source="pair:homePage" />
        <MarkdownField label="Description" source="pair:description" addLabel />
      </Column>
      <Column xs={12} sm={3} showLabel>
        <UriArrayField label="Géré par" reference="Organization" source="pair:managedBy">
          <SingleFieldList linkType="show">
            <ChipField source="pair:label" color="secondary" />
          </SingleFieldList>
        </UriArrayField>
        <UriArrayField label="Responsables" reference="User" source="pair:hasResponsible">
          <GridList xs={6} linkType="show">
            <UserIcon />
          </GridList>
        </UriArrayField>
        <UriArrayField label="Participants" reference="User" source="pair:involves">
          <GridList xs={6} linkType="show">
            <UserIcon />
          </GridList>
        </UriArrayField>
      </Column>
    </ColumnShowLayout>
  </Show>
);

export default ProjectShow;
