import React from 'react';
import './MessageOnSubmit.scss';

export const MessageOnSubmit = ({ userDeployed }) => {
  if (userDeployed === '') {
    return '';
  } else if (userDeployed) {
    return <div className='user-deployed'>User well deployed on server !!!</div>;
  } else {
    return <div className='user-deployed user-deployed__error'>Server Responce Error, please try again later</div>;
  }
};
