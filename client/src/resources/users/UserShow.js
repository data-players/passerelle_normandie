import React from 'react';
import { ChipField, SingleFieldList, TextField } from 'react-admin';
import { Column, ColumnShowLayout, Hero, Show } from '@semapps/archipelago-layout';
import { UriArrayField } from '@semapps/semantic-data-provider';

const UserTitle = ({ record }) => {
  return <span>{record ? `${record['pair:firstName']} ${record['pair:lastName']}` : ''}</span>;
};

const UserShow = props => (
  <Show {...props} title={<UserTitle />}>
    <ColumnShowLayout>
      <Column xs={12} sm={9}>
        <Hero image="image">
          <TextField label="Prénom" source="pair:firstName" />
          <TextField label="Nom de famille" source="pair:lastName" />
        </Hero>
      </Column>
      <Column xs={12} sm={3} showLabel>
        <UriArrayField label="Membre de" reference="Organization" source="pair:memberOf">
          <SingleFieldList linkType="show">
            <ChipField source="pair:label" color="secondary" />
          </SingleFieldList>
        </UriArrayField>
        <UriArrayField label="Participe à" reference="Project" source="pair:involvedIn">
          <SingleFieldList linkType="show">
            <ChipField source="pair:label" color="secondary" />
          </SingleFieldList>
        </UriArrayField>
        <UriArrayField label="Compétences" reference="Skill" source="pair:offers">
          <SingleFieldList linkType="show">
            <ChipField source="pair:label" color="secondary" />
          </SingleFieldList>
        </UriArrayField>
        <UriArrayField label="Intérêts" reference="Interest" source="pair:hasTopic">
          <SingleFieldList linkType="show">
            <ChipField source="pair:label" color="secondary" />
          </SingleFieldList>
        </UriArrayField>
      </Column>
    </ColumnShowLayout>
  </Show>
);

export default UserShow;
