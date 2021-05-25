import React, { useContext } from 'react';
import {
  AutocompleteArrayInput,
  ArrayInput,
  SimpleForm,
  TextInput,
  ImageInput,
  ReferenceInput,
  SelectInput,
  CheckboxGroupInput,
  AutocompleteInput,
  SimpleFormIterator,
} from 'react-admin';
import MarkdownInput from 'ra-input-markdown';
import {Edit} from '@semapps/archipelago-layout';
import {UriArrayInput, ImageField,ReificationArrayInput} from '@semapps/semantic-data-provider';
import  PairLocationInput from '../../components/PairLocationInput';
import OrganizationTitle from './OrganizationTitle';

// import { UniversContext } from './../../App.js';
// import { ContextUnivers} from './../../univers';

const UniversTemplate = ({ record }) => {
  return <span>{record['pair:hasBranch']}</span>;
};

export const OrganizationEdit = (props) =>{
  return (
  <Edit title={<OrganizationTitle />} {...props}>
    <SimpleForm redirect="show">
      <TextInput source="pair:label" label="Nom"/>
      <TextInput source="pair:comment" label="Courte description" fullWidth/>
      <MarkdownInput multiline="multiline" source="pair:description" label="Description" fullWidth/>
      <ArrayInput label="liens" source="pair:homePage" >
        <SimpleFormIterator>
          <TextInput label="" fullWidth />
        </SimpleFormIterator>
      </ArrayInput>      
      <TextInput source="pair:video" label="Video url" fullWidth/>
      <TextInput source="pair:e-mail" label="email" type="email" fullWidth/>
      <TextInput source="pair:phone" label="téléphone" fullWidth />
      <PairLocationInput label="Adresse" source="pair:hasLocation" fullWidth />
      <ImageInput source="image" label="Logo" accept="image/*">
        <ImageField source="src"/>
      </ImageInput>
      <ReificationArrayInput source="pair:organizationOfMembership" reificationClass="pair:MembershipAssociation">
        <ReferenceInput reference="User" source="pair:membershipActor">
          <AutocompleteInput
            optionText={record => record && `${record['pair:firstName']} ${record['pair:lastName']}`}
          />
        </ReferenceInput>
        <ReferenceInput reference="MembershipRole" source="pair:membershipRole">
          <SelectInput optionText="pair:label" />
        </ReferenceInput>
      </ReificationArrayInput>
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
