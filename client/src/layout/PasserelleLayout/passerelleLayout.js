import React from 'react';
import { Layout as RaLayout } from 'react-admin';
import { makeStyles } from '@material-ui/core';
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

const PasserelleLayout = ({ appBar, menu, userMenu, children, ...otherProps }) => {
  const classes = useStyles();
  return (
    <RaLayout {...otherProps} classes={{ appFrame: classes.appFrame }} appBar={appBar} menu={menu}>
      {children}
    </RaLayout>
  );
};

PasserelleLayout.defaultProps = {
  appBar: AppBar,
  menu: TreeMenu
};

export default PasserelleLayout;
