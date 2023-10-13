// CharacterDetail.js
import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { getOneCharacter } from './api/characters';

const CharacterDetail = () => {
  const { id } = useParams(); // Get the character ID from the URL
  const [character, setCharacter] = useState(null);

  useEffect(() => {
    // Fetch the character details using the API function
    getOneCharacter(id)
      .then((response) => {
        setCharacter(response.data.character);
      })
      .catch((error) => {
        console.error('Error fetching character:', error);
      });
  }, [id]);

  if (!character) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <h1>Character Details</h1>
      <p>Name: {character.name}</p>
      <p>Background: {character.background}</p>
      <p>Race: {character.race}</p>
      <p>Class: {character.characterClass}</p>

      <div>
        <h2>Weapon Proficiencies</h2>
        <ul>
          {character.weaponProficiencies.map((proficiency, index) => (
            <li key={index}>{proficiency}</li>
          ))}
        </ul>
      </div>

      <div>
        <h2>Armor Proficiencies</h2>
        <ul>
          {character.armorProficiencies.map((proficiency, index) => (
            <li key={index}>{proficiency}</li>
          ))}
        </ul>
      </div>

      <div>
        <h2>Skill Proficiencies</h2>
        <ul>
          {character.skillProficiencies.map((proficiency, index) => (
            <li key={index}>{proficiency}</li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default CharacterDetail;