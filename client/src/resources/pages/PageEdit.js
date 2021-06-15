import React from 'react';
import { SimpleForm, TextInput } from 'react-admin';
import { Edit } from '@semapps/archipelago-layout';
import MarkdownInput from '../../markdown/MarkdownInput'
import PageTitle from './PageTitle';

export const PageEdit = props => (
  <Edit title={<PageTitle />} {...props}>
    <SimpleForm redirect="show">
      <TextInput source="pair:title" fullWidth />
      <MarkdownInput multiline source="pair:content" fullWidth />
    </SimpleForm>
  </Edit>
);

export default PageEdit;
