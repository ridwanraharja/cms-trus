import axios from 'axios';

axios.defaults.baseURL = process.env.VITE_BASE_URL;
axios.defaults.timeout = 120000;
axios.defaults.withCredentials = true;

export const query = async (method: string, url: string, data?: any) => {
  switch (method) {
    case 'GET':
      const getResponse = await axios
        .get(url)
        .then((response) => {
          return response.data;
        })
        .catch((error) => {
          throw error.response.data;
        });
      return getResponse;

    case 'POST':
      const postResponse = await axios
        .post(url, data)
        .then((response) => {
          return response.data;
        })
        .catch((error) => {
          throw error.response.data;
        });
      return postResponse;

    case 'PUT':
      const putResponse = await axios
        .put(url, data)
        .then((response) => {
          return response.data;
        })
        .catch((error) => {
          throw error.response.data;
        });
      return putResponse;

    case 'DELETE':
      const deleteResponse = await axios
        .delete(url)
        .then((response) => {
          return response.data;
        })
        .catch((error) => {
          throw error.response.data;
        });
      return deleteResponse;
  }
};
