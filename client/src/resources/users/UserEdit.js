import React from 'react';
import { AutocompleteArrayInput, SimpleForm, TextInput, ImageInput } from 'react-admin';
import { Edit } from '@semapps/archipelago-layout';
import { UriArrayInput, ImageField } from '@semapps/semantic-data-provider';
import  PairLocationInput from '../../components/PairLocationInput';
import UserTitle from './UserTitle';

export const UserEdit = props => (
  <Edit title={<UserTitle />} {...props}>
    <SimpleForm redirect="show">
      <TextInput source="pair:firstName" label="Prénom" fullWidth />
      <TextInput source="pair:lastName" label="Nom de famille" fullWidth />
      <TextInput source="foaf:email" label="email" fullWidth />
      <TextInput source="pair:phone" label="téléphone" fullWidth />
      <PairLocationInput label="Adresse" source="pair:hasLocation" fullWidth />
      <ImageInput source="image" label="image" accept="image/*">
        <ImageField source="src" />
      </ImageInput>
      <UriArrayInput label="Participe à" reference="Project" source="pair:involvedIn">
        <AutocompleteArrayInput shouldRenderSuggestions={value => value.length > 1} optionText="pair:label" fullWidth />
      </UriArrayInput>
      <UriArrayInput label="Membre de" reference="Organization" source="pair:memberOf">
        <AutocompleteArrayInput shouldRenderSuggestions={value => value.length > 1} optionText="pair:label" fullWidth />
      </UriArrayInput>
      <UriArrayInput label="Compétences" reference="Skill" source="pair:offers">
        <AutocompleteArrayInput shouldRenderSuggestions={value => value.length > 1} optionText="pair:label" fullWidth />
      </UriArrayInput>
      <UriArrayInput label="Intérêts" reference="Interest" source="pair:hasTopic">
        <AutocompleteArrayInput shouldRenderSuggestions={value => value.length > 1} optionText="pair:label" fullWidth />
      </UriArrayInput>
    </SimpleForm>
  </Edit>
);

export default UserEdit;
