import React from 'react';
import { Admin, Resource } from 'react-admin';
import frenchMessages from 'ra-language-french';
import polyglotI18nProvider from 'ra-i18n-polyglot';

import { dataProvider, httpClient } from '@semapps/semantic-data-provider';
import { Layout, AppBar, theme } from '@semapps/archipelago-layout';
import { authProvider, LoginPage, LogoutButton, UserMenu } from '@semapps/auth-provider';
import resources from './config/resources';
import ontologies from './config/ontologies';

import events from './resources/events';
import places from './resources/places';
import interests from './resources/interests';
import projects from './resources/projects';
import organizations from './resources/organizations';
import skills from './resources/skills';
import users from './resources/users';

const LayoutWithUserMenu = props => <Layout appBar={<AppBar userMenu={<UserMenu />} />} {...props} />;

const globalLogout = () => {
  // Redirect to login page after disconnecting from SSO
  // The login page will remove the token, display a notification and redirect to the homepage
  const url = new URL(window.location.href);
  window.location.href =
    `${process.env.REACT_APP_MIDDLEWARE_URL}auth/logout?global=true&redirectUrl=` + encodeURIComponent(url.origin + '/#/login?logout');

  return Promise.resolve('/');
}

const adminAuthProvider = {
  ...authProvider(process.env.REACT_APP_MIDDLEWARE_URL),
  logout : globalLogout
}

function App() {

  return (
    <Admin
      authProvider={adminAuthProvider}
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
      logoutButton={LogoutButton}
    >

      <Resource name="Organization" {...organizations} />
      <Resource name="Event" {...events} />
      <Resource name="Place" {...places} />
      <Resource name="User" {...users} />
      <Resource name="Project" {...projects} />
      <Resource name="Skill" {...skills} />
      <Resource name="Interest" {...interests} />
    </Admin>
  );

}

export default App;
