import React from 'react';
import { MultiViewsList, SimpleList } from '@semapps/archipelago-layout';
import ListIcon from '@material-ui/icons/List';
import SectorFilterSidebar from './../../components/SectorFilterSidebar';
import { CalendarList } from '@semapps/date-components';
import frLocale from '@fullcalendar/core/locales/fr';
import EventIcon from '@material-ui/icons/Event';


const EventList = props => (
  <MultiViewsList
    aside={<SectorFilterSidebar />}
    views={{
      calendar: {
        label: 'Calendrier',
        icon: EventIcon,
        perPage: 1000,
        pagination: false,
        list: (
          <CalendarList
            locale={frLocale}
            label="pair:label"
            startDate="pair:startDate"
            endDate="pair:endDate"
            linkType="show"
          />
        )
      },
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
      }
    }}
    {...props}
  />

);


export default EventList;
