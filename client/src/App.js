import React,{ useContext,useState,useEffect } from 'react';
import {Admin, Resource, MenuItemLink,useDataProvider} from 'react-admin';
import frenchMessages from 'ra-language-french';
import polyglotI18nProvider from 'ra-i18n-polyglot';
import { Box, Button, Menu } from '@material-ui/core';
import ArrowDropDownIcon from '@material-ui/icons/ArrowDropDown';
import EditIcon from '@material-ui/icons/Edit';
import AccountCircleIcon from '@material-ui/icons/AccountCircle';

import {dataProvider, httpClient} from '@semapps/semantic-data-provider';
import {Layout, AppBar, theme} from '@semapps/archipelago-layout';
import {authProvider, LoginPage, LogoutButton, UserMenu} from '@semapps/auth-provider';
import resources from './config/resources';
import ontologies from './config/ontologies';

import events from './resources/events';
import places from './resources/places';
import interests from './resources/interests';
import projects from './resources/projects';
import organizations from './resources/organizations';
import skills from './resources/skills';
import users from './resources/users';
import branchs from './resources/branchs';

import { ContextUnivers, ContextUniversProvider} from './univers';

import { useHistory,useParams,useLocation } from 'react-router-dom';
import queryString from 'query-string';



const globalLogout = () => {
  // Redirect to login page after disconnecting from SSO
  // The login page will remove the token, display a notification and redirect to the homepage
  const url = new URL(window.location.href);
  window.location.href = `${process.env.REACT_APP_MIDDLEWARE_URL}auth/logout?global=true&redirectUrl=` + encodeURIComponent(url.origin + '/#/login?logout');

  return Promise.resolve('/');
}

const adminAuthProvider = {
  ...authProvider(process.env.REACT_APP_MIDDLEWARE_URL),
  logout: globalLogout
}

export const UniversContext = React.createContext();
let { state, dispatch } = UniversContext;

const TestMenu=props=>{
  const [anchorEl, setAnchorEl] = useState(null);

  const open = Boolean(anchorEl);
  const handleMenu = event => setAnchorEl(event.currentTarget);
  const handleClose = () => setAnchorEl(null);

  const history = useHistory();
  const universContext = useContext(ContextUnivers);
  const defaultUnivers='globale';
  const prefixNextSearch  = history.location.search?history.location.search+'&':'?';
  const parsed = queryString.parse(history.location.search);
  const dataProvider = useDataProvider();
  const [branches,setBranches] = useState();
  const currentBranch = branches && branches.find(b=>b['@id']==parsed.univers);
  const currentBranchLabel = currentBranch?currentBranch['pair:label']:parsed.univers;
  useEffect(() => {
    // console.log(history);

    if(parsed.univers){
      if(parsed.univers!==universContext.state){
            universContext.dispatch({type: 'changeUnivers', payload: parsed.univers});
      }
    }else{
      history.push({
        search:'?'+queryString.stringify({
          ...parsed,
          univers:universContext.state
        })
      })
    }
    if(!branches){
      dataProvider.getList('Branch',{'@id':process.env.REACT_APP_MIDDLEWARE_URL + 'branchs'}).then(branches=>{
          setBranches(branches.data);
      })
    }
  });

  return <div style={{display:'flex'}}>

      <Box spacing={2}>
        <Button variant="outlined" onClick={handleMenu} endIcon={<ArrowDropDownIcon />}>
          {currentBranchLabel}
        </Button>
        <Menu
          id="menu-univers-appbar"
          anchorEl={anchorEl}
          anchorOrigin={{
            vertical: 'top',
            horizontal: 'right'
          }}
          transformOrigin={{
            vertical: 'top',
            horizontal: 'right'
          }}
          open={open}
          onClose={handleClose}
        >
            <MenuItemLink
              to={{
                search:'?'+queryString.stringify({
                  ...parsed,
                  univers:'global'
                })
              }}
              key="global"
              primaryText="global"
              leftIcon={<EditIcon />}
              onClick={handleClose}
            />
            {branches && branches.map(b=>{
              return <MenuItemLink
                to={{
                  search:'?'+queryString.stringify({
                    ...parsed,
                    univers:b['@id']
                  })
                }}
                primaryText={b['pair:label']}
                leftIcon={<EditIcon />}
                onClick={handleClose}/>
            })}
        </Menu>
      </Box>
      <UserMenu {...props}/>
  </div>
}





const LayoutWithUserMenu = props=>{
    // console.log(props);
    return <Layout appBar={
        <AppBar userMenu = {
           <TestMenu/>
        }/>
    }{...props}/>
};


function App() {
  const history = useHistory();
  // console.log('XXXXXX history',history);

  return (
    <ContextUniversProvider>
      <Admin authProvider={adminAuthProvider}
        dataProvider={dataProvider({
          sparqlEndpoint: process.env.REACT_APP_MIDDLEWARE_URL + 'sparql',
          httpClient,
          resources,
          ontologies,
          jsonContext: process.env.REACT_APP_MIDDLEWARE_URL + 'context.json',
          uploadsContainerUri: process.env.REACT_APP_MIDDLEWARE_URL + 'files'
        })}
        i18nProvider={polyglotI18nProvider(() => frenchMessages)}
        layout={LayoutWithUserMenu}
        theme={theme}
        loginPage={LoginPage}
        logoutButton={LogoutButton}>

        <Resource name="Organization" {...organizations}/>
        <Resource name="Event" {...events}/>
        <Resource name="Place" {...places}/>
        <Resource name="User" {...users}/>
        <Resource name="Project" {...projects}/>
        <Resource name="Skill" {...skills}/>
        <Resource name="Interest" {...interests}/>
        <Resource name="Branch" {...branchs}/>
      </Admin>
    </ContextUniversProvider>);

}

export default App;
