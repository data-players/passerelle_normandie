import React from 'react';
import { AutocompleteArrayInput, SimpleForm, TextInput, CheckboxGroupInput, BooleanInput, ImageInput, SimpleFormIterator, ArrayInput } from 'react-admin';
import MarkdownInput from 'ra-input-markdown';
import { Edit } from '@semapps/archipelago-layout';
import { UriArrayInput, ImageField } from '@semapps/semantic-data-provider';
import ProjectTitle from './ProjectTitle';


const ProjectEdit = props => (
  <Edit title={<ProjectTitle/>} {...props}>
    <SimpleForm redirect="show">
      <TextInput source="pair:label" label="Nom" fullWidth />
      <TextInput source="pair:comment" label="Courte description" fullWidth />
      <MarkdownInput multiline source="pair:description" label="Description" fullWidth />
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
      <UriArrayInput label="Géré par" reference="Organization" source="pair:managedBy">
        <AutocompleteArrayInput optionText="pair:label" shouldRenderSuggestions={value => value.length > 1} fullWidth />
      </UriArrayInput>
      <ImageInput source="image" label="logo" accept="image/*">
        <ImageField source="src"/>
      </ImageInput>
      <UriArrayInput label="Responsables" reference="Person" source="pair:hasResponsible">
        <AutocompleteArrayInput
          optionText={record => record && `${record['pair:firstName']} ${record['pair:lastName']}`}
          shouldRenderSuggestions={value => value.length > 1}
          fullWidth
        />
      </UriArrayInput>
      <UriArrayInput label="Participants" reference="Person" source="pair:involves">
        <AutocompleteArrayInput
          optionText={record => record && `${record['pair:firstName']} ${record['pair:lastName']}`}
          shouldRenderSuggestions={value => value.length > 1}
          fullWidth
        />
      </UriArrayInput>
      <BooleanInput source='pair:hasStatut' label='En vedette' allowEmpty />
      <UriArrayInput label="Sectors" source="pair:hasSector" reference="Sector" fullWidth>
        <CheckboxGroupInput optionText="pair:label" allowEmpty />
      </UriArrayInput>
    </SimpleForm>
  </Edit>
);

export default ProjectEdit;