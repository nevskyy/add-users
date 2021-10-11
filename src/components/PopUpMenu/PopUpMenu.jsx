import React, { useState, useEffect } from 'react';
import './PopUpMenu.scss';
import { postData } from '../../API';

export const PopUpMenu = ({ setShowPopUp, setUserDeployed }) => {
  useEffect(() => {
    document.body.style.overflow = 'hidden';

    return () => (document.body.style.overflow = 'unset');
  }, []);

  const [formData, setFormData] = useState({
    title: '',
    firstName: '',
    lastName: '',
    email: '',
    avatar: '',
  });

  const [errorList, setErrorList] = useState({
    title: false,
    firstName: false,
    lastName: false,
    email: false,
    avatar: false,
    onSubmit: false,
  });

  const regExUrl =
    /^(ftp|http|https|chrome|:\/\/|\.|@){2,}(localhost|\d{1,3}\.\d{1,3}\.\d{1,3}\.\d{1,3}|\S*:\w*@)*([a-zA-Z]|(\d{1,3}|\.){7}){1,}(\w|\.{2,}|\.[a-zA-Z]{2,3}|\/|\?|&|:\d|@|=|\/|\(.*\)|#|-|%)*$/gmu;

  const validateEmail = (emailAddress) => {
    let atSymbol = emailAddress.indexOf('@');
    if (atSymbol < 1) return true;

    let dot = emailAddress.indexOf('.');
    if (dot <= atSymbol + 2) return true;

    if (dot === emailAddress.length - 1) return true;

    return false;
  };

  const handleOnChange = (event) => {
    const { name, value } = event.target;

    errorList[name] = false;

    setFormData({ ...formData, [name]: value });
  };

  const handleOnBlur = (event) => {
    const { name, value } = event.target;

    let errorName = false;

    if (!value.length && !['title', 'avatar'].includes(name)) {
      errorName = true;
    } else if (name === 'email' && validateEmail(value)) {
      errorName = true;
    } else if (name === 'avatar' && !value.match(regExUrl) && value.length) {
      errorName = true;
    }

    errorName && setErrorList({ ...errorList, [name]: true });
  };

  const resetFormData = () => {
    setFormData({
      title: '',
      firstName: '',
      lastName: '',
      email: '',
      avatar: '',
    });

    setErrorList({
      title: false,
      firstName: false,
      lastName: false,
      email: false,
      avatar: false,
    });

    setShowPopUp(false);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    console.log(formData);
    const response = postData(undefined, undefined, formData).then((data) => {
      console.log(data, data.ok, typeof data.ok);
      setUserDeployed(data.ok);
    });

    resetFormData();
    setShowPopUp(false);

    console.log(response);

    setTimeout(() => {
      setUserDeployed('');
    }, 3000);
  };

  return (
    <div
      className='popup-menu'
      onClick={(event) =>
        event.target === event.currentTarget && resetFormData()
      }
    >
      <form action='submit' className='add-user-form' onSubmit={handleSubmit}>
        <div className='add-user-form__wrapper'>
          <label htmlFor='title' className='add-user-form__label'>
            Title:
          </label>
          <select
            type='text'
            name='title'
            className='add-user-form__input'
            onChange={handleOnChange}
            value={formData.title}
            onBlur={handleOnBlur}
          >
            {['', 'mr', 'mrs', 'ms', 'miss', 'dr'].map((title) => {
              return <option key={title}>{title}</option>;
            })}
          </select>

          <h5 className='add-user-form__error'>
            {errorList.title
              ? 'Please enter title(mr, mrs, ms, miss, dr) or leave field empty'
              : ''}
          </h5>
        </div>

        <div className='add-user-form__wrapper'>
          <label htmlFor='firstName' className='add-user-form__label'>
            First Name*:
          </label>
          <input
            type='text'
            name='firstName'
            className='add-user-form__input'
            onChange={handleOnChange}
            value={formData.firstName}
            onBlur={handleOnBlur}
            style={
              errorList.firstName
                ? { borderColor: 'red' }
                : { borderColor: 'grey' }
            }
          />
          <h5 className='add-user-form__error'>
            {errorList.firstName ? 'You should enter the first name' : ''}
          </h5>
        </div>

        <div className='add-user-form__wrapper'>
          <label htmlFor='lastName' className='add-user-form__label'>
            Last Name*:
          </label>
          <input
            type='text'
            name='lastName'
            className='add-user-form__input'
            onChange={handleOnChange}
            value={formData.lastName}
            onBlur={handleOnBlur}
            style={
              errorList.lastName
                ? { borderColor: 'red' }
                : { borderColor: 'grey' }
            }
          />
          <h5 className='add-user-form__error'>
            {errorList.lastName ? 'You should enter the last name' : ''}
          </h5>
        </div>

        <div className='add-user-form__wrapper'>
          <label htmlFor='email' className='add-user-form__label'>
            E-mail*:
          </label>
          <input
            type='text'
            name='email'
            className='add-user-form__input'
            onChange={handleOnChange}
            value={formData.email}
            onBlur={handleOnBlur}
            style={
              errorList.email ? { borderColor: 'red' } : { borderColor: 'grey' }
            }
          />
          <h5 className='add-user-form__error'>
            {errorList.email ? 'You should enter correct email' : ''}
          </h5>
        </div>

        <div className='add-user-form__wrapper'>
          <label htmlFor='avatar' className='add-user-form__label'>
            Avatar:
          </label>
          <input
            type='text'
            name='avatar'
            className='add-user-form__input'
            onChange={handleOnChange}
            value={formData.avatar}
            onBlur={handleOnBlur}
            style={
              errorList.avatar
                ? { borderColor: 'red' }
                : { borderColor: 'grey' }
            }
          />
          <h5 className='add-user-form__error'>
            {errorList.avatar ? 'Enter correct url or leave fiel empty' : ''}
          </h5>
        </div>
        <h6 className='add-user-form__mandatory-fields'>*Mandatory fields</h6>

        <button
          className={'add-user-form__button'}
          disabled={
            !formData.firstName ||
            !formData.lastName ||
            !formData.email ||
            Object.values(errorList).includes(true)
          }
        >
          Add User
        </button>
        <button className='add-user-form__close-button' onClick={resetFormData}>
          &#x2715;
        </button>
      </form>
    </div>
  );
};
