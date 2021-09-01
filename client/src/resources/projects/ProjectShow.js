import React from 'react';
import { SingleFieldList, TextField } from 'react-admin';
import { Column, ColumnShowLayout, MarkdownField, AvatarField} from '@semapps/archipelago-layout';
import { Show } from '../../layout/show/Show.js';
import { UriArrayField, ImageField } from '@semapps/semantic-data-provider';
import { Typography, makeStyles } from '@material-ui/core';
import VideoPlayer from '../../addons/videoComponent';
import SocialNetworkArrayIcon from '../../components/SocialNetworkArrayIcon';
import UrlArrayField from '../../components/UrlArrayfield';
import { MapField } from '@semapps/geo-components';

const ProjectTitle = ({ record }) => {
  return <span>{record ? record['pair:label'] : ''}</span>;
};

const logoImage = makeStyles({
  image: {
    width: '300px',
  }
});

const mainImage = makeStyles({
  image: {
    objectFit: 'cover',
    width: '100%',
    maxHeight :'20em'
  }
});

const ProjectShow = props => {
  const logoStyle = logoImage();
  const mainImageStyles = mainImage();

  return <Show title={<ProjectTitle />} {...props}>
    <ColumnShowLayout>
      <Column xs={12} sm={12} showLabel>
        <ImageField source="image" classes={mainImageStyles}/>
      </Column>
      <Column xs={12} sm={8} showLabel>
        <TextField label="Courte description" source="pair:comment" variant="h5" addLabel={false} />

        <Typography variant="h3" color="primary" component="h1" id="react-admin-title" />
        <MarkdownField label="Description" source="pair:description" addLabel />
        <UriArrayField label="Personne(s) impliquée(s) dans le projet" reference="Person" source="pair:involves">
          <SingleFieldList linkType={false}>
            <AvatarField label={record => `${record['pair:firstName']} ${record['pair:lastName']}`} image="image" classes={{
              parent: {
                width: '100px',
                margin : '10px'
              }
            }}/>
          </SingleFieldList>
        </UriArrayField>
        <UriArrayField label="Personne(s) coordonnant le projet" reference="Person" source="pair:hasResponsible">
          <SingleFieldList linkType={false}>
            <AvatarField label={record => `${record['pair:firstName']} ${record['pair:lastName']}`} image="image" classes={{
              parent: {
                width: '100px',
                margin : '10px'
              }
            }}/>
          </SingleFieldList>
        </UriArrayField>
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
        <TextField label="Email" source="pair:e-mail" type="email" addLabel/>
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
};

export default ProjectShow;
