import React from 'react';
import { SimpleForm, TextInput } from 'react-admin';
import { Edit } from '@semapps/archipelago-layout';
import InterestTitle from './InterestTitle'

export const InterestEdit = props => (
  <Edit title={<InterestTitle/>} {...props}>
    <SimpleForm>
      <TextInput source="pair:label" label="Titre" fullWidth />
    </SimpleForm>
  </Edit>
);

export default InterestEdit;
