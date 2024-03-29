import React from 'react';
import {
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
      <TextInput source="pair:e-mail" label="Email" type="email" fullWidth/>
      <TextInput source="pair:phone" label="Téléphone" fullWidth />
      <PairLocationInput label="Adresse" source="pair:hasLocation" fullWidth />
      <ImageInput source="image" label="logo" accept="image/*">
        <ImageField source="src"/>
      </ImageInput>
      <ImageInput source="pair:banner" label="Bannière" accept="image/*">
        <ImageField source="src"/>
      </ImageInput>
      <ReificationArrayInput source="pair:organizationOfMembership" reificationClass="pair:MembershipAssociation">
        <ReferenceInput reference="Person" source="pair:membershipActor">
          <AutocompleteInput
            optionText={record => record && `${record['pair:firstName']} ${record['pair:lastName']}`}
          />
        </ReferenceInput>
        <ReferenceInput label="Rôle" reference="MembershipRole" source="pair:membershipRole">
          <SelectInput optionText="pair:label" />
        </ReferenceInput>
      </ReificationArrayInput>
      <UriArrayInput label="Thématiques (cocher la ou les thématiques en lien avec l'organisation)" source="pair:hasSector" reference="Sector" fullWidth>
        <CheckboxGroupInput optionText="pair:label" allowEmpty />
      </UriArrayInput>
    </SimpleForm>
  </Edit>);
}

export default OrganizationEdit;
