import UserCreate from './UserCreate';
import UserEdit from './UserEdit';
import UserList from './UserList';
import UserShow from './UserShow';
import PersonIcon from '@material-ui/icons/Person';

export default {
  config:{
    list: UserList,
    show: UserShow,
    create: undefined,
    edit: UserEdit,
    icon: PersonIcon,
    options: {
      label: 'Personnes'
    }
  },
  dataModel: {
    types: ['pair:Person'],
    containerUri: process.env.REACT_APP_MIDDLEWARE_URL + 'persons',
    dereference: ['pair:hasLocation/pair:hasPostalAddress'],
    slugField: 'pair:label',
    forceArray: ['pair:actorOfMembership','pair:aboutPage', 'pair:homePage']

  },
  translations: {
    fr: {
      name: 'Utilisateurs |||| Utilisateurs',
      fields: {
        'pair:label': 'Titre',
        'pair:actorOfMembership': 'organisation avec Role',
        'pair:membershipRole': 'Role',
        'pair:membershipOrganization' : 'Organisation',
        'pair:hasLocation' : 'Adresse',
        'pair:involvedIn' : 'Participe à',
        'pair:aboutPage' : 'Réseaux Sociaux',
        'pair:homePage':'Liens utiles',
        'pair:hasTopic' : 'Centres d\'intérêt',
        'pair:offers' : 'Compétences',
        'pair:video':'Vidéo',
      }
    }
  }
};
