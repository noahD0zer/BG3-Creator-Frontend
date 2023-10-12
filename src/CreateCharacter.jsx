import React, { useState, useEffect } from 'react';
import { getBackgrounds, getClasses, getRaces, getProficiencies } from './api/getoptions';

function CreateCharacter() {
  const [characterData, setCharacterData] = useState({
    background: '',
    race: '',
    characterClass: '',
    // Add more fields for abilities, proficiencies, etc.
  });

  const [backgrounds, setBackgrounds] = useState([]);
  const [classes, setClasses] = useState([]);
  const [races, setRaces] = useState([]);

  useEffect(() => {
    getBackgrounds()
      .then(res => {
        setBackgrounds(res.data);
        console.log("backgrounds", res.data);
      })
      .catch((error) => console.error('Error fetching backgrounds:', error));
  }, []);

  useEffect(() => {
    getClasses()
      .then(res => {
        setClasses(res.data);
        console.log("classes", res.data);
      })
      .catch((error) => console.error('Error fetching classes:', error));
  }, []);

  useEffect(() => {
    getRaces()
      .then(res => {
        setRaces(res.data);
        console.log("races", res.data);
      })
      .catch((error) => console.error('Error fetching races:', error));
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    // Send characterData to the server for creation
    // Use the fetch API or any other method for this
  };

  return (
    <div>
      <h1>Create Character</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="background">Background:</label>
          <select
            id="background"
            value={characterData.background}
            onChange={(e) => setCharacterData({ ...characterData, background: e.target.value })}
          >
            <option value="">Select a Background</option>
            {backgrounds.map((bg) => (
              <option key={bg.id} value={bg.background}>
                {bg.background}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label htmlFor="race">Race:</label>
          <select
            id="race"
            value={characterData.race}
            onChange={(e) => setCharacterData({ ...characterData, race: e.target.value })}
          >
            <option value="">Select a Race</option>
            {races.map((race) => (
              <option key={race.id} value={race.race}>
                {race.race}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label htmlFor="characterClass">Class:</label>
          <select
            id="characterClass"
            value={characterData.characterClass}
            onChange={(e) => setCharacterData({ ...characterData, characterClass: e.target.value })}
          >
            <option value="">Select a Class</option>
            {classes.map((cls) => (
              <option key={cls.id} value={cls.class}>
                {cls.class}
              </option>
            ))}
          </select>
        </div>

        {/* Other fields for abilities, proficiencies, etc. */}
        <button type="submit">Create Character</button>
      </form>
    </div>
  );
}

export default CreateCharacter;
