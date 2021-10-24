import axios from 'axios';
import { getConfig } from '../config';

const { apiOrigin = 'http://13.212.149.23:5555' } = getConfig();

export const fetchPokemon = async (token, id) => {
  const res = await axios.get(`${apiOrigin}/api/pokemon/${id}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return res.data;
};

export const fetchAuth = async (token) => {
  const response = await axios.get(`${apiOrigin}/api/external`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return response.data;
};
