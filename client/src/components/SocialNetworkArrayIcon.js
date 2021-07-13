import React from 'react';
import { List, ListItem, makeStyles } from '@material-ui/core';
import { SocialIcon } from 'react-social-icons';

const listIcon = makeStyles({
    root: {
      display: 'inline-block',
      width: 'auto',
    }
  });

const SocialNetworkArrayIcon = ({ record, source }) => {
    const listIconStyle = listIcon();
    var array = typeof(record[source]) === "string" ? [record[source]] : record[source]
    for (var i=0; i < array.length ;i++) {
      if (array[i].startsWith('https://')) {
        array[i] = array[i].split('https://')[1]
      }
    }
  
    return <List>
      {  array.map(item => <ListItem classes={listIconStyle}><SocialIcon url={"http://"+item}/></ListItem>) }
    </List>
  }

  export default SocialNetworkArrayIcon;