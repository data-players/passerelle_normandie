import React from 'react';

const UrlArrayField = ({ record, source }) => {
    var array = typeof(record[source]) === "string" ? [record[source]] : record[source]
    for (var i=0; i < array.length ;i++) {
      if (array[i].startsWith('https://')) {
        array[i] = array[i].split('https://')[1]
      }
    }
  
    return record ? (
      <>
        {
          array.map(item =>
          <div><a href={"http://"+item} >{item} </a></div>
          )
        }
      </>
    ) : null;
  }

  export default UrlArrayField;