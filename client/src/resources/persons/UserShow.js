import React from 'react';
import { ChipField, SingleFieldList, TextField, } from 'react-admin';
import { MainList, Show, SideList, Hero, GridList, AvatarField } from '@semapps/archipelago-layout';
import { Grid } from '@material-ui/core';
import { MapField } from '@semapps/geo-components';
import HomeIcon from '@material-ui/icons/Home';
import { ReferenceArrayField } from '@semapps/semantic-data-provider';

const UserTitle = ({ record }) => {
  return <span>{record ? `${record['pair:firstName']} ${record['pair:lastName']}` : ''}</span>;
};

const UserShow = props => (
  <Show {...props} title={<UserTitle />}>
    <Grid container spacing={5}>
      <Grid item xs={12} sm={9}>
        <Hero image="image">
          <ReferenceArrayField reference="Project" source="pair:involvedIn">
            <SingleFieldList linkType="show">
              <ChipField source="pair:label" color="secondary" />
            </SingleFieldList>
          </ReferenceArrayField>
          <ReferenceArrayField reference="Organization" source="pair:affiliatedBy">
            <GridList xs={6} linkType="show">
              <AvatarField label="pair:label" image="image">
                <HomeIcon />
              </AvatarField>
            </GridList>
          </ReferenceArrayField>
          <ReferenceArrayField reference="Theme" source="pair:hasTopic">
            <SingleFieldList linkType="show">
              <ChipField source="pair:label" color="secondary" />
            </SingleFieldList>
          </ReferenceArrayField>
          <ReferenceArrayField reference="Skill" source="pair:offers">
            <SingleFieldList linkType="show">
              <ChipField source="pair:label" color="secondary" />
            </SingleFieldList>
          </ReferenceArrayField>
          <TextField source="pair:comment" />
        </Hero>
        <MainList>
          <MapField
            source="pair:hasLocation"
            address={record => record['pair:hasLocation'] && record['pair:hasLocation']['pair:label']}
            latitude={record => record['pair:hasLocation'] && record['pair:hasLocation']['pair:latitude']}
            longitude={record => record['pair:hasLocation'] && record['pair:hasLocation']['pair:longitude']}
          />
        </MainList>
      </Grid>
      <Grid item xs={12} sm={3}>
        <SideList>
          <TextField label="Email" source="pair:e-mail" type="email" addLabel/>
          <TextField label="Téléphone" source="pair:phone" addLabel/>
        </SideList>
      </Grid>
    </Grid>
  </Show>
);

export default UserShow;
