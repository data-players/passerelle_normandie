import React from 'react';
import { Avatar } from "@material-ui/core";
import { List, SimpleList } from '@semapps/archipelago-layout';
import DescriptionIcon from '@material-ui/icons/Description';

const PageList = props => (
  <List {...props}>
    <SimpleList primaryText={record => record['pair:title']} leftAvatar={() => <Avatar width="100%"><DescriptionIcon /></Avatar>} linkType="edit" />
  </List>
);

export default PageList;
