import React, {useState,useEffect} from 'react';
import { useShowContext, TextField, SingleFieldList, ChipField, ArrayField,TabbedShowLayout, Tab} from 'react-admin';
import { Column, ColumnShowLayout, Show, MarkdownField, AvatarField, RightLabel, SimpleList} from '@semapps/archipelago-layout';
import { ReferenceArrayField ,ImageField,ReferenceField, GroupedReferenceHandler } from '@semapps/semantic-data-provider';
import { makeStyles, Avatar, Button } from '@material-ui/core';
import { MapField } from '@semapps/geo-components';
import MailIcon from '@material-ui/icons/MailOutline';
import { Link } from 'react-router-dom';
import OrganizationTitle from './OrganizationTitle';
import ReactPlayer from "react-player";


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
    if (array[i].startsWith('https://')) {
      array[i] = array[i].split('https://')[1]
    }
  }

  return record ? (
    <>
      {
        array.map(item =>
        <div><a href={"http://"+item} >{item} </a></div>
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

const MyVideoPlayer = ({ record, source }) => {
  var url = record[source]

  switch (detectPlayer(url)) {
    case 'peertube':
      if (!url.includes("embed")) {
          var spliturl = url.split("watch/")
          url = spliturl[0]+"embed/"+spliturl[1]
      }
      return  (
        <div align="center" >
          <iframe width="1120" height="630" sandbox="allow-same-origin allow-scripts" src={url} frameborder="0" allow="fullscreen"></iframe>
        </div>
      )
    case 'basic':
      return (
        <div align="center" >
          <ReactPlayer url={url} controls/>
        </div>
      )
    default:
      return (
        <div align="center">Video Not Supported, check your URL</div>
      )
  }
}

function detectPlayer (url) {
  if (!url){
      return undefined
  } else if ( url.includes("youtube")) {
      return "basic"
  } else if (url.includes("facebook")) {
      return "basic"
  } else if (url.includes("videos/watch") || url.includes("videos/embed")){
      return "peertube"
  }
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
              <MyVideoPlayer source="pair:video"/>
            </Column>
            <Column xs={12} sm={4} showLabel>
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
              </GroupedReferenceHandler>
              <MapField
                source="pair:hasLocation"
                address={record => record['pair:hasLocation'] && record['pair:hasLocation']['pair:label']}
                latitude={record => record['pair:hasLocation'] && record['pair:hasLocation']['pair:latitude']}
                longitude={record => record['pair:hasLocation'] && record['pair:hasLocation']['pair:longitude']}
              />
              <MyUrlArrayField label="Liens utiles" source="pair:homePage" />
              <TextField label="Email" source="pair:e-mail" type="email" addLabel/>
              <TextField label="Téléphone" source="pair:phone" addLabel/>
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
