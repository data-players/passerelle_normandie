import React from 'react';
import { SingleFieldList,  } from 'react-admin';
import { Column, ColumnShowLayout, Show, MarkdownField, AvatarField } from '@semapps/archipelago-layout';
import { ImageField, ReferenceArrayField,  } from '@semapps/semantic-data-provider';
import { makeStyles } from '@material-ui/core';

const ProjectTitle = ({ record }) => {
  return <span>{record ? record['pair:label'] : ''}</span>;
};

const mainImage = makeStyles({
  image: {
    objectFit: 'cover',
    width: '100%',
    maxHeight :'20em'
  }
});

const SectorShow = props => {
  const mainImageStyles = mainImage();

  return <Show title={<ProjectTitle />} {...props}>
    <ColumnShowLayout>
      <Column xs={12} sm={12} showLabel>
      <ImageField source="image" classes={mainImageStyles}/>
          <MarkdownField label="Description" source="pair:description" addLabel />
          <ReferenceArrayField perPage={5} label="Projets" reference="Project" source="pair:sectorOf" filter={{type: "pair:Project"}} addLabel >
            <SingleFieldList linkType="show" >
              <AvatarField label={record => `${record['pair:label']}`} image="image" classes={{
                parent: {
                  width: '100px',
                  margin : '10px'
                }
              }}/>       
            </SingleFieldList>
          </ReferenceArrayField>
        
          <ReferenceArrayField label="Organisations" perPage={5} reference="Organization" source="pair:sectorOf" filter={{type: "pair:Organization"}} addLabel>
            <SingleFieldList linkType="show" >
                <AvatarField label={record => `${record['pair:label']}`} image="image" classes={{
                parent: {
                  width: '100px',
                  margin : '10px'
                }
              }}/>   
            </SingleFieldList>
          </ReferenceArrayField>
          <ReferenceArrayField perPage={5} label="Evenement"  reference="Event" source="pair:sectorOf" filter={{type: "pair:Event"}} addLabel>
            <SingleFieldList linkType="show" >
                <AvatarField label={record => `${record['pair:label']}`} image="image" classes={{
                parent: {
                  width: '100px',
                  margin : '10px'
                }
              }}/>   
            </SingleFieldList>
          </ReferenceArrayField>
      </Column>
    </ColumnShowLayout>
  </Show>
}

export default SectorShow;
