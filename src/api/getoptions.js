import apiUrl from '../apiConfig';
import axios from 'axios';

// Fetch backgrounds
export const getBackgrounds = () => {
  return axios({
    url: `${apiUrl}/backgrounds`,
    method: 'GET',
  });
};

// Fetch races
export const getRaces = () => {
  return axios({
    url: `${apiUrl}/races`,
    method: 'GET',
  });
};

// Fetch classes
export const getClasses = () => {
  return axios({
    url: `${apiUrl}/classes`,
    method: 'GET',
  });
};

// Fetch proficiencies
export const getProficiencies = () => {
    return axios({
      url: `${apiUrl}/proficiencies`,
      method: 'GET',
    });
};
  