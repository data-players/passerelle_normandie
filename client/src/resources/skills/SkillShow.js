import React from 'react';
import { Column, ColumnShowLayout, Show, UserIcon, GridList } from '@semapps/archipelago-layout';
import { UriArrayField } from '@semapps/semantic-data-provider';
import { Typography } from '@material-ui/core';

const SkillTitle = ({ record }) => {
  return <span>{record ? record['pair:label'] : ''}</span>;
};

const SkillShow = props => (
  <Show title={<SkillTitle />} {...props}>
    <ColumnShowLayout>
      <Column xs={12} sm={9}>
        <Typography variant="h3" color="primary" component="h1" id="react-admin-title" />
      </Column>
      <Column xs={12} sm={3} showLabel>
        <UriArrayField
          label="Proposé par"
          reference="User"
          source="pair:offeredBy"
        >
          <GridList xs={6} linkType="show">
            <UserIcon />
          </GridList>
        </UriArrayField>
      </Column>
    </ColumnShowLayout>
  </Show>
);

export default SkillShow;
