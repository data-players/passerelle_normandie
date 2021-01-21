import React from 'react';
import { ChipField, SingleFieldList, TextField } from 'react-admin';
import { Column, ColumnShowLayout, Hero, Show, MarkdownField, UserIcon, GridList } from '@semapps/archipelago-layout';
import { UriArrayField } from '@semapps/semantic-data-provider';

const InterestTitle = ({ record }) => {
  return <span>{record ? record['pair:label'] : ''}</span>;
};

const InterestShow = props => (
  <Show title={<InterestTitle />} {...props}>
    <ColumnShowLayout>
      <Column xs={12} sm={9}>
        <Hero>
          <TextField source="pair:comment" />
        </Hero>
        <MarkdownField source="pair:description" />
      </Column>
      <Column xs={12} sm={3} showLabel>
        <UriArrayField
          label="Proposé par"
          reference="User"
          source="pair:topicOf"
        >
          <GridList xs={6} linkType="show">
            <UserIcon />
          </GridList>
        </UriArrayField>
      </Column>
    </ColumnShowLayout>
  </Show>
);

export default InterestShow;
