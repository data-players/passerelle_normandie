import SkillsCreate from './SkillCreate';
import SkillEdit from './SkillEdit';
import SkillList from './SkillList';
import PanToolIcon from '@material-ui/icons/PanTool';

export default {
  list: process.env.REACT_APP_ADMIN==='true'?SkillList:undefined,
  create: SkillsCreate,
  edit: SkillEdit,
  icon: PanToolIcon,
  options: {
    label: 'Compétences'
  }
};
