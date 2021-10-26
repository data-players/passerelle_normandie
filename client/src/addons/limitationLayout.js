import React, {useState,useEffect} from 'react';
import { IconButton, Button } from '@material-ui/core';
import { Link } from 'react-router-dom';
import MoreHorizIcon from '@material-ui/icons/MoreHoriz';

const LimitationLayout = ({record,source,children,action,more,limit, ...otherProps}) => {
    const [filtered,setFiltered]=useState();
    useEffect(() => {
      if (record?.[source] && Array.isArray(record[source])) {
        if (record?.[source].length>limit){
          const filteredData = [...record[source]].splice(record?.[source].length - limit);
          let newRecord = {
            ...record
          };
          newRecord[source] = filteredData;
          setFiltered(newRecord);
        }else{
          setFiltered(record);
        }
      }
    }, [record, source]);

    return <div style={{'display':'flex','align-items':'center'}}>
      <div>
      {filtered?.[source] && React.Children.map(children, child =>
        child && React.cloneElement(child, {
          ...otherProps,
          source,
          record : filtered,

        })
      )}
      </div>
      <div>
      {record?.[source].length > limit&&
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

export default LimitationLayout;
