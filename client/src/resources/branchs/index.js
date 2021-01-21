import BranchCreate from './BranchCreate';
import BranchEdit from './BranchEdit';
import BranchList from './BranchList';
import FavoriteBorderIcon from '@material-ui/icons/Favorite';

export default {
  config:{
    list: process.env.REACT_APP_ADMIN==='true'?BranchList:undefined,
    create: BranchCreate,
    edit: BranchEdit,
    icon: FavoriteBorderIcon,
    options: {
      label: 'Branches'
    }
  },
  dataModel: {
    types: ['pair:Branch'],
    containerUri: process.env.REACT_APP_MIDDLEWARE_URL + 'branchs',
    slugField: 'pair:label'
  },
  translations: {
    fr: {
      name: 'Branches |||| Branches',
      fields: {
        'pair:label': 'Titre',
      }
    }
  }
};
