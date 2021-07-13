import React, {useState,useEffect} from 'react';
import { useShowContext, TextField, SingleFieldList, ChipField, ArrayField,TabbedShowLayout, Tab} from 'react-admin';
import { Column, ColumnShowLayout, Show, MarkdownField, AvatarField, RightLabel, SimpleList} from '@semapps/archipelago-layout';
import { makeStyles, Avatar, Button } from '@material-ui/core';
import { ReferenceArrayField ,ImageField,ReferenceField, GroupedReferenceHandler } from '@semapps/semantic-data-provider';
import { MapField } from '@semapps/geo-components';
import { Link } from 'react-router-dom';
import OrganizationTitle from './OrganizationTitle';
import SocialNetworkArrayIcon from '../../components/SocialNetworkArrayIcon';
import VideoPlayer from '../../addons/videoComponent';
import UrlArrayField from '../../components/UrlArrayfield';

const mainImage = makeStyles({
  image: {
    objectFit: 'cover',
    width: '100%',
    maxHeight :'20em'
  }
});

const logoImage = makeStyles({
  image: {
    width: '150px',
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

const LimitationLayout = ({record,source,children,action,more,limit, ...otherProps}) => {
  const [filtered,setFiltered]=useState();
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
  const logoStyle = logoImage();
  return <Show title={<OrganizationTitle />} {...props}>
    <ShowContextLayout>
      <ImageField source="pair:banner" classes={mainImageStyles}/>
      <TabbedShowLayout value={2} >
        <Tab label="info" icon={<Avatar alt="test avatar" src="/icon_info.png" />}>
          <ColumnShowLayout>
            <Column xs={12} sm={8} showLabel>
              <TextField variant="h5" label="Courte description" source="pair:comment" addLabel={false}/>
              <MarkdownField source="pair:description" addLabel={false}/>
              <GroupedReferenceHandler
                source="pair:organizationOfMembership"
                groupReference="MembershipRole"
                groupLabel="pair:label"
                filterProperty="pair:membershipRole"
                addLabel={false}
              >
                <RightLabel>
                  <LimitationLayout source="pair:organizationOfMembership" limit={5} more={{
                      pathname: './show/MembershipRole'
                  }}>
                    <ArrayField source="pair:organizationOfMembership">
                      <SingleFieldList linkType={false}>
                        <ReferenceField reference="Person" source="pair:membershipActor" link="show">
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
              </GroupedReferenceHandler>
              <ReferenceArrayField reference="Sector" source="pair:hasSector">
                <SingleFieldList linkType="show">
                  <ChipField source="pair:label" color="secondary" />
                </SingleFieldList>
              </ReferenceArrayField>
              <VideoPlayer source="pair:video" addLabel/>
            </Column>
            <Column xs={12} sm={4} showLabel>
              <MapField
                source="pair:hasLocation"
                address={record => record['pair:hasLocation'] && record['pair:hasLocation']['pair:label']}
                latitude={record => record['pair:hasLocation'] && record['pair:hasLocation']['pair:latitude']}
                longitude={record => record['pair:hasLocation'] && record['pair:hasLocation']['pair:longitude']}
              />
              <SocialNetworkArrayIcon source="pair:aboutPage" addLabel/>
              <UrlArrayField source="pair:homePage" addLabel/>
              <TextField label="Email" source="pair:e-mail" type="email" addLabel/>
              <TextField label="Téléphone" source="pair:phone" addLabel/>

            </Column>
          </ColumnShowLayout>

        </Tab>
        <Tab label="membres" path="MembershipRole" icon={<Avatar alt="test avatar" src="/icon_members.png" />}>
          <GroupedReferenceHandler
            source="pair:organizationOfMembership"
            groupReference="MembershipRole"
            groupLabel="pair:label"
            filterProperty="pair:membershipRole"
            addLabel={false}
          >
            <RightLabel>
            <ArrayField source="pair:organizationOfMembership">
              <SingleFieldList linkType={false}>
                <ReferenceField reference="Person" source="pair:membershipActor" link="show">
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
          </GroupedReferenceHandler>
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
