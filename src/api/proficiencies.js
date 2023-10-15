import apiUrl from '../apiConfig';
import axios from 'axios';

// Fetch proficiencies
export const getProficiencies = () => {
  return axios({
    url: `${apiUrl}/proficiencies`,
    method: 'GET',
  });
};
