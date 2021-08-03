import React from 'react';
import { ArrayField, ChipField, ReferenceField, SingleFieldList, TextField, } from 'react-admin';
import { MainList, Show, SideList, Hero, GridList, AvatarField, RightLabel, Column, ColumnShowLayout } from '@semapps/archipelago-layout';
import { Grid } from '@material-ui/core';
import { MapField } from '@semapps/geo-components';
import HomeIcon from '@material-ui/icons/Home';
import { GroupedReferenceHandler, ReferenceArrayField, UriArrayField } from '@semapps/semantic-data-provider';
import SocialNetworkArrayIcon from '../../components/SocialNetworkArrayIcon';
import UrlArrayField from '../../components/UrlArrayfield';
import VideoPlayer from '../../addons/videoComponent';


const UserTitle = ({ record }) => {
  return <span>{record ? `${record['pair:firstName']} ${record['pair:lastName']}` : ''}</span>;
};
const UserShow = props => {
  return <Show title={<UserTitle />} {...props}>
    <ColumnShowLayout>
      <Column xs={12} sm={8} showLabel>
        <Hero image="image">
          <TextField source="pair:comment" label="Présentation" />
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
          <ReferenceArrayField reference="Project" source="pair:involvedIn">
            <SingleFieldList linkType="show">
                <AvatarField label={record => `${record['pair:label']}`} image="passerelle:logo" classes={{
                  parent: {
                    width: '100px',
                    margin : '10px'
                  }
                }}/>
            </SingleFieldList>
          </ReferenceArrayField>
        <VideoPlayer source="pair:video" addLabel/>
         
      </Column>

      <Column xs={12} sm={4} showLabel>
        <SideList>
          <MapField
            source="pair:hasLocation"
            address={record => record['pair:hasLocation'] && record['pair:hasLocation']['pair:label']}
            latitude={record => record['pair:hasLocation'] && record['pair:hasLocation']['pair:latitude']}
            longitude={record => record['pair:hasLocation'] && record['pair:hasLocation']['pair:longitude']}
          />
          <UrlArrayField source="pair:homePage" addLabel/>
          <SocialNetworkArrayIcon source="pair:aboutPage" addLabel/>
          <TextField label="Email" source="pair:e-mail" type="email" addLabel/>
          <TextField label="Téléphone" source="pair:phone" addLabel/>
          <UriArrayField reference="Sector" label="Thématiques" source="pair:hasSector">
            <SingleFieldList linkType="show">            
              <AvatarField label={record => `${record['pair:label']}`} image="image" classes={{
                parent: {
                  width: '100px',
                  margin : '10px'
                }
              }}/>          
            </SingleFieldList>
          </UriArrayField>         </SideList>
      </Column>
    </ColumnShowLayout>
  </Show>
}

export default UserShow;
