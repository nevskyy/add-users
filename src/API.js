const BASE_URL = 'https://dummyapi.io/data/v1/';

const headers = {
  'app-id': '6154537832884b1a024b2f3c',
  'Content-Type': 'application/json',
};

export const getData = (endPoint = 'user', method = 'GET', page=0) => {
  return fetch(`${BASE_URL}${endPoint}?page=${page}&limit=15`, {
    method,
    headers,
  })
    .then(response => {
      if (!response.ok) {
        throw Error(response.status)
      }
      return (
        response.json()
      )
    })
    .then((data) => {
      return data.data;
    })
};

export const postData = (endPoint='user/create', method = 'POST', data) => {
  return fetch (`${BASE_URL}${endPoint}`, {
    method,
    headers,
    body: JSON.stringify(data)
  })
    .then(res => {
      return res;
    }).catch(err => err)
}
