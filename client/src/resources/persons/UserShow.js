import React from 'react';
import { ChipField, SingleFieldList,ArrayField,ReferenceField, TextField, } from 'react-admin';
import { Grid } from '@material-ui/core';
import { MapField } from '@semapps/geo-components';
import HomeIcon from '@material-ui/icons/Home';

import SocialNetworkArrayIcon from '../../components/SocialNetworkArrayIcon';
import UrlArrayField from '../../components/UrlArrayfield';
import VideoPlayer from '../../addons/videoComponent';

import { MainList, GridList, Column,SideList, ColumnShowLayout, Hero, Show, RightLabel, AvatarField } from '@semapps/archipelago-layout';
import { UriArrayField,GroupedReferenceHandler,ReferenceArrayField } from '@semapps/semantic-data-provider';


const UserTitle = ({ record }) => {
  return <span>{record ? `${record['pair:firstName']} ${record['pair:lastName']}` : ''}</span>;
};
const UserShow = props => {
  return <Show title={<UserTitle />} {...props}>
    <Grid container spacing={5}>
      <Grid item xs={12} sm={8}>
        <Hero image="image">
          <TextField source="pair:comment" label="Description" />
          <ReferenceArrayField reference="Project" source="pair:involvedIn">
            <SingleFieldList linkType="show">
              <ChipField source="pair:label" color="secondary" />
            </SingleFieldList>
          </ReferenceArrayField>

          <ReferenceArrayField reference="Interest" source="pair:hasTopic">
            <SingleFieldList linkType="show">
              <ChipField source="pair:label" color="secondary" />
            </SingleFieldList>
          </ReferenceArrayField>
          <ReferenceArrayField reference="Skill" source="pair:offers">
            <SingleFieldList linkType="show">
              <ChipField source="pair:label" color="secondary" />
            </SingleFieldList>
          </ReferenceArrayField>
        </Hero>
        <MainList>
          <VideoPlayer source="pair:video" addLabel/>
            <GroupedReferenceHandler
               source="pair:actorOfMembership"
               groupReference="MembershipRole"
               groupLabel="pair:label"
               filterProperty="pair:membershipRole"
               addLabel={false}
             >
               <RightLabel>
                 <ArrayField source="pair:actorOfMembership">
                   <SingleFieldList linkType={false}>
                     <ReferenceField reference="Organization" source="pair:membershipOrganization" link="show">
                       <AvatarField label={record => `${record['pair:label']}`} image="image" classes={{
                                           parent: {
                                             width: '100px',
                                             margin : '10px'
                                           }
                                         }}/>

                     </ReferenceField>
                   </SingleFieldList>
                 </ArrayField>
               </RightLabel>
             </GroupedReferenceHandler>
        </MainList>
      </Grid>

      <Grid item xs={12} sm={4}>
        <SideList>
        <MainList>
          <MapField
            source="pair:hasLocation"
            address={record => record['pair:hasLocation'] && record['pair:hasLocation']['pair:label']}
            latitude={record => record['pair:hasLocation'] && record['pair:hasLocation']['pair:latitude']}
            longitude={record => record['pair:hasLocation'] && record['pair:hasLocation']['pair:longitude']}
          />
        </MainList>
          <UrlArrayField source="pair:homePage" addLabel/>
          <SocialNetworkArrayIcon source="pair:aboutPage" addLabel/>
          <TextField label="Email" source="pair:e-mail" type="email" addLabel/>
          <TextField label="Téléphone" source="pair:phone" addLabel/>
        </SideList>
      </Grid>
    </Grid>
  </Show>
}

export default UserShow;
