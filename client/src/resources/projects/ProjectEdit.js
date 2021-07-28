import React from 'react';
import { AutocompleteArrayInput, SimpleForm, TextInput, CheckboxGroupInput, BooleanInput, ImageInput, SimpleFormIterator, ArrayInput } from 'react-admin';
import MarkdownInput from 'ra-input-markdown';
import { Edit } from '@semapps/archipelago-layout';
import { UriArrayInput, ImageField } from '@semapps/semantic-data-provider';
import ProjectTitle from './ProjectTitle';
import PairLocationInput from '../../components/PairLocationInput';


const ProjectEdit = props => (
  <Edit title={<ProjectTitle/>} {...props}>
    <SimpleForm redirect="show">
      <TextInput source="pair:label" label="Nom" fullWidth />
      <TextInput source="pair:comment" label="Courte description" fullWidth />
      <MarkdownInput multiline source="pair:description" label="Description" fullWidth />
      <TextInput source="pair:e-mail" label="Email" type="email" fullWidth/>
      <PairLocationInput label="Localisation du projet (adresse complète, commune ou code postal)" source="pair:hasLocation" fullWidth />
      <ImageInput source="image" label="Bannière" accept="image/*">
        <ImageField source="src"/>
      </ImageInput>
      <ImageInput source="passerelle:logo" label="Logo" accept="image/*">
        <ImageField source="src"/>
      </ImageInput>
      <ArrayInput source="pair:homePage" >
        <SimpleFormIterator>
          <TextInput label="" fullWidth />
        </SimpleFormIterator>
      </ArrayInput>
      <ArrayInput source="pair:aboutPage" >
        <SimpleFormIterator>
          <TextInput label="" fullWidth />
        </SimpleFormIterator>
      </ArrayInput>      
      <TextInput source="pair:video" label="Video url" fullWidth/>
      <UriArrayInput label="Organisation(s) porteuse(s) du projet" reference="Organization" source="pair:managedBy">
        <AutocompleteArrayInput optionText="pair:label" shouldRenderSuggestions={value => value.length > 1} fullWidth />
      </UriArrayInput>
      <UriArrayInput label="Personne(s) coordonnant le projet" reference="Person" source="pair:hasResponsible">
        <AutocompleteArrayInput
          optionText={record => record && `${record['pair:firstName']} ${record['pair:lastName']}`}
          shouldRenderSuggestions={value => value.length > 1}
          fullWidth
        />
      </UriArrayInput>
      <UriArrayInput label="Personne(s) impliquée(s) dans le projet" reference="Person" source="pair:involves">
        <AutocompleteArrayInput
          optionText={record => record && `${record['pair:firstName']} ${record['pair:lastName']}`}
          shouldRenderSuggestions={value => value.length > 1}
          fullWidth
        />
      </UriArrayInput>
      <BooleanInput source='pair:hasStatut' label="En vedette (afficher ce projet sur la page d'accueil de la plateforme)" allowEmpty />
      <UriArrayInput label="Thématiques (cocher la ou les thématiques en lien avec le projet)" source="pair:hasSector" reference="Sector" fullWidth>
        <CheckboxGroupInput optionText="pair:label" allowEmpty />
      </UriArrayInput>
    </SimpleForm>
  </Edit>
);

export default ProjectEdit;