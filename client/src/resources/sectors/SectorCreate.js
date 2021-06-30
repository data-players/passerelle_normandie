import React from 'react';
import { SimpleForm, TextInput } from 'react-admin';
import { Create } from '@semapps/archipelago-layout';

const SectorCreate = props => (
  <Create {...props}>
    <SimpleForm>
      <TextInput source="pair:label" label="Nom" fullWidth />
    </SimpleForm>
  </Create>
);

export default SectorCreate;
