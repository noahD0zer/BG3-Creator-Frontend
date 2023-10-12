import apiUrl from '../apiConfig'; // Make sure to import the correct API URL
import axios from 'axios';

// Fetch proficiencies
export const getProficiencies = () => {
  return axios({
    url: `${apiUrl}/proficiencies`,
    method: 'GET',
  });
};
