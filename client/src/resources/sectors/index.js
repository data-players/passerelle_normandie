import SectorCreate from './SectorCreate';
import SectorEdit from './SectorEdit';
import SectorList from './SectorList';
import SectorShow from './SectorShow';
import SectorIcon from '@material-ui/icons/PinDrop';

export default {
  config:{
    list: process.env.REACT_APP_ADMIN==='true'?SectorList:undefined,
    show: SectorShow,
    create: process.env.REACT_APP_ADMIN==='true'?SectorCreate:undefined,
    edit: process.env.REACT_APP_ADMIN==='true'?SectorEdit:undefined,
    icon: SectorIcon,
    options: {
      label: 'Thématique'
    }
  },
  dataModel: {
    types: ['pair:Sector'],
    containerUri: process.env.REACT_APP_MIDDLEWARE_URL + 'sectors',
    slugField: 'pair:label'
  },
  translations: {
    fr: {
      name: 'Thématique |||| Thématiques',
      fields: {
        'pair:label': 'Titre',
      }
    }
  }
};
