import React from 'react';
import { ChipField, SingleFieldList, TextField, UrlField, DateField } from 'react-admin';
import { Column, ColumnShowLayout, Hero, Show, MarkdownField, UserIcon, GridList} from '@semapps/archipelago-layout';
import { UriArrayField } from '@semapps/semantic-data-provider';
import { Typography } from '@material-ui/core';

const PlaceTitle = ({ record }) => {
  return <span>{record ? record['pair:label'] : ''}</span>;
};

const PlaceShow = props => (
  <Show title={<PlaceTitle />} {...props}>
    <ColumnShowLayout>
      <Column xs={12} sm={9} showLabel>
        <Typography variant="h3" color="primary" component="h1" id="react-admin-title" />
        <TextField label="Courte description" source="pair:comment" />
        <MarkdownField label="Description" source="pair:description" addLabel />
      </Column>
      </Tab>

      <Tab label="Projets" icon={<Avatar  />}>
      </Tab>

      <Tab label="Evènement" icon={<Avatar alt="test avatar" src="/icon_places.png" />}>
      </Tab>

    </TabbedShowLayout >

  </Show>
);

export default PlaceShow;
