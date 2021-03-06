import React from 'react';
import { ChipField, SingleFieldList, TextField, UrlField, DateField } from 'react-admin';
import { Column, ColumnShowLayout, Hero, Show, MarkdownField, UserIcon, GridList} from '@semapps/archipelago-layout';
import { UriArrayField, ReferenceArrayField } from '@semapps/semantic-data-provider';

const ProjectTitle = ({ record }) => {
  return <span>{record ? record['pair:label'] : ''}</span>;
};

const EventShow = props => (
  <Show  title={<ProjectTitle />} {...props}>
    <ColumnShowLayout>
      <Column xs={12} sm={9}>
        <Hero>
          <TextField label="Courte description" source="pair:comment" />
          <DateField label="Date de début" source="pair:startDate" showTime />
          <DateField label="Date de fin" source="pair:endDate" showTime />
          <UrlField label="Site web" source="pair:homePage" />
          <UrlField label="Site web" source="pair:aboutPage" />
        </Hero>
        <MarkdownField source="pair:description" addLabel />
      </Column>
      <Column xs={12} sm={3} showLabel>
        <UriArrayField label="Proposé par" reference="Organization" source="pair:deliveredBy">
          <SingleFieldList linkType="show">
            <ChipField source="pair:label" color="secondary" />
          </SingleFieldList>
        </UriArrayField>
        <UriArrayField label="Participants" reference="User" source="pair:involves" referenceBasePath="/User">
          <GridList xs={6} linkType="show">
            <UserIcon />
          </GridList>
        </UriArrayField>
        <UriArrayField label="Intérêts" reference="Interest" source="pair:hasInterest">
          <SingleFieldList linkType={false}>
            <ChipField source="pair:label" color="secondary" />
          </SingleFieldList>
        </UriArrayField>
        <ReferenceArrayField reference="Sector" source="pair:hasSector">
          <SingleFieldList linkType="show">
            <ChipField source="pair:label" color="secondary" />
          </SingleFieldList>
        </ReferenceArrayField>
      </Column>
    </ColumnShowLayout>
  </Show>
);

export default EventShow;
