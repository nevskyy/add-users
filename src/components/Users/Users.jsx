import React from 'react';
import './Users.scss';

export const Users = ({ users }) => {
  return (
    <>
      <ul className='users'>
        {users.map((user, i) => {
          return (
            <li className='users__user' key={user.id}>
              <img
                src={user.picture}
                alt='user-img'
                className='users__user__image'
              />
              <h5 className='users__user__title'>
                {user.title} {user.firstName} {user.lastName}
              </h5>
            </li>
          );
        })}
      </ul>
    </>
  );
};
