import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { getAllCharacters } from './api/characters';

const CharacterList = ({ user }) => {
  const [characters, setCharacters] = useState(null);

  useEffect(() => {
    getAllCharacters(user)
      .then((response) => {
        setCharacters(response.data.characters); 
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
          {characters.map((character) => { // Use map function on characters
            return (
              <li key={character._id}>
                <p>Name: {character.name}</p>
                <p>Class: {character.characterClass}</p>
                <Link to={`/characters/${character._id}`}>View Details</Link> {/* Use character._id as the link */}
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

