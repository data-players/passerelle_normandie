import React from 'react';
import { SimpleForm, TextInput } from 'react-admin';
import { Edit } from '@semapps/archipelago-layout';
import SkillTitle from './SkillTitle'

export const SkillEdit = props => (
  <Edit title={<SkillTitle/>} {...props}>
    <SimpleForm>
      <TextInput source="pair:label" label="Titre" fullWidth />
    </SimpleForm>
  </Edit>
);

export default SkillEdit;
