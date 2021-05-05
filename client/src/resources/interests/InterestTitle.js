import React from 'react';

const InterestTitle = ({ record }) => {
  return <span>{record ? record['pair:label'] : ''}</span>;
};

export default InterestTitle;
