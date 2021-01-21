import ProjectCreate from './ProjectCreate';
import ProjectEdit from './ProjectEdit';
import ProjectList from './ProjectList';
import ProjectShow from './ProjectShow';
import SettingsIcon from '@material-ui/icons/Settings';

export default {
  config:{
    list: process.env.REACT_APP_ADMIN==='true'?ProjectList:undefined,
    show: ProjectShow,
    create: ProjectCreate,
    edit: ProjectEdit,
    icon: SettingsIcon,
    options: {
      label: 'Projets'
    }
  },
  dataModel: {
    types: ['pair:Project'],
    containerUri: process.env.REACT_APP_MIDDLEWARE_URL + 'projects',
    slugField: 'pair:label'
  },
  translations: {
    fr: {
      name: 'Projets |||| Projets',
      fields: {
        'pair:label': 'Titre',
      }
    }
  }
};
