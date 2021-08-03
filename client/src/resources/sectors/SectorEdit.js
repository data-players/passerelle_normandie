import React from 'react';
import { SimpleForm, TextInput, ImageInput } from 'react-admin';
import MarkdownInput from 'ra-input-markdown';
import { Edit } from '@semapps/archipelago-layout';
import SectorTitle from './SectorTitle';
import { ImageField } from '@semapps/semantic-data-provider';

export const SectorEdit = (props) =>{
  return (
    <Edit title={<SectorTitle/>} {...props}>
      <SimpleForm redirect="show">
        <TextInput source="pair:label" label="Nom" fullWidth />
        <MarkdownInput multiline source="pair:description" label="Description" fullWidth />
        <ImageInput source="image" label="logo" accept="image/*">
          <ImageField source="src"/>
        </ImageInput>
        <ImageInput source="pair:banner" label="Bannière" accept="image/*">
          <ImageField source="src"/>
        </ImageInput>
      </SimpleForm>
    </Edit>
  );
}

export default SectorEdit;
