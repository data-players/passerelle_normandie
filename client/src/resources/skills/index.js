import SkillsCreate from './SkillCreate';
import SkillEdit from './SkillEdit';
import SkillShow from './SkillShow';
import SkillList from './SkillList';
import PanToolIcon from '@material-ui/icons/PanTool';

export default {
  config:{
    list: process.env.REACT_APP_ADMIN==='true'?SkillList:undefined,
    create: SkillsCreate,
    edit: SkillEdit,
    show : SkillShow,
    icon: PanToolIcon,
    options: {
      label: 'Compétences'
    }
  },
  dataModel: {
    types: ['pair:Skill'],
    containerUri: process.env.REACT_APP_MIDDLEWARE_URL + 'skills',
    slugField: 'pair:label'
  },
  translations: {
    fr: {
      name: 'Compétences |||| Compétences',
      fields: {
        'pair:label': 'Titre',
      }
    }
  }
};
