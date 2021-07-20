import React from 'react';
import { AutocompleteArrayInput, SimpleForm, TextInput, CheckboxGroupInput, ArrayInput, SimpleFormIterator, ImageInput, ImageField } from 'react-admin';
import MarkdownInput from 'ra-input-markdown';
import frLocale from 'date-fns/locale/fr';
import { Edit } from '@semapps/archipelago-layout';
import { DateTimeInput } from '@semapps/date-components';
import { UriArrayInput } from '@semapps/semantic-data-provider';
import EventTitle from './EventTitle';
import PairLocationInput from '../../components/PairLocationInput';

const EventEdit = props => (
  <Edit title={<EventTitle/>} {...props}>
    <SimpleForm redirect="show">
      <TextInput source="pair:label" label="Nom" fullWidth />
      <TextInput source="pair:comment" label="Courte description" fullWidth />
      <MarkdownInput multiline source="pair:description" label="Description" fullWidth />
      <TextInput source="pair:homePage" label="Site web" fullWidth />
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
      <PairLocationInput label="Adresse" source="pair:hasLocation" fullWidth />
      <TextInput source="pair:video" label="Video url" fullWidth/>
      <ImageInput source="image" label="Image" accept="image/*">
        <ImageField source="src"/>
      </ImageInput>
      <DateTimeInput
          source="pair:startDate"
          options={{
            format: 'dd/MM/yyyy à HH:mm',
            ampm: false
          }}
          providerOptions={{
            locale: frLocale
          }}
          fullWidth
        />
        <DateTimeInput
          source="pair:endDate"
          options={{
            format: 'dd/MM/yyyy à HH:mm',
            ampm: false
          }}
          providerOptions={{
            locale: frLocale
          }}
          fullWidth
        />
      <UriArrayInput label="Proposé par" reference="Organization" source="pair:deliveredBy">
        <AutocompleteArrayInput shouldRenderSuggestions={value => value.length > 1} optionText="pair:label" fullWidth />
      </UriArrayInput>
      <UriArrayInput label="Participant" reference="Person" source="pair:involvedIn">
        <AutocompleteArrayInput shouldRenderSuggestions={value => value.length > 1} optionText={record => record && `${record['pair:firstName']} ${record['pair:lastName']}`} fullWidth/>
      </UriArrayInput>
      <UriArrayInput label="Sectors" source="pair:hasSector" reference="Sector" fullWidth>
        <CheckboxGroupInput optionText="pair:label" allowEmpty />
      </UriArrayInput>
    </SimpleForm>
  </Edit>
);

export default EventEdit;
