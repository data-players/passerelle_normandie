import React from 'react';
import { ChipField, SingleFieldList, TextField,ArrayField,ReferenceField } from 'react-admin';
import { Column, ColumnShowLayout, Hero, Show, RightLabel, AvatarField } from '@semapps/archipelago-layout';
import { UriArrayField,GroupedReferenceHandler } from '@semapps/semantic-data-provider';

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
        <UriArrayField label="Participe à" reference="Project" source="pair:involvedIn">
          <SingleFieldList linkType="show">
            <ChipField source="pair:label" color="secondary" />
          </SingleFieldList>
        </UriArrayField>
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
