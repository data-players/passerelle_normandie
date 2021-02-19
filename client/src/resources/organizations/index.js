import OrganizationCreate from './OrganizationCreate';
import OrganizationEdit from './OrganizationEdit';
import OrganizationList from './OrganizationList';
import OrganizationShow from './OrganizationShow';
import AccountBalanceIcon from '@material-ui/icons/AccountBalance';

export default {
  config:{
    list: OrganizationList,
    show: OrganizationShow,
    create: OrganizationCreate,
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
    slugField: 'pair:label'
  },
  translations: {
    fr: {
      name: 'Organisations |||| Organisation',
      fields: {
        'pair:label': 'Titre',
      }
    }
  }
};
