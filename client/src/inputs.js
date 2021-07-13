import React from 'react';
import { ReferenceArrayInput } from '@semapps/semantic-data-provider';
import { AutocompleteArrayInput } from 'react-admin';

export const StatusInput = ({ label, source }) => (
    <ReferenceArrayInput label={label} reference="Status" source={source}>
      <AutocompleteArrayInput optionText="pair:label" fullWidth />
    </ReferenceArrayInput>
  );