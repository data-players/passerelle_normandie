import OrganizationCreate from './OrganizationCreate';
import OrganizationEdit from './OrganizationEdit';
import OrganizationList from './OrganizationList';
import OrganizationShow from './OrganizationShow';
import AccountBalanceIcon from '@material-ui/icons/AccountBalance';


export default {
  config:{
    list: OrganizationList,
    show: OrganizationShow,
    create: process.env.REACT_APP_ADMIN==='true'?OrganizationCreate:undefined,
    edit: OrganizationEdit,
    icon: AccountBalanceIcon,
    options: {
      label: 'Organisations'
    }
  },
  dataModel: {
    types: ['pair:Organization'],
    containerUri: process.env.REACT_APP_MIDDLEWARE_URL + 'organizations',
    dereference: ['pair:hasLocation/pair:hasPostalAddress'],
    slugField: 'pair:label',
    forceArray: ['pair:organizationOfMembership','pair:supports']
  },
  translations: {
    fr: {
      name: 'Organisation |||| Organisation',
      fields: {
        'pair:label': 'Titre',
        'pair:organizationOfMembership': 'Les membres de l\'organisation',
        'pair:membershipActor': 'Membre',
        'pair:membershipRole': 'Role',
        'pair:hasLocation':'Emplacement',
        'pair:homePage':'Liens utiles',
        'pair:video':'Vidéo',
        'pair:aboutPage':'Réseaux Sociaux',
        'pair:hasSector': 'Thématiques',
      }
    }
  }
};
