import React from 'react';
import { ChipField, SingleFieldList, TextField, Tab, TabbedShowLayout } from 'react-admin';
import { Column, ColumnShowLayout, Show, MarkdownField} from '@semapps/archipelago-layout';
import { UriArrayField, ImageField } from '@semapps/semantic-data-provider';
import { Typography, Avatar } from '@material-ui/core';
import { MapField } from '@semapps/geo-components';
import SocialNetworkArrayIcon from '../../components/SocialNetworkArrayIcon';
import UrlArrayField from '../../components/UrlArrayfield';

const PlaceTitle = ({ record }) => {
  return <span>{record ? record['pair:label'] : ''}</span>;
};

const PlaceShow = props => (
  <Show title={<PlaceTitle />} {...props}>
    <TabbedShowLayout value={2} >
      
      <Tab  label="A propos" icon={<Avatar alt="info" src="/icon_info.png" />}>
        <ColumnShowLayout>
          <Column xs={12} sm={8} showLabel>
            <Typography variant="h3" color="primary" component="h1" id="react-admin-title" />
            <TextField  variant="h5" source="pair:comment" addLabel={false}/>
            <MarkdownField  source="pair:description" addLabel addLabel={false}/>
            <ImageField source="image" />
          </Column>
          <Column xs={12} sm={4} showLabel>
            <MapField
                source="pair:hasPostalAddress"
                address={record => record['pair:hasPostalAddress'] && record['pair:hasPostalAddress']['pair:label']}
                latitude={record => record['pair:hasPostalAddress'] && record['pair:hasPostalAddress']['pair:latitude']}
                longitude={record => record['pair:hasPostalAddress'] && record['pair:hasPostalAddress']['pair:longitude']}
              />
              <UrlArrayField label="Liens Utiles" source="pair:homePage" addLabel/>              
              <SocialNetworkArrayIcon source="pair:aboutPage" />
          </Column>
        </ColumnShowLayout>
      </Tab>

      <Tab label="Communauté" icon={<Avatar alt="test avatar" src="/icon_members.png" />}>
      <Column xs={12} sm={12} showLabel>
        <UriArrayField label="Géré par" reference="Organization" source="pair:supportedBy">
          <SingleFieldList linkType="show">
            <ChipField source="pair:label" color="secondary" />
          </SingleFieldList>
        </UriArrayField>
      </Column>
      <Column xs={12} sm={12} showLabel>
        <UriArrayField label="Utilisé par" reference="Organization" source="pair:usedBy">
          <SingleFieldList linkType="show">
            <ChipField source="pair:label" color="secondary" />
          </SingleFieldList>
        </UriArrayField>
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