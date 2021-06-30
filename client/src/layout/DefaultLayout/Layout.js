import React from 'react';
import { Layout as RaLayout } from 'react-admin';
import { makeStyles, Typography } from '@material-ui/core';
import AppBar from './AppBar';
import TreeMenu from './TreeMenu/TreeMenu';

const useStyles = makeStyles({
  appFrame: {
    marginTop: 56
  },
  title: {
    position: 'absolute',
    top: 80,
    textOverflow: 'ellipsis',
    whiteSpace: 'nowrap',
    overflow: 'hidden'
  }
});

const Layout = ({ appBar, menu, userMenu, children, classes, ...otherProps }) => {
  const innerClasses = useStyles();
  return (
    <RaLayout {...otherProps} classes={{...classes, appFrame: innerClasses.appFrame }} appBar={appBar} menu={menu}>
      <Typography variant="h4" color="primary" className={innerClasses.title} id="react-admin-title" component="h1" />
      {children}
    </RaLayout>
  );
};

Layout.defaultProps = {
  appBar: AppBar,
  menu: TreeMenu
};

export default Layout;
