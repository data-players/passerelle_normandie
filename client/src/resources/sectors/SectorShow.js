import React from 'react';
import { SingleFieldList, TextField, UrlField,  } from 'react-admin';
import { Column, ColumnShowLayout, Show, MarkdownField, AvatarField } from '@semapps/archipelago-layout';
import { ImageField, ReferenceArrayField,  } from '@semapps/semantic-data-provider';
import { makeStyles, Button } from '@material-ui/core';
import { Link } from 'react-router-dom';
import ListIcon from '@material-ui/icons/List';
import MoreLayout from '../../addons/moreLayout';

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

const columnMore = makeStyles({
  root: {
    backgroundColor: 'red',
  }
});


const MoreButton = ({record, source, type, more, path, triggerLength }) => {
  if(Array.isArray(record[source]) && record[source].filter(p=>p.includes(type)).length > triggerLength){
    let to={
      pathname: `../../${path}`,
      search: `filter=${JSON.stringify({ 'pair:hasSector': record.id })}`,
    }
    return <Button component={Link}
          to={to}
          size="large"
          color="primary"
          variant="contained"
          >
            <ListIcon/>
      </Button>
  } else {
    return <> </>
  }
}

const SectorShow = props => {
  const mainImageStyles = mainImage();
  const columnMoreStyles = columnMore();

  console.log('RRRRRRRRRR');

  return <Show title={<ProjectTitle />} {...props}>
    <ColumnShowLayout>
      <Column xs={12} sm={12} showLabel>
        <ImageField source="pair:banner" classes={mainImageStyles}/>
        <MarkdownField label="Description" source="pair:description" addLabel />
            <MoreLayout source="pair:sectorOf" limit="5" more={{
                pathname: './Project'
            }} label="Projets" addLabel filter={{type: "pair:Project"}}>
            <ReferenceArrayField perPage={5} reference="Project" source="pair:sectorOf" filter={{type: "pair:Project"}} >
              <SingleFieldList linkType="show" >
                <AvatarField label={record => `${record['pair:label']}`} image="image" classes={{
                  parent: {
                    width: '100px',
                    margin : '10px'
                  }
                }}/>
              </SingleFieldList>
            </ReferenceArrayField>
            </MoreLayout>
            <MoreLayout source="pair:sectorOf" limit="5" more={{
                pathname: './Organization'
            }} label="Organisations" addLabel filter={{type: "pair:Organization"}}>
              <ReferenceArrayField  perPage={5} reference="Organization" source="pair:sectorOf" filter={{type: "pair:Organization"}} >
                <SingleFieldList linkType="show">
                    <AvatarField label={record => `${record['pair:label']}`} image="image" classes={{
                    parent: {
                      width: '100px',
                      margin : '10px'
                    }
                  }}/>
                </SingleFieldList>
              </ReferenceArrayField>
            </MoreLayout>




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
        <MoreButton source="pair:sectorOf" type="events" path="Event" triggerLength={5}/>

      </Column>
    </ColumnShowLayout>
  </Show>
}

export default SectorShow;
