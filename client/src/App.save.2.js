import React from 'react';
import { Admin, Resource } from 'react-admin';
import { Layout, AppBar, theme } from '@semapps/archipelago-layout';
import { authProvider, LoginPage, LogoutButton, UserMenu } from '@semapps/auth-provider';
import { ContextUnivers, ContextUniversProvider} from './univers';

import i18nProvider from './config/i18nProvider';
import dataProvider from './config/dataProvider';
import * as resources from './resources';

import UniversMenu from './UniversMenu.js';
// import { ContextUnivers, ContextUniversProvider} from './univers';


// const LayoutWithUserMenu = props => <Layout appBar={<AppBar userMenu={<UserMenu />} />} {...props} />;

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

const PasserelleMenu = props=>{
    return <div style={{display:'flex'}}>
        <UniversMenu {...props}/>
        <UserMenu {...props}/>
    </div>
};

const LayoutWithPasserelleMenu = props=>{
    // console.log(props);
    return <Layout appBar={
        <AppBar userMenu = {
           <PasserelleMenu/>
        }/>
    }{...props}/>
};






const App = () => (
  <ContextUniversProvider>
    <Admin
      authProvider={adminAuthProvider}
      dataProvider={dataProvider}
      i18nProvider={i18nProvider}
      layout={LayoutWithPasserelleMenu}
      theme={theme}
      loginPage={LoginPage}
      logoutButton={LogoutButton}
    >
      {Object.entries(resources).map(([key, resource]) => (
        <Resource key={key} name={key} {...resource.config} />
      ))}
    </Admin>
  </ContextUniversProvider>
);

export default App;
