import React from 'react';
import { ChipField, SingleFieldList, TextField, UrlField, DateField } from 'react-admin';
import { Column, ColumnShowLayout, Hero, Show, MarkdownField, UserIcon, GridList} from '@semapps/archipelago-layout';
import { UriArrayField } from '@semapps/semantic-data-provider';

const ProjectTitle = ({ record }) => {
  return <span>{record ? record['pair:label'] : ''}</span>;
};

const PlaceShow = props => (
  <Show {...props}>
    <ColumnShowLayout>
      <Column xs={12} sm={9} showLabel>
        <TextField label="Courte description" source="pair:comment" />
        <TextField label="Adresse" source="schema:address" />
        <MarkdownField label="Description" source="pair:description" addLabel />
      </Column>
      <Column xs={12} sm={3} showLabel>
        <UriArrayField label="Géré par" reference="Organization" source="pair:supportedBy">
          <SingleFieldList linkType="show">
            <ChipField source="pair:label" color="secondary" />
          </SingleFieldList>
        </UriArrayField>
      </Column>
    </ColumnShowLayout>
  </Show>
);

export default PlaceShow;
