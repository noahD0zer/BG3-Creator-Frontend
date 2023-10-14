import React, { useState, useEffect } from 'react';
import { updateCharacter } from '../../api/characters';
import { getBackgrounds, getClasses, getRaces, getProficiencies } from '../../api/getoptions';



const EditCharacter = (props) => {
  const { user, character, msgAlert, triggerRefresh } = props;

  const [characterData, setCharacterData] = useState(character);
  const [backgrounds, setBackgrounds] = useState([]);
  const [classes, setClasses] = useState([]);
  const [races, setRaces] = useState([]);
  const [proficiencies, setProficiencies] = useState([]);

  useEffect(() => {
    getBackgrounds()
      .then((res) => {
        setBackgrounds(res.data);
      })
      .catch((error) => console.error('Error fetching backgrounds:', error));

    getClasses()
      .then((res) => {
        setClasses(res.data);
      })
      .catch((error) => console.error('Error fetching classes:', error));

    getRaces()
      .then((res) => {
        setRaces(res.data);
      })
      .catch((error) => console.error('Error fetching races:', error));

    getProficiencies()
      .then((res) => {
        setProficiencies(res.data);
      })
      .catch((error) => console.error('Error fetching proficiencies:', error));
  }, []);


  const updateCharacterDetails = () => {
    console.log('this is character data', characterData)
    updateCharacter(user, characterData)
      .then((response) => {
        msgAlert({
          heading: 'Character Updated',
          message: 'Character details have been updated successfully.',
          variant: 'success',
        });
        setCharacterData(response.data.character);
        triggerRefresh();
      })
      .catch((error) => {
        console.error('Error updating character:', error);
        msgAlert({
          heading: 'Character Update Failed',
          message: 'Failed to update character details.',
          variant: 'danger',
        });
      });
  };

  if (!characterData) {
    return (<div>Loading...</div>)
  }

  return (
    <div>
      <h1>Edit Character</h1>
      <div>
        <label htmlFor="name">Name</label>
        <input
          id="name"
          value={characterData.name}
          onChange={(e) => setCharacterData({ ...characterData, name: e.target.value })}
        />
      </div>
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
      <div>
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            cursor: 'pointer',
          }}
        >
          <span style={{ marginRight: '8px' }}>Weapon Proficiency 1:</span>
          <select
            value={characterData.weaponProficiencies[0]}
            onChange={(e) => setCharacterData({ ...characterData, weaponProficiencies: [e.target.value, ...characterData.weaponProficiencies.slice(1)] })}
          >
            <option value="">Select a Weapon Proficiency</option>
            {proficiencies.map((proficiency) => (
              proficiency.proficiencyType === 'weapon' && (
                <option key={proficiency._id.$oid} value={proficiency.proficiencyName}>
                  {proficiency.proficiencyName}
                </option>
              )
            ))}
          </select>
        </div>
      </div>
      <div>
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            cursor: 'pointer',
          }}
        >
          <span style={{ marginRight: '8px' }}>Weapon Proficiency 2:</span>
          <select
            value={characterData.weaponProficiencies[1]}
            onChange={(e) => setCharacterData({ ...characterData, weaponProficiencies: [characterData.weaponProficiencies[0], e.target.value, ...characterData.weaponProficiencies.slice(2)] })}
          >
            <option value="">Select a Weapon Proficiency</option>
            {proficiencies.map((proficiency) => (
              proficiency.proficiencyType === 'weapon' && (
                <option key={proficiency._id.$oid} value={proficiency.proficiencyName}>
                  {proficiency.proficiencyName}
                </option>
              )
            ))}
          </select>
        </div>
      </div>
      <div>
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            cursor: 'pointer',
          }}
        >
          <span style={{ marginRight: '8px' }}>Weapon Proficiency 3:</span>
          <select
            value={characterData.weaponProficiencies[2]}
            onChange={(e) => setCharacterData({ ...characterData, weaponProficiencies: characterData.weaponProficiencies.slice(0, 2).concat(e.target.value) })}
          >
            <option value="">Select a Weapon Proficiency</option>
            {proficiencies.map((proficiency) => (
              proficiency.proficiencyType === 'weapon' && (
                <option key={proficiency._id.$oid} value={proficiency.proficiencyName}>
                  {proficiency.proficiencyName}
                </option>
              )
            ))}
          </select>
        </div>
      </div>
      
      <div>
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            cursor: 'pointer',
          }}
        >
          <span style={{ marginRight: '8px' }}>Armor Proficiency 1:</span>
          <select
            value={characterData.armorProficiencies[0]}
            onChange={(e) => setCharacterData({ ...characterData, armorProficiencies: [e.target.value, ...characterData.armorProficiencies.slice(1)] })}
          >
            <option value="">            Select an Armor Proficiency
          </option>
          {proficiencies.map((proficiency) => (
            proficiency.proficiencyType === 'armor' && (
              <option key={proficiency._id.$oid} value={proficiency.proficiencyName}>
                {proficiency.proficiencyName}
              </option>
            )
          ))}
        </select>
      </div>
    </div>
    <div>
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          cursor: 'pointer',
        }}
      >
        <span style={{ marginRight: '8px' }}>Armor Proficiency 2:</span>
        <select
          value={characterData.armorProficiencies[1]}
          onChange={(e) => setCharacterData({ ...characterData, armorProficiencies: [characterData.armorProficiencies[0], e.target.value, ...characterData.armorProficiencies.slice(2)] })}
        >
          <option value="">Select an Armor Proficiency</option>
          {proficiencies.map((proficiency) => (
            proficiency.proficiencyType === 'armor' && (
              <option key={proficiency._id.$oid} value={proficiency.proficiencyName}>
                {proficiency.proficiencyName}
              </option>
            )
          ))}
        </select>
      </div>
    </div>
    <div>
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          cursor: 'pointer',
        }}
      >
        <span style={{ marginRight: '8px' }}>Armor Proficiency 3:</span>
        <select
          value={characterData.armorProficiencies[2]}
          onChange={(e) => setCharacterData({ ...characterData, armorProficiencies: characterData.armorProficiencies.slice(0, 2).concat(e.target.value) })}
        >
          <option value="">Select an Armor Proficiency</option>
          {proficiencies.map((proficiency) => (
            proficiency.proficiencyType === 'armor' && (
              <option key={proficiency._id.$oid} value={proficiency.proficiencyName}>
                {proficiency.proficiencyName}
              </option>
            )
          ))}
        </select>
      </div>
    </div>
    
    <div>
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          cursor: 'pointer',
        }}
      >
        <span style={{ marginRight: '8px' }}>Skill Proficiency 1:</span>
        <select
          value={characterData.skillProficiencies[0]}
          onChange={(e) => setCharacterData({ ...characterData, skillProficiencies: [e.target.value, ...characterData.skillProficiencies.slice(1)] })}
        >
          <option value="">Select a Skill Proficiency</option>
          {proficiencies.map((proficiency) => (
            proficiency.proficiencyType === 'skill' && (
              <option key={proficiency._id.$oid} value={proficiency.proficiencyName}>
                {proficiency.proficiencyName}
              </option>
            )
          ))}
        </select>
      </div>
    </div>
    <div>
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          cursor: 'pointer',
        }}
      >
        <span style={{ marginRight: '8px' }}>Skill Proficiency 2:</span>
        <select
          value={characterData.skillProficiencies[1]}
          onChange={(e) => setCharacterData({ ...characterData, skillProficiencies: [characterData.skillProficiencies[0], e.target.value, ...characterData.skillProficiencies.slice(2)] })}
        >
          <option value="">Select a Skill Proficiency</option>
          {proficiencies.map((proficiency) => (
            proficiency.proficiencyType === 'skill' && (
              <option key={proficiency._id.$oid} value={proficiency.proficiencyName}>
                {proficiency.proficiencyName}
              </option>
            )
          ))}
        </select>
      </div>
    </div>
    <div>
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          cursor: 'pointer',
        }}
      >
        <span style={{ marginRight: '8px' }}>Skill Proficiency 3:</span>
        <select
          value={characterData.skillProficiencies[2]}
          onChange={(e) => setCharacterData({ ...characterData, skillProficiencies: [characterData.skillProficiencies[0], characterData.skillProficiencies[1], e.target.value, ...characterData.skillProficiencies.slice(3)] })}
        >
          <option value="">Select a Skill Proficiency</option>
          {proficiencies.map((proficiency) => (
            proficiency.proficiencyType === 'skill' && (
              <option key={proficiency._id.$oid} value={proficiency.proficiencyName}>
                {proficiency.proficiencyName}
              </option>
            )
          ))}
        </select>
      </div>
    </div>
    <div>
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          cursor: 'pointer',
        }}
      >
        <span style={{ marginRight: '8px' }}>Skill Proficiency 4:</span>
        <select
          value={characterData.skillProficiencies[3]}
          onChange={(e) => setCharacterData({ ...characterData, skillProficiencies: characterData.skillProficiencies.slice(0, 3).concat(e.target.value) })}
        >
          <option value="">Select a Skill Proficiency</option>
          {proficiencies.map((proficiency) => (
            proficiency.proficiencyType === 'skill' && (
              <option key={proficiency._id.$oid} value={proficiency.proficiencyName}>
                {proficiency.proficiencyName}
              </option>
            )
          ))}
        </select>
      </div>
    </div>
    <div>
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          cursor: 'pointer',
        }}
      >
        <span style={{ marginRight: '8px' }}>Skill Proficiency 5:</span>
        <select
          value={characterData.skillProficiencies[4]}
          onChange={(e) => setCharacterData({ ...characterData, skillProficiencies: characterData.skillProficiencies.slice(0, 4).concat(e.target.value) })}
        >
          <option value="">Select a Skill Proficiency</option>
          {proficiencies.map((proficiency) => (
            proficiency.proficiencyType === 'skill' && (
              <option key={proficiency._id.$oid} value={proficiency.proficiencyName}>
                {proficiency.proficiencyName}
              </option>
            )
          ))}
        </select>
      </div>
    </div>
    <div>
      <button onClick={updateCharacterDetails}>Update Character</button>
    </div>
  </div>
);
};

export default EditCharacter;

