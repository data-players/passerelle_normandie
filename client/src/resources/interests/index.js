import InterestCreate from './InterestCreate';
import InterestEdit from './InterestEdit';
import InterestShow from './InterestShow';
import InterestList from './InterestList';
import FavoriteBorderIcon from '@material-ui/icons/Favorite';

export default {
  config: {
    list: process.env.REACT_APP_ADMIN==='true'?InterestList:undefined,
    create: InterestCreate,
    edit: InterestEdit,
    show : InterestShow,
    icon: FavoriteBorderIcon,
    options: {
      label: 'Intérêts'
    }
  },
  dataModel: {
    types: ['pair:Interest'],
    containerUri: process.env.REACT_APP_MIDDLEWARE_URL + 'themas',
    slugField: 'pair:label'
  },
  translations: {
    fr: {
      name: 'Interet |||| Interet',
      fields: {
        'pair:label': 'Titre',
      }
    }
  }
};
