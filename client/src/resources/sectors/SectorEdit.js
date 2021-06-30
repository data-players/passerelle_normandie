import React from 'react';
import { SimpleForm, TextInput, } from 'react-admin';
import MarkdownInput from 'ra-input-markdown';
import { Edit } from '@semapps/archipelago-layout';
import SectorTitle from './SectorTitle';

export const SectorEdit = (props) =>{
  return (
    <Edit title={<SectorTitle/>} {...props}>
      <SimpleForm redirect="show">
        <TextInput source="pair:label" label="Nom" fullWidth />
        <TextInput source="pair:comment" label="Courte description" fullWidth />
        <MarkdownInput multiline source="pair:description" label="Description" fullWidth />
      </SimpleForm>
    </Edit>
  );
}

export default SectorEdit;
