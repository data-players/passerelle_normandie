import PageCreate from './PageCreate';
import PageEdit from './PageEdit';
import PageList from './PageList';
import PageShow from './PageShow';
import DescriptionIcon from '@material-ui/icons/Description';

export default {
  config: {
    list: process.env.REACT_APP_ADMIN==='true'?PageList:undefined,
    show: PageShow,
    create: PageCreate,
    edit: PageEdit,
    icon: DescriptionIcon,
    options: {
      label: 'Pages'
    }
  },
  dataModel: {
    types: ['pair:Page'],
    containerUri: process.env.REACT_APP_MIDDLEWARE_URL + 'pages',
    slugField: 'pair:title'
  },
  translations: {
    fr: {
      name: 'Page |||| Pages',
      fields: {
        'pair:title': 'Titre',
        'pair:content': 'Contenu',
      }
    }
  }
};
