import React, { useState, useEffect } from 'react';
import { getAllCharacters } from './api/characters';

const CharacterList = ({ user }) => {
  const [characters, setCharacters] = useState(null);

  useEffect(() => {
    getAllCharacters(user)
      .then((response) => {
        setCharacters(response.data.characters); // Assuming the characters are stored in a 'characters' property
      })
      .catch((error) => {
        console.error('Error fetching characters:', error);
      });
  }, [user]);

  return (
    <div>
      <h1>Your Characters</h1>
      {characters ? (
        <ul>
          {Object.keys(characters).map((characterId) => {
            const character = characters[characterId];
            return (
              <li key={characterId}>
                <p>Name: {character.name}</p>
                <p>Class: {character.characterClass}</p>
              </li>
            );
          })}
        </ul>
      ) : (
        <p>Loading characters...</p>
      )}
    </div>
  );
};

export default CharacterList;
