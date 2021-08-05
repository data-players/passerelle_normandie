import RoleCreate from './RoleCreate';
import RoleEdit from './RoleEdit';
import RoleList from './RoleList';
import FavoriteBorderIcon from '@material-ui/icons/Class';

export default {
  config: {
    list: process.env.REACT_APP_ADMIN==='true'?RoleList:undefined,
    create: process.env.REACT_APP_ADMIN==='true'?RoleCreate:undefined,
    edit: process.env.REACT_APP_ADMIN==='true'?RoleEdit:undefined,
    icon: FavoriteBorderIcon,
    options: {
      label: 'Rôle de membre'
    }
  },
  dataModel: {
    types: ['pair:MembershipRole'],
    containerUri: process.env.REACT_APP_MIDDLEWARE_URL + 'membership-roles',
    slugField: 'pair:label'
  },
  translations: {
    fr: {
      name: 'Rôle de membre |||| Rôles de membre',
      fields: {
        'pair:label': 'Titre',
        'pair:comment': 'Courte description',
        'pair:description': 'Description',
        'pair:topicOf': 'Sujets'
      }
    }
  }
};
