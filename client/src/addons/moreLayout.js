import React, {useState,useEffect} from 'react';
import { IconButton, Button } from '@material-ui/core';
import { Link } from 'react-router-dom';
import MoreHorizIcon from '@material-ui/icons/MoreHoriz';

const MoreLayout = ({record,source,children,more,limit,filter, ...otherProps}) => {
  // console.log('ALLLO',record);
    let references = record?.[source];
    // console.log('references',references);
    for (const key of Object.keys(filter)){
      references=references.filter(r=>r[key]===filter[key]);
      // console.log('references2',key,references);
    }

    return <div style={{'display':'flex','align-items':'center'}}>
      <div>
      {record?.[source] && React.Children.map(children, child =>
        child && React.cloneElement(child, {
          ...otherProps,
          filter,
          source,
          record,

        })
      )}
      </div>
      <div>
      {references.length > limit&&
        <Button component={Link}
            to={more}
            size="large"
            color="primary"
            variant="contained"
            >
              <MoreHorizIcon/>
        </Button>
      }
      </div>
    </div>
  }

export default MoreLayout;
