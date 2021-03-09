const baseURL = 'http://localhost:3001/api/v1/urls';

export const getUrls = () => {
  return fetch(baseURL)
    .then(response => {
      if (response.ok) {
        return response.json()
      }
    })
}

export const addUrls = (url) => {
  const options = {
    method: 'POST',
    headers: {
      'Content-type': 'application/json'
    },
    body: JSON.stringify(url)
  };

  return fetch(baseURL, options)
    .then(response => {
      if (response.ok) {
        return response.json()
      }
    })
}
