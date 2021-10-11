import React, { useState, useEffect } from 'react';
import './App.scss';
import { Users } from './components/Users';
import { getData } from './API';
import { Spinner } from './components/Spinner';
import { Error } from './components/Error';
import { PopUpMenu } from './components/PopUpMenu';
import { MessageOnSubmit } from './components/MessageOnSubmit';

function App() {
  const [page, setPage] = useState(0);
  const [users, setUsers] = useState([]);
  const [error, setError] = useState(false);
  const [showPopUp, setShowPopUp] = useState(false);
  const [userDeployed, setUserDeployed] = useState('');

  useEffect(() => {
    getData()
      .then((data) => setUsers(data))
      .catch((error) => setError(true));
  }, []);

  useEffect(() => {
    getData(undefined, undefined, page).then((data) => {
      setUsers([...users, ...data]);
    });
  }, [page]);

  return (
    <div className='App'>
      <header className='header'>
        <div className='controll-buttons'>
          <button
            className='controll-buttons__button controll-buttons__button--load-user'
            onClick={() => setPage(page + 1)}
            name='controll-buttons__load-user'
          >
            Load more users
          </button>
          <button
            className='controll-buttons__button controll-buttons__button--add-user'
            onClick={() => setShowPopUp(true)}
            disabled={showPopUp}
          >
            Add user
          </button>
        </div>
      </header>

      <main className='main'>
        {showPopUp && (
          <PopUpMenu
            setShowPopUp={setShowPopUp}
            setUserDeployed={setUserDeployed}
          />
        )}

        {!users.length && !error && <Spinner />}
        {!!users.length && <Users users={users} />}
        {error && <Error />}
        <MessageOnSubmit userDeployed={userDeployed} />
      </main>

      {/* <footer className='footer'>contact details</footer> */}
    </div>
  );
}

export default App;
