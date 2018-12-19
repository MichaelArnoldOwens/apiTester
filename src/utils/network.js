const axios = require('axios');

// makes a network request
export const sendRequest = ({method, url, data}) => {
  return axios({
    method,
    url,
    data
  })
}
