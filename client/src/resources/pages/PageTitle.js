import React from 'react';

const PageTitle = ({ record }) => {
  return <span>{record ? record['pair:title'] : ''}</span>;
};

export default PageTitle;
