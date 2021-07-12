import React from 'react';
import { ChipField, SingleFieldList, TextField, UrlField } from 'react-admin';
import { Column, ColumnShowLayout, GridList, Show, MarkdownField ,UserIcon} from '@semapps/archipelago-layout';
import { UriArrayField, ImageField } from '@semapps/semantic-data-provider';
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
      <Column xs={12} sm={3} showLabel>
        <UriArrayField label="Géré par" reference="Organization" source="pair:managedBy">
          <SingleFieldList linkType="show">
            <ChipField source="pair:label" color="secondary" />
          </SingleFieldList>
        </UriArrayField>
        <UriArrayField label="Responsables" reference="User" source="pair:hasResponsible">
          <GridList xs={6} linkType="show">
            <UserIcon />
          </GridList>
        </UriArrayField>
        <UriArrayField label="Participants" reference="User" source="pair:involves">
          <GridList xs={6} linkType="show">
            <UserIcon />
          </GridList>
        </UriArrayField>
      </Column>
    </ColumnShowLayout>
  </Show>
};

export default ProjectShow;
