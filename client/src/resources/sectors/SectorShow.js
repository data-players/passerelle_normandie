import React from 'react';
import { SingleFieldList, TextField, UrlField,  } from 'react-admin';
import { Column, ColumnShowLayout, Show, MarkdownField, AvatarField } from '@semapps/archipelago-layout';
import { ImageField, ReferenceArrayField,  } from '@semapps/semantic-data-provider';
import { makeStyles, Button } from '@material-ui/core';
import { Link } from 'react-router-dom';

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

const MoreButton = ({record, source, type, more }) => {
  var allItem = typeof(record[source]) === "string" ? [record[source]] : record[source]
  var cnt = 0
  for (var i=0; i < allItem.length ;i++) {
    if (allItem[i].includes(type)) {
      cnt++
    }
  }

  if (cnt > 5) {
    return <Button component={Link} to={more}>More...</Button>
  }
  return <> </>
}

const SectorShow = props => {
  const mainImageStyles = mainImage();

  return <Show title={<ProjectTitle />} {...props}>
    <ColumnShowLayout>
      <Column xs={12} sm={12} showLabel>
      <ImageField source="pair:banner" classes={mainImageStyles}/>
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
          <MoreButton source="pair:sectorOf" type="project" more={{
                      pathname: '../../Project'
                  }}/>
        
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
          <MoreButton source="pair:sectorOf" type="organizations" more={{
                      pathname: '../../Organization'
                  }}/>

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
          <MoreButton source="pair:sectorOf" type="events"more={{
                      pathname: '../../Event'
                  }}/>

      </Column>
    </ColumnShowLayout>
  </Show>
}

export default SectorShow;
