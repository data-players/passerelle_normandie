import React from 'react';
import { SingleFieldList, TextField, UrlField,useShowContext,ArrayField,useListContext,useRecordContext } from 'react-admin';
import { Column, ColumnShowLayout, Show, MarkdownField, AvatarField } from '@semapps/archipelago-layout';
import { ImageField, FilterHandler, ReferenceArrayField} from '@semapps/semantic-data-provider';
import { makeStyles, Button } from '@material-ui/core';
import { Link } from 'react-router-dom';
import ListIcon from '@material-ui/icons/List';
import MoreListLayout from '../../addons/MoreListLayout';

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



const MoreListLayoutSector = ({ limit,children,...otherProps }) => {
  const context = useListContext();
  const record = useRecordContext();
  console.log('context Sector',context);

  const to = {
    pathname: `../..${context.basePath}`,
    search: `filter=${JSON.stringify({ 'pair:hasSector': record.id })}`,
  }

  return <MoreListLayout limit={limit} to={to}>
    {context && React.Children.map(children, child =>
      child && React.cloneElement(child, {
        perPage:limit,
        ...otherProps,
      })
    )}
  </MoreListLayout>
}



const SectorShow = props => {
  const mainImageStyles = mainImage();

  return <Show title={<ProjectTitle />} {...props}>
    <ColumnShowLayout>
      <Column xs={12} sm={12} showLabel>
        <ImageField source="pair:banner" classes={mainImageStyles}/>
        <MarkdownField label="Description" source="pair:description" />
        <ReferenceArrayField perPage={5} reference="Project" source="pair:sectorOf" label="Projets" filter={{type: "pair:Project"}} >
          <MoreListLayoutSector limit={5}>
            <SingleFieldList linkType="show" >
              <AvatarField label={record => `${record['pair:label']}`} image="image" classes={{
                parent: {
                  width: '100px',
                  margin : '10px'
                }
              }}/>
            </SingleFieldList>
          </MoreListLayoutSector>
        </ReferenceArrayField>
        <ReferenceArrayField perPage={5} reference="Organization" source="pair:sectorOf" label="Organisations" filter={{type: "pair:Organization"}} >
          <MoreListLayoutSector limit={5}>
            <SingleFieldList linkType="show" >
              <AvatarField label={record => `${record['pair:label']}`} image="image" classes={{
                parent: {
                  width: '100px',
                  margin : '10px'
                }
              }}/>
            </SingleFieldList>
          </MoreListLayoutSector>
        </ReferenceArrayField>
        <ReferenceArrayField perPage={5} reference="Event" source="pair:sectorOf" label="Événements" filter={{type: "pair:Event"}} >
          <MoreListLayoutSector limit={5}>
            <SingleFieldList linkType="show" >
              <AvatarField label={record => `${record['pair:label']}`} image="image" classes={{
                parent: {
                  width: '100px',
                  margin : '10px'
                }
              }}/>
            </SingleFieldList>
          </MoreListLayoutSector>
        </ReferenceArrayField>



      </Column>
    </ColumnShowLayout>
  </Show>
}

export default SectorShow;
