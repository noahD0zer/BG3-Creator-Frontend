import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { getAllCharacters, removeCharacter } from './api/characters'; // Import the removeCharacter function

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

  const handleDelete = (characterId) => {
    removeCharacter(user, characterId) // Use the removeCharacter function
      .then(() => {
        // Refresh the character list after deletion
        getAllCharacters(user)
          .then((response) => {
            setCharacters(response.data.characters);
          })
          .catch((error) => {
            console.error('Error fetching characters:', error);
          });
      })
      .catch((error) => {
        console.error('Error deleting character:', error);
      });
  };

  return (
    <div>
      <h1>Your Characters</h1>
      {characters ? (
        <ul>
          {characters.map((character) => (
            <li key={character._id}>
              <p>Name: {character.name}</p>
              <p>Class: {character.characterClass}</p>
              <Link to={`/characters/${character._id}`}>View Details</Link>
              <button onClick={() => handleDelete(character._id)}>Delete</button> 
            </li>
          ))}
        </ul>
      ) : (
        <p>Loading characters...</p>
      )}
    </div>
  );
};

export default CharacterList;
