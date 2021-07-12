import EventCreate from './EventCreate';
import EventEdit from './EventEdit';
import EventList from './EventList';
import EventShow from './EventShow';
import EventIcon from '@material-ui/icons/Event';

export default {
  config:{
    list: EventList,
    show: EventShow,
    create: EventCreate,
    edit: EventEdit,
    icon: EventIcon,
    options: {
      label: 'Événements'
    }
  },
  dataModel: {
    types: ['pair:Event'],
    containerUri: process.env.REACT_APP_MIDDLEWARE_URL + 'events',
    slugField: 'pair:label'
  },
  translations: {
    fr: {
      name: 'Événement |||| Événement',
      fields: {
        'pair:label': 'Titre',
        'pair:hasSector' : 'Thématiques',
      }
    }
  }
};
