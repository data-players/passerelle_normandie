import React from 'react';
import { ChipField, SingleFieldList, TextField, UrlField, DateField } from 'react-admin';
import { Column, ColumnShowLayout, Hero, Show, MarkdownField, UserIcon, GridList, AvatarField} from '@semapps/archipelago-layout';
import { UriArrayField } from '@semapps/semantic-data-provider';
import UrlArrayField from '../../components/UrlArrayfield';
import SocialNetworkArrayIcon from '../../components/SocialNetworkArrayIcon';
import VideoPlayer from '../../addons/videoComponent';
import { MapField } from '@semapps/geo-components';

const ProjectTitle = ({ record }) => {
  return <span>{record ? record['pair:label'] : ''}</span>;
};

const EventShow = props => (
  <Show  title={<ProjectTitle />} {...props}>
    <ColumnShowLayout>
      <Column xs={12} sm={8} showLabel>
        <Hero image="image">
          <DateField label="Date de début" source="pair:startDate" options={{ year: 'numeric', month: 'long', day: 'numeric', hour: 'numeric', minute : 'numeric' }} showTime />
          <DateField label="Date de fin" source="pair:endDate" options={{ year: 'numeric', month: 'long', day: 'numeric', hour: 'numeric', minute : 'numeric' }} showTime />
        </Hero>
        <TextField source="pair:comment" variant="h5" addLabel={false}/>
        <MarkdownField source="pair:description" addLabel />
        <UriArrayField label="Proposé par" reference="Organization" source="pair:deliveredBy">
          <SingleFieldList linkType="show">            
            <AvatarField label={record => `${record['pair:label']}`} image="image" classes={{
              parent: {
                width: '100px',
                margin : '10px'
              }
            }}/>          
          </SingleFieldList>
        </UriArrayField>
        <UriArrayField label="Participants" reference="Person" source="pair:involvedIn" referenceBasePath="/Person">
          <GridList xs={6} linkType="show">
            <AvatarField label={record => `${record['pair:firstName']} ${record['pair:lastName']}`} image="image" classes={{
              parent: {
                width: '100px',
                margin : '10px'
              }
            }}/> 
          </GridList>
        </UriArrayField>
        <UriArrayField label="Intérêts" reference="Interest" source="pair:hasInterest">
            <SingleFieldList linkType={false}>
              <ChipField source="pair:label" color="secondary" />
            </SingleFieldList>
          </UriArrayField>
        <VideoPlayer source="pair:video" addLabel/>
      </Column>
      <Column xs={12} sm={4} showLabel>
        <MapField
          source="pair:hasLocation"
          address={record => record['pair:hasLocation'] && record['pair:hasLocation']['pair:label']}
          latitude={record => record['pair:hasLocation'] && record['pair:hasLocation']['pair:latitude']}
          longitude={record => record['pair:hasLocation'] && record['pair:hasLocation']['pair:longitude']}
        />
        <SocialNetworkArrayIcon source="pair:aboutPage" addLabel/>
        <UrlArrayField source="pair:homePage" addLabel/>
        <UriArrayField reference="Sector" source="pair:hasSector">
          <SingleFieldList linkType="show">            
            <AvatarField label={record => `${record['pair:label']}`} image="image" classes={{
              parent: {
                width: '100px',
                margin : '10px'
              }
            }}/>          
          </SingleFieldList>
        </UriArrayField> 
      </Column>
    </ColumnShowLayout>
  </Show>
);

export default EventShow;
