import SectorCreate from './SectorCreate';
import SectorEdit from './SectorEdit';
import SectorList from './SectorList';
import SectorShow from './SectorShow';
import SectorIcon from '@material-ui/icons/PinDrop';

export default {
  config:{
    list: SectorList,
    show: SectorShow,
    create: SectorCreate,
    edit: SectorEdit,
    icon: SectorIcon,
    options: {
      label: 'Thématiques'
    }
  },
  dataModel: {
    types: ['pair:Sector'],
    containerUri: process.env.REACT_APP_MIDDLEWARE_URL + 'sectors',
    slugField: 'pair:label'
  },
  translations: {
    fr: {
      name: 'Sectors |||| Sectors',
      fields: {
        'pair:label': 'Titre',
      }
    }
  }
};
