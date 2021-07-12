import React from 'react';
import { AutocompleteArrayInput, SimpleForm, TextInput, CheckboxGroupInput } from 'react-admin';
import MarkdownInput from 'ra-input-markdown';
import frLocale from 'date-fns/locale/fr';
import { Edit } from '@semapps/archipelago-layout';
import { DateTimeInput } from '@semapps/date-components';
import { UriArrayInput } from '@semapps/semantic-data-provider';
import EventTitle from './EventTitle';

const EventEdit = props => (
  <Edit title={<EventTitle/>} {...props}>
    <SimpleForm redirect="show">
      <TextInput source="pair:label" label="Nom" fullWidth />
      <TextInput source="pair:comment" label="Courte description" fullWidth />
      <MarkdownInput multiline source="pair:description" label="Description" fullWidth />
      <TextInput source="pair:homePage" label="Site web" fullWidth />
      <TextInput source="pair:aboutPage" label="Réseaux sociaux" fullWidth />
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
      <UriArrayInput label="Participant" reference="User" source="pair:involvedIn">
        <AutocompleteArrayInput shouldRenderSuggestions={value => value.length > 1} optionText="pair:label" fullWidth/>
      </UriArrayInput>
      <UriArrayInput label="lieux" reference="Place" source="pair:hasLocation">
        <AutocompleteArrayInput shouldRenderSuggestions={value => value.length > 1} optionText="pair:label" fullWidth />
      </UriArrayInput>
      <UriArrayInput label="Sectors" source="pair:hasSector" reference="Sector" fullWidth>
        <CheckboxGroupInput optionText="pair:label" allowEmpty />
      </UriArrayInput>
    </SimpleForm>
  </Edit>
);

export default EventEdit;
