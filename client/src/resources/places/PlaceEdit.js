import React from 'react';
import { AutocompleteArrayInput, SimpleForm, TextInput, DateTimeInput,ImageInput,CheckboxGroupInput } from 'react-admin';
import MarkdownInput from 'ra-input-markdown';
import { Edit } from '@semapps/archipelago-layout';
import { UriArrayInput } from '@semapps/semantic-data-provider';
import  PairLocationInput from '../../components/PairLocationInput';

const PlaceEdit = props => (
  <Edit {...props}>
    <SimpleForm redirect="show">
      <TextInput source="pair:label" label="Nom" fullWidth />
      <TextInput source="pair:comment" label="Courte description" fullWidth />
      <MarkdownInput multiline source="pair:description" label="Description" fullWidth />
      <PairLocationInput label="Adresse" source="pair:hasLocation" fullWidth />
      <UriArrayInput label="Géré par" reference="Organization" source="pair:supportedBy">
        <AutocompleteArrayInput shouldRenderSuggestions={value => value.length > 1} optionText="pair:label" fullWidth />
      </UriArrayInput>
      <UriArrayInput label="Branches" source="pair:hasBranch" reference="Branch" fullWidth>
        <CheckboxGroupInput optionText="pair:label" allowEmpty />
      </UriArrayInput>
    </SimpleForm>
  </Edit>
);

export default PlaceEdit;
