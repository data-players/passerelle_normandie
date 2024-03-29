import ProjectCreate from './ProjectCreate';
import ProjectEdit from './ProjectEdit';
import ProjectList from './ProjectList';
import ProjectShow from './ProjectShow';
import SettingsIcon from '@material-ui/icons/Settings';

export default {
  config:{
    list: ProjectList,
    show: ProjectShow,
    create: process.env.REACT_APP_ADMIN==='true'?ProjectCreate:undefined,
    edit: ProjectEdit,
    icon: SettingsIcon,
    options: {
      label: 'Projets'
    }
  },
  dataModel: {
    types: ['pair:Project'],
    containerUri: process.env.REACT_APP_MIDDLEWARE_URL + 'projects',
    slugField: 'pair:label',
    forceArray: ['pair:aboutPage', 'pair:homePage']
  },
  translations: {
    fr: {
      name: 'Projet |||| Projets',
      fields: {
        'pair:label': 'Titre',
        'pair:video': 'Vidéo',
        'pair:aboutPage':'Réseaux Sociaux',
        'pair:homePage':'Liens utile',
        'pair:hasSector' : 'Thématiques',
        'pair:hasLocation': 'Localisation du projet',
      }
    }
  }
};
