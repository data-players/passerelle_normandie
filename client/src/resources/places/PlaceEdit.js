import React from 'react';
import { AutocompleteArrayInput, SimpleForm, TextInput, CheckboxGroupInput, ArrayInput, SimpleFormIterator, ImageInput,  } from 'react-admin';
import MarkdownInput from 'ra-input-markdown';
import { Edit } from '@semapps/archipelago-layout';
import { UriArrayInput, ImageField } from '@semapps/semantic-data-provider';
import  PlaceLocationInput from '../../components/PlaceLocationInput';
import PlaceTitle from './PlaceTitle';

export const PlaceEdit = (props) =>{
  return (
    <Edit title={<PlaceTitle/>} {...props}>
      <SimpleForm redirect="show">
        <TextInput source="pair:label" label="Nom" fullWidth />
        <TextInput source="pair:comment" label="Courte description" fullWidth />
        <MarkdownInput multiline source="pair:description" label="Description" fullWidth />
        <ImageInput source="image" label="photo" accept="image/*">
          <ImageField source="src"/>
        </ImageInput>
        <ArrayInput source="pair:homePage" >
          <SimpleFormIterator>
            <TextInput label="" fullWidth />
          </SimpleFormIterator>
        </ArrayInput>
        <ArrayInput label="liens" source="pair:homePage" >
          <SimpleFormIterator>
            <TextInput label="" fullWidth />
          </SimpleFormIterator>
        </ArrayInput>
        <ArrayInput source="pair:aboutPage" >
          <SimpleFormIterator>
            <TextInput label="" fullWidth />
          </SimpleFormIterator>
        </ArrayInput>
        <PlaceLocationInput source="pair:hasLocation" fullWidth />
        <UriArrayInput label="Géré par" reference="Organization" source="pair:supportedBy">
          <AutocompleteArrayInput shouldRenderSuggestions={value => value.length > 1} optionText="pair:label" fullWidth />
        </UriArrayInput>
        <UriArrayInput label="Sectors" source="pair:hasSector" reference="Sector" fullWidth>
          <CheckboxGroupInput optionText="pair:label" allowEmpty />
        </UriArrayInput>
      </SimpleForm>
    </Edit>
  );
}

export default PlaceEdit;
