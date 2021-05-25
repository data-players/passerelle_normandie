import React from 'react';

const BranchTitle = ({ record }) => {
  return <span>{record ? record['pair:label'] : ''}</span>;
};

export default BranchTitle;
