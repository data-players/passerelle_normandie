import React from 'react';
import { List, SimpleList ,MultiViewsList} from '@semapps/archipelago-layout';
import { MapList } from '@semapps/geo-components';
import MapIcon from '@material-ui/icons/Map';
import ListIcon from '@material-ui/icons/List';
import SectorFilterSidebar from './../../components/SectorFilterSidebar';

const OrganizationList = props => (
  // <List {...props}>
  //   <SimpleList
  //     primaryText={record => record['pair:label']}
  //     secondaryText={record => record['pair:comment']}
  //     leftAvatar={record => (
  //       <img src={record['image'] || process.env.PUBLIC_URL + '/logo192.png'} width="100%" alt="SemApps" />
  //     )}
  //     linkType="show"
  //   />
  // </List>
  // <List {...props}>
  //   <MapList
  //     latitude={record => record['pair:hasLocation'] && record['pair:hasLocation']['pair:latitude']}
  //     longitude={record => record['pair:hasLocation'] && record['pair:hasLocation']['pair:longitude']}
  //     label={record => record['pair:label']}
  //     description={record => record['pair:comment']}
  //     scrollWheelZoom
  //   />
  // </List>
  <MultiViewsList
    aside={<SectorFilterSidebar />}
    views={{
      list: {
        label: 'Liste',
        icon: ListIcon,
        sort: { field: 'pair:label', order: 'DESC' },
        perPage: 25,
        list: (
          <SimpleList
            primaryText={record => record['pair:label']}
            secondaryText={record => record['pair:comment']}
            leftAvatar={record => (
              <img src={record['image'] || process.env.PUBLIC_URL + '/logo192.png'} width="100%" alt="SemApps" />
            )}
            linkType="show"
          />
        )
      },
      map: {
        label: 'Carte',
        icon: MapIcon,
        perPage: 500,
        pagination: false,
        list: (
          <MapList
            latitude={record => record['pair:hasLocation'] && record['pair:hasLocation']['pair:latitude']}
            longitude={record => record['pair:hasLocation'] && record['pair:hasLocation']['pair:longitude']}
            label={record => record['pair:label']}
            description={record => record['pair:comment']}
            scrollWheelZoom
          />
        )
      }
    }}
    {...props}
  />

);

export default OrganizationList;
