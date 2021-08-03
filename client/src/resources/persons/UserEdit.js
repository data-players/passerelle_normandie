import React from 'react';
import { AutocompleteArrayInput, SimpleForm, TextInput, ImageInput, ReferenceInput, SelectInput, AutocompleteInput, ArrayInput, SimpleFormIterator, CheckboxGroupInput } from 'react-admin';
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
      <TextInput source="pair:phone" label="Téléphone" fullWidth />
      <TextInput source="pair:comment" label="Présentation (quelques mots sur toi pour te présenter aux autres membres)" fullWidth />
      <PairLocationInput label="Adresse (tu peux renseigner ton adresse complète ou seulement ta commune)" source="pair:hasLocation" fullWidth />
      <ImageInput source="image" label="Photo" accept="image/*">
        <ImageField source="src" />
      </ImageInput>
      <ArrayInput label="Liens utiles (ex : ton blog, le site de ton entreprise, etc.)" source="pair:homePage" >
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
      <UriArrayInput label="Projets auxquels je participe" reference="Project" source="pair:involvedIn">
        <AutocompleteArrayInput shouldRenderSuggestions={value => value.length > 1} optionText="pair:label" fullWidth />
      </UriArrayInput>
      <ReificationArrayInput source="pair:actorOfMembership" label="Mes Organisations" reificationClass="pair:MembershipAssociation">
        <ReferenceInput reference="Organization" source="pair:membershipOrganization">
          <AutocompleteInput
            optionText="pair:label"
          />
        </ReferenceInput>
        <ReferenceInput reference="MembershipRole" label="Rôle" source="pair:membershipRole">
          <SelectInput optionText="pair:label" />
        </ReferenceInput>
      </ReificationArrayInput>
      <UriArrayInput label="Compétences" reference="Skill" source="pair:offers">
        <AutocompleteArrayInput shouldRenderSuggestions={value => value.length > 1} optionText="pair:label" fullWidth />
      </UriArrayInput>
      <UriArrayInput label="Intérêts" reference="Interest" source="pair:hasTopic">
        <AutocompleteArrayInput shouldRenderSuggestions={value => value.length > 1} optionText="pair:label" fullWidth />
      </UriArrayInput>
      <UriArrayInput label="Thématiques (cocher la ou les thématiques qui vous correspondent)" source="pair:hasSector" reference="Sector" fullWidth>
        <CheckboxGroupInput optionText="pair:label" allowEmpty />
      </UriArrayInput>
    </SimpleForm>
  </Edit>
);

export default UserEdit;
