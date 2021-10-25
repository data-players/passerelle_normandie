import EventCreate from './EventCreate';
import EventEdit from './EventEdit';
import EventList from './EventList';
import EventShow from './EventShow';
import EventIcon from '@material-ui/icons/Event';

export default {
  config:{
    list: EventList,
    show: EventShow,
    create: process.env.REACT_APP_ADMIN==='true'?EventCreate:undefined,
    edit: EventEdit,
    icon: EventIcon,
    options: {
      label: 'Événements'
    }
  },
  dataModel: {
    types: ['pair:Event'],
    containerUri: process.env.REACT_APP_MIDDLEWARE_URL + 'events',
    slugField: 'pair:label',
    forceArray: ['pair:aboutPage', 'pair:homePage']
  },
  translations: {
    fr: {
      name: 'Événement |||| Événements',
      fields: {
        'pair:label': 'Titre',
        'pair:hasSector' : 'Thématiques',
        'pair:homePage':'Liens utiles',
        'pair:aboutPage':'Réseaux Sociaux',
        'pair:hasLocation':'Adresse',
        'pair:description':'Description',
        'pair:video':'Vidéo',
        'pair:startDate' : 'Date et heure de lancement',
        'pair:endDate' : 'Date et heure de fin',
      }
    }
  }
};
