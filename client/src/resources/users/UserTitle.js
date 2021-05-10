import React from 'react';

const UserTitle = ({ record }) => {
  return <span>{record ? record['pair:label'] : ''}</span>;
};

export default UserTitle;
