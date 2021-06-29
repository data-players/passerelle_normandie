import PlaceCreate from './PlaceCreate';
import PlaceEdit from './PlaceEdit';
import PlaceList from './PlaceList';
import PlaceShow from './PlaceShow';
import PlaceIcon from '@material-ui/icons/PinDrop';

export default {
  config:{
    list: PlaceList,
    show: PlaceShow,
    create: PlaceCreate,
    edit: PlaceEdit,
    icon: PlaceIcon,
    options: {
      label: 'Lieux'
    }
  },
  dataModel: {
    types: ['pair:Place'],
    containerUri: process.env.REACT_APP_MIDDLEWARE_URL + 'places',
    dereference: ['pair:hasLocation/pair:hasPostalAddress'],
    slugField: 'pair:label'
  },
  translations: {
    fr: {
      name: 'Places |||| Places',
      fields: {
        'pair:label': 'Titre',
        'pair:hasPostalAddress' : 'Adresse',
        'pair:aboutPage' : 'Réseaux Sociaux',
      }
    }
  }
};
