import React from 'react';
import { useShowContext, TextField, SingleFieldList, ArrayField,TabbedShowLayout, Tab} from 'react-admin';
import { Column, ColumnShowLayout, MarkdownField, AvatarField, RightLabel } from '@semapps/archipelago-layout';
import { Show } from '../../layout/show/Show.js';
import { makeStyles, Avatar } from '@material-ui/core';
import { ImageField,ReferenceField, GroupedReferenceHandler, UriArrayField } from '@semapps/semantic-data-provider';
import { MapField } from '@semapps/geo-components';
import OrganizationTitle from './OrganizationTitle';
import SocialNetworkArrayIcon from '../../components/SocialNetworkArrayIcon';
import VideoPlayer from '../../addons/videoComponent';
import UrlArrayField from '../../components/UrlArrayfield';
import MoreArrayField from '../../addons/MoreArrayField';

const mainImage = makeStyles({
  image: {
    objectFit: 'cover',
    width: '100%',
    maxHeight :'20em',
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

const ConditionDisplay = ({ children, ...props }) => {
  const record = useShowContext().record;
  if (record?.["pair:organizationOfMembership"] != undefined) {
    return (
      <>{React.Children.map(children, child =>
        child && React.cloneElement(child, {
          ...props,
          record,
        })
      )}</>
    )
  } else {
    return (<>

    </>)
  }
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
                    <MoreArrayField source="pair:organizationOfMembership" limit={5} to={{
                        pathname: './show/1'
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
                    </MoreArrayField>
                  </RightLabel>
                </GroupedReferenceHandler>
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
                <UriArrayField reference="Sector" source="pair:hasSector">
                  <SingleFieldList linkType="show">
                    <AvatarField label={record => `${record['pair:label']}`} image="image" classes={{
                      parent: {
                        width: '100px',
                        margin : '10px'
                      }
                    }}/>
                  </SingleFieldList>
                </UriArrayField>
              </Column>
            </ColumnShowLayout>
          </Tab>
          <ConditionDisplay >
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
          </ConditionDisplay>
        </TabbedShowLayout>
    </ShowContextLayout>
  </Show>
};

export default OrganizationShow;
//    filter: grayscale(100%); style={{    filter: "grayscale(100%)"}}
