import React from 'react';
import { Button } from '@material-ui/core';
import { Link } from 'react-router-dom';
import MoreHorizIcon from '@material-ui/icons/MoreHoriz';
import { useRecordContext,useListContext } from 'react-admin';

const MoreListLayout = ({ limit,children,to,...otherProps }) => {
    const context = useListContext();

  return <div style={{'display':'flex','alignItems':'center'}}>
    <div>
    {context && React.Children.map(children, child =>
      child && React.cloneElement(child, {
        ...otherProps,
      })
    )}
    </div>
    <div>
    {context.ids.length>limit&&
      <Button component={Link}
          to={to}
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

export default MoreListLayout;
