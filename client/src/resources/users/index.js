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
    slugField: 'pair:label'
  },
  translations: {
    fr: {
      name: 'Utilisateurs |||| Utilisateurs',
      fields: {
        'pair:label': 'Titre',
      }
    }
  }
};
