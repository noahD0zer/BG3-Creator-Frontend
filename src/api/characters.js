import apiUrl from '../apiConfig'
import axios from 'axios'

export const getAllCharacters = (user) => {
    return axios(`${apiUrl}/characters/mine`, {
      headers: {
        Authorization: `Token token=${user.token}`,
      },
    });
  }

// READ -> Show
export const getOneCharacter = (id) => {
    return axios(`${apiUrl}/characters/${id}`)
}

// CREATE -> Add Character
export const createCharacter = (user, newCharacter) => {
    return axios({
        url: `${apiUrl}/characters`,
        method: 'POST',
        headers: {
            Authorization: `Token token=${user.token}`
        },
        data: { character: newCharacter }
    })
}
// UPDATE -> Change Character
export const updateCharacter = (user, updatedCharacter) => {
    return axios({
        url: `${apiUrl}/pets/${updatedCharacter._id}`,
        method: 'PATCH',
        headers: {
            Authorization: `Token token=${user.token}`
        },
        data: { character: updatedCharacter }
    })
}

// DELETE -> Delete Character
export const removeCharacter = (user, characterId) => {
    return axios({
        url: `${apiUrl}/pets/${characterId}`,
        method: 'DELETE',
        headers: {
            Authorization: `Token token=${user.token}`
        }
    })
}