import React, { useContext } from 'react';
import {
  AutocompleteArrayInput,
  SelectArrayInput,
  SimpleForm,
  TextInput,
  ImageInput,
  ReferenceInput,
  SelectInput,
  CheckboxGroupInput,
  FormDataConsumer,
  ReferenceArrayInput
} from 'react-admin';
import MarkdownInput from 'ra-input-markdown';
import {Edit} from '@semapps/archipelago-layout';
import {UriArrayInput, ImageField} from '@semapps/semantic-data-provider';
import  PairLocationInput from '../../components/PairLocationInput';

// import { UniversContext } from './../../App.js';
// import { ContextUnivers} from './../../univers';

const UniversTemplate = ({ record }) => {
  return <span>{record['pair:hasBranch']}</span>;
};

export const OrganizationEdit = (props) =>{
  return (<Edit {...props}>
    <SimpleForm redirect="show">
      <TextInput source="pair:label" label="Nom"/>
      <TextInput source="pair:comment" label="Courte description" fullWidth/>
      <MarkdownInput multiline="multiline" source="pair:description" label="Description" fullWidth/>
      <TextInput source="pair:homePage" label="Site web" fullWidth/>
      <TextInput source="pair:e-mail" label="email" type="email" fullWidth/>
      <TextInput source="pair:phone" label="téléphone" fullWidth />
      // <TextInput source="schema:address" label="adresse" fullWidth/>
      <PairLocationInput label="Adresse" source="pair:hasLocation" fullWidth />
      <ImageInput source="image" label="Logo" accept="image/*">
        <ImageField source="src"/>
      </ImageInput>
      <UriArrayInput label="Membres" reference="User" source="pair:hasMember">
        <AutocompleteArrayInput optionText={record => record && `${record['pair:firstName']} ${record['pair:lastName']}`} shouldRenderSuggestions={value => value.length > 1} fullWidth/>
      </UriArrayInput>
      <UriArrayInput label="Lieux" reference="Place" source="pair:supports">
        <AutocompleteArrayInput shouldRenderSuggestions={value => value.length > 1} optionText="pair:label" fullWidth/>
      </UriArrayInput>

      <UriArrayInput label="Branches" source="pair:hasBranch" reference="Branch" fullWidth>
        <CheckboxGroupInput optionText="pair:label" allowEmpty />
      </UriArrayInput>
    </SimpleForm>
  </Edit>);
}

export default OrganizationEdit;
