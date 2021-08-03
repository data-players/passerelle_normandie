import React, {useState,useEffect} from 'react';
import { Button } from '@material-ui/core';
import { Link } from 'react-router-dom';

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
  
    return <div style={{'display':'flex'}}>
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
          >
          More...
        </Button>
      }
      </div>
    </div>
  }

export default LimitationLayout;
