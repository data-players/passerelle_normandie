import React from 'react';
import { ChipField, SingleFieldList, TextField, UrlField } from 'react-admin';
import { Column, ColumnShowLayout, GridList, Show, MarkdownField ,UserIcon, AvatarField} from '@semapps/archipelago-layout';
import { UriArrayField, ImageField, ReferenceArrayField } from '@semapps/semantic-data-provider';
import { Typography, makeStyles } from '@material-ui/core';
import VideoPlayer from '../../addons/videoComponent';
import SocialNetworkArrayIcon from '../../components/SocialNetworkArrayIcon';
import UrlArrayField from '../../components/UrlArrayfield';

const ProjectTitle = ({ record }) => {
  return <span>{record ? record['pair:label'] : ''}</span>;
};

const logoImage = makeStyles({
  image: {
    width: '300px',
  }
});

const ProjectShow = props => {
  const logoStyle = logoImage();

  return <Show title={<ProjectTitle />} {...props}>
    <ColumnShowLayout>
      <Column xs={12} sm={3} showLabel>
        <ImageField source='image' classes={logoStyle} />
      </Column>
      <Column xs={12} sm={6} showLabel>
        <TextField label="Courte description" source="pair:comment" />
        <UriArrayField label="Participants" reference="Person" source="pair:involves">
          <SingleFieldList linkType={false}>            
            <AvatarField label={record => `${record['pair:firstName']} ${record['pair:lastName']}`} image="image" classes={{
              parent: {
                width: '100px',
                margin : '10px'
              }
            }}/>          
          </SingleFieldList>
        </UriArrayField>
        <UriArrayField label="Responsables" reference="Person" source="pair:hasResponsible">
          <SingleFieldList linkType={false}>            
            <AvatarField label={record => `${record['pair:firstName']} ${record['pair:lastName']}`} image="image" classes={{
              parent: {
                width: '100px',
                margin : '10px'
              }
            }}/>          
          </SingleFieldList>
        </UriArrayField>
        <ReferenceArrayField reference="Sector" source="pair:hasSector">
          <SingleFieldList linkType="show">
            <ChipField source="pair:label" color="secondary" />
          </SingleFieldList>
        </ReferenceArrayField>
        <UriArrayField label="Géré par" reference="Organization" source="pair:managedBy">
          <SingleFieldList linkType="show">
            <ChipField source="pair:label" color="secondary" />
          </SingleFieldList>
        </UriArrayField>
      </Column>
      <Column xs={12} sm={3} showLabel>
        <SocialNetworkArrayIcon source="pair:aboutPage" addLabel/>
        <UrlArrayField source="pair:homePage" addLabel/>              
      </Column>
      <Column xs={12} sm={12} showLabel>
        <Typography variant="h3" color="primary" component="h1" id="react-admin-title" />
        <MarkdownField label="Description" source="pair:description" addLabel />
        <VideoPlayer source="pair:video" addLabel/>
      </Column>
    </ColumnShowLayout>
  </Show>
};

export default ProjectShow;
