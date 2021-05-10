import React from 'react';
import { SimpleForm, TextInput } from 'react-admin';
import { Edit } from '@semapps/archipelago-layout';
import BranchTitle from './BranchTitle';

export const InterestEdit = props => (
  <Edit title={<BranchTitle/>} {...props}>
    <SimpleForm>
      <TextInput source="pair:label" label="Titre" fullWidth />
    </SimpleForm>
  </Edit>
);

export default InterestEdit;
