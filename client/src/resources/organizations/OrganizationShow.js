import React from 'react';
import { TextField, UrlField, SingleFieldList, ChipField} from 'react-admin';
import { Column, ColumnShowLayout, Hero, GridList, Show, MarkdownField, UserIcon} from '@semapps/archipelago-layout';
import { UriArrayField ,ImageField } from '@semapps/semantic-data-provider';
import { Typography, Box, makeStyles } from '@material-ui/core';

const OrganizationTitle = ({ record }) => {
  return <span>{record ? record['pair:label'] : ''}</span>;
};


const OrganizationShow = props => (
  <Show title={<OrganizationTitle />} {...props}>
    <ColumnShowLayout>
      <Column xs={12} sm={9}>
        <Hero image="image">
          <TextField label="Courte description" source="pair:comment" />
          <UrlField label="Site web" source="pair:homePage" />
          <TextField label="Email" source="pair:e-mail" type="email"/>
          <TextField label="Téléphone" source="pair:phone" type="email"/>
        </Hero>
        <MarkdownField source="pair:description" addLabel />
      </Column>
      <Column xs={12} sm={3} showLabel>
        <UriArrayField label="Membres" reference="User" source="pair:hasMember" referenceBasePath="/User">
          <GridList xs={6} linkType="show">
            <UserIcon />
          </GridList>
        </UriArrayField>

        <UriArrayField label="Lieux" reference="Place" source="pair:supports">
          <SingleFieldList linkType="show">
            <ChipField source="pair:label" color="secondary" />
          </SingleFieldList>
        </UriArrayField>

      </Column>
    </ColumnShowLayout>
  </Show>
);

export default OrganizationShow;
