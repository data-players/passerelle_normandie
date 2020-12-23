import React, { useContext } from 'react';
import {
  AutocompleteArrayInput,
  SimpleForm,
  TextInput,
  ImageInput,
  ReferenceInput,
  SelectInput,
  CheckboxGroupInput,
  FormDataConsumer
} from 'react-admin';
import MarkdownInput from 'ra-input-markdown';
import {Edit} from '@semapps/archipelago-layout';
import {UriArrayInput, ImageField} from '@semapps/semantic-data-provider';

// import { UniversContext } from './../../App.js';
import { ContextUnivers} from './../../univers';

const UniversTemplate = ({ record }) => {
  return <span>{record['pair:hasBranch']}</span>;
};

export const OrganizationEdit = (props) =>{
  const universContext = useContext(ContextUnivers);
  return (<Edit {...props}>
    <SimpleForm redirect="show">
      <span>{universContext && universContext.state} </span>
      <TextInput source="pair:label" label="Nom"/>
      <TextInput source="pair:comment" label="Courte description" fullWidth/>
      <MarkdownInput multiline="multiline" source="pair:description" label="Description" fullWidth/>
      <TextInput source="pair:homePage" label="Site web" fullWidth/>
      <TextInput source="pair:e-mail" label="email" type="email" fullWidth/>
      <TextInput source="schema:address" label="adresse" fullWidth/>
      <ImageInput source="image" label="Logo" accept="image/*">
        <ImageField source="src"/>
      </ImageInput>
      <UriArrayInput label="Membres" reference="User" source="pair:hasMember">
        <AutocompleteArrayInput optionText={record => record && `${record['pair:firstName']} ${record['pair:lastName']}`} shouldRenderSuggestions={value => value.length > 1} fullWidth/>
      </UriArrayInput>
      <UriArrayInput label="Lieux" reference="Place" source="pair:supports">
        <AutocompleteArrayInput shouldRenderSuggestions={value => value.length > 1} optionText="pair:label" fullWidth/>
      </UriArrayInput>
      <UriArrayInput label="Branches" source="pair:hasBranch" reference="Branch" fullWidth>
        <CheckboxGroupInput optionText="pair:label" allowEmpty />
      </UriArrayInput>
      <FormDataConsumer>
          {({ formData, ...rest }) =>{
            const formDataArray = Array.isArray(formData['pair:hasBranch'])?formData['pair:hasBranch']:[formData['pair:hasBranch']];
          // console.log(formData['pair:hasBranch']);
            if(formData['pair:hasBranch'] && formDataArray.find(b=>b.includes('/agriculture'))){
                return(
                  <span>AGRI</span>
                )
              }
          }}
      </FormDataConsumer>
      <FormDataConsumer>
          {({ formData, ...rest }) =>{
            const formDataArray = Array.isArray(formData['pair:hasBranch'])?formData['pair:hasBranch']:[formData['pair:hasBranch']];
              if(formData['pair:hasBranch'] && formDataArray.find(b=>b.includes('/sante'))){
                return(
                  <span>SANTE</span>
                )
              }
          }}
      </FormDataConsumer>
      <FormDataConsumer>
          {({ formData, ...rest }) =>{
            const formDataArray = Array.isArray(formData['pair:hasBranch'])?formData['pair:hasBranch']:[formData['pair:hasBranch']];
              if(formData['pair:hasBranch'] && formDataArray.find(b=>b.includes('/tiers-lieux'))){
                return(
                  <span>TIERS LIEUX</span>
                )
              }
          }}
      </FormDataConsumer>



    </SimpleForm>
  </Edit>);
}

export default OrganizationEdit;
