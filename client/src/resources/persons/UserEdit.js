import React from 'react';
import { AutocompleteArrayInput, SimpleForm, TextInput, ImageInput, ReferenceInput, SelectInput, AutocompleteInput } from 'react-admin';
import { Edit } from '@semapps/archipelago-layout';
import { UriArrayInput, ImageField,ReificationArrayInput } from '@semapps/semantic-data-provider';
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
      <ReificationArrayInput source="pair:actorOfMembership" reificationClass="pair:MembershipAssociation">
        <ReferenceInput reference="Organization" source="pair:membershipOrganization">
          <AutocompleteInput
            optionText="pair:label"
          />
        </ReferenceInput>
        <ReferenceInput reference="MembershipRole" source="pair:membershipRole">
          <SelectInput optionText="pair:label" />
        </ReferenceInput>
      </ReificationArrayInput>
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
