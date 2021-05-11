import React, {useState,useEffect, useRef} from 'react';
import { useShowContext, TextField, UrlField, SingleFieldList, ChipField, ArrayField,Datagrid,TabbedShowLayout, Tab, FileField} from 'react-admin';
import { Column, ColumnShowLayout, Hero, GridList, Show, MarkdownField, AvatarField, RightLabel, MainImage,SimpleList} from '@semapps/archipelago-layout';
import { ReferenceArrayField ,ImageField,ReferenceField,FilteredArrayField,GroupedArrayField } from '@semapps/semantic-data-provider';
import { Typography, Box, makeStyles, Avatar, Button } from '@material-ui/core';
import { MapField } from '@semapps/geo-components';
import MailIcon from '@material-ui/icons/MailOutline';
import { Link } from 'react-router-dom';
import OrganizationTitle from './OrganizationTitle';

const mainImage = makeStyles({
  image: {
    objectFit: 'cover',
    width: '100%',
    maxHeight :'20em'
  }
});

const ShowContextLayout = ({children, ...otherProps}) => {
  const {
    basePath, // deduced from the location, useful for action buttons
    loaded, // boolean that is false until the record is available
    record, // record fetched via dataProvider.getOne() based on the id from the location
    resource // the resource name, deduced from the location. e.g. 'posts'
  } = useShowContext();

  return React.Children.map(children, layout =>
    layout && React.cloneElement(layout, {
      resource,
      record,
      basePath
    })
  )
}

const MyUrlArrayField = ({ record, source }) => {
  var array = typeof(record[source]) === "string" ? [record[source]] : record[source]
  for (var i=0; i < array.length ;i++) {
    if (!array[i].startsWith('https') || !array[i].startsWith('https://') || !array[i].startsWith('http')) {
      array[i] = 'https:\/\/'+array[i]
    }
  }

  return record ? (
    <>
      {
        array.map(item =>
        <div><a href={item} >{item} </a></div>
        )
      }
    </>
  ) : null;
}
MyUrlArrayField.defaultProps = { addLabel: true }



const LimitationLayout = ({record,source,children,action,more,limit, ...otherProps}) => {
  const [filtered,setFiltered]=useState();
  // console.log('record',source,JSON.stringify(record?.[source]),JSON.stringify(record));
  useEffect(() => {
    if (record?.[source] && Array.isArray(record[source])) {
      if (record?.[source].length>limit){
        const filteredData = [...record[source]].splice(record?.[source].length - limit);
        let newRecord = {
          ...record
        };
        newRecord[source] = filteredData;
        setFiltered(newRecord);
      }else{
        setFiltered(record);
      }
    }
  }, [record, source]);

    // console.log('filtered',source,JSON.stringify(filtered?.[source]));

  return <div style={{'display':'flex'}}>
    <div>
    {filtered?.[source] && React.Children.map(children, child =>
      child && React.cloneElement(child, {
        ...otherProps,
        source,
        record : filtered,

      })
    )}
    </div>
    <div>
    {record?.[source].length > limit&&
      <Button component={Link}
        to={more}
        >
        More...
      </Button>
    }
    </div>
  </div>
}

const OrganizationShow = props => {
  const mainImageStyles = mainImage();
  return <Show title={<OrganizationTitle />} {...props}>
    <ShowContextLayout>
      <ImageField source="image" classes={mainImageStyles}/>
      <TabbedShowLayout value={2} >
        <Tab label="info" icon={<Avatar alt="test avatar" src="/icon_info.png" />}>
          <ColumnShowLayout>
            <Column xs={12} sm={8} showLabel>
              <TextField variant="h5" label="Courte description" source="pair:comment" addLabel={false}/>
              <MarkdownField source="pair:description" addLabel={false}/>
              <MyUrlArrayField label="Liens utiles" source="pair:homePage" />
              <TextField label="Email" source="pair:e-mail" type="email" addLabel/>
              <TextField label="Téléphone" source="pair:phone" addLabel/>
              <MapField
                source="pair:hasLocation"
                address={record => record['pair:hasLocation'] && record['pair:hasLocation']['pair:label']}
                latitude={record => record['pair:hasLocation'] && record['pair:hasLocation']['pair:latitude']}
                longitude={record => record['pair:hasLocation'] && record['pair:hasLocation']['pair:longitude']}
              />
            </Column>
            <Column xs={12} sm={4} showLabel>
              <RightLabel reference="Place" source="pair:supports" label="Lieux">
                <LimitationLayout source="pair:supports" limit={3} more={{
                        pathname: './show/Places'
                    }}>
                  <ReferenceArrayField reference="Place" source="pair:supports">
                    <SingleFieldList linkType="show">
                      <ChipField source="pair:label" color="secondary" />
                    </SingleFieldList>
                  </ReferenceArrayField>
                </LimitationLayout>
              </RightLabel>
              <GroupedArrayField
                source="pair:organizationOfMembership"
                groupReference="MembershipRole"
                groupLabel="pair:label"
                filterProperty="pair:membershipRole"
                addLabel={false}
              >
                <RightLabel>
                  <LimitationLayout source="pair:organizationOfMembership" limit={1} more={{
                          pathname: './show/MembershipRole'
                      }}>

                    <ArrayField source="pair:organizationOfMembership">
                      <SingleFieldList linkType={false}>
                        <ReferenceField reference="User" source="pair:membershipActor" link="show">
                          <AvatarField label={record => `${record['pair:firstName']} ${record['pair:lastName']}`} image="image" classes={{
                                              parent: {
                                                width: '100px',
                                                margin : '10px'
                                              }
                                            }}/>

                        </ReferenceField>
                      </SingleFieldList>
                    </ArrayField>
                  </LimitationLayout>
                </RightLabel>
              </GroupedArrayField>
            </Column>
          </ColumnShowLayout>

        </Tab>
        <Tab label="membres" path="MembershipRole" icon={<Avatar alt="test avatar" src="/icon_members.png" />}>
          <GroupedArrayField
            source="pair:organizationOfMembership"
            groupReference="MembershipRole"
            groupLabel="pair:label"
            filterProperty="pair:membershipRole"
            addLabel={false}
          >
            <RightLabel>
            <ArrayField source="pair:organizationOfMembership">
              <SingleFieldList linkType={false}>
                <ReferenceField reference="User" source="pair:membershipActor" link="show">
                  <AvatarField label={record => `${record['pair:firstName']} ${record['pair:lastName']}`} image="image" classes={{
                                      parent: {
                                        width: '100px',
                                        margin : '10px'
                                      }
                                    }}/>

                </ReferenceField>
              </SingleFieldList>
            </ArrayField>
            </RightLabel>

          </GroupedArrayField>
        </Tab>
        <Tab value="Places" label="lieux" path="Places" icon={<Avatar alt="test avatar" src="/icon_places.png" />}>
          <ReferenceArrayField label="Lieux" reference="Place" source="pair:supports" addLabel={false}>
            <SimpleList
              primaryText={record => record['pair:label']}
              secondaryText={record => record['pair:comment']}
              leftAvatar={record => (
                <img src={record['image'] || process.env.PUBLIC_URL + '/logo192.png'} width="100%" alt="SemApps" />
              )}
              linkType="show"
            />
          </ReferenceArrayField>
        </Tab>


      </TabbedShowLayout>
    </ShowContextLayout>

    </Show>
};

export default OrganizationShow;
