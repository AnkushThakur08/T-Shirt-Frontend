import { API } from '../../backend';

export const getProducts = async () => {
  return await fetch(`${API}/products`, { method: 'GET' })
    .then((response) => {
      return response.json();
    })
    .catch((error) => console.log(error));
};
