import React, { useState, useEffect } from 'react';
import { getBackgrounds, getClasses, getRaces, getProficiencies } from '../../api/getoptions';
import {createCharacter} from '../../api/characters';
import { createCharacterSucess, createCharacterFailure } from '../shared/AutoDismissAlert/messages';



const CreateCharacter = (props) => {
  const { user, msgAlert } = props;
  //console.log(user);

  const [characterData, setCharacterData] = useState({
    name: '',
    background: '',
    race: '',
    characterClass: '',
    weaponProficiencies: ['','',''],
    armorProficiencies: ['','',''],
    skillProficiencies: ['','','','',''],
    // Add more fields for abilities, proficiencies, etc.
  });

  const [backgrounds, setBackgrounds] = useState([]);
  const [classes, setClasses] = useState([]);
  const [races, setRaces] = useState([]);
  const [proficiencies, setProficiencies] = useState([]);

  useEffect(() => {
    getBackgrounds()
      .then(res => {
        setBackgrounds(res.data);
      })
    .catch((error) => console.error('Error fetching backgrounds:', error));
    
    getClasses()
      .then(res => {
        setClasses(res.data);
      })
    .catch((error) => console.error('Error fetching classes:', error));
    
    getRaces()
      .then(res => {
        setRaces(res.data);
      })
    .catch((error) => console.error('Error fetching races:', error));

    getProficiencies()
    .then(res => {
      setProficiencies(res.data);
    })
    .catch((error) => console.error('Error fetching proficiencies:', error));
    
  }, []);
  // console.log("backgrounds", backgrounds);
  // console.log("classes", classes);
  // console.log("races", races);
  // console.log("proficiencies", proficiencies);


  const handleProficiencySelect = (e, proficiencyType, index) => {
    const selectedValue = e.target.value;
    setCharacterData((prevData) => ({
      ...prevData,
      [proficiencyType]: [
        ...prevData[proficiencyType].slice(0, index),
        selectedValue,
        ...prevData[proficiencyType].slice(index + 1),
      ],
    }));
  };

  const onSubmit = (e) => {
    e.preventDefault()

    console.log(characterData)

    createCharacter(user,characterData)
        .then(() => {
          console.log('Character created:');
            msgAlert({
                heading: 'Character Created',
                message: createCharacterSucess,
                variant: 'success'
            })
        })
        .catch((error) => {
          console.error('Error creating character:', error);
             msgAlert({
                 heading: 'Character Creation Failed',
                 message: createCharacterFailure,
                 variant: 'fail'
            })
        })
  }
  
  return (
    <div>
      <h1>Create Character</h1>
      <form onSubmit={onSubmit}>
        <div>
        <label htmlFor="name">Name</label>
          <input 
          id="name"
          value={characterData.name}
          onChange={(e) => setCharacterData({ ...characterData, name: e.target.value })}
          ></input>
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
              onChange={(e) => handleProficiencySelect(e, 'weaponProficiencies', 0)}
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
              onChange={(e) => handleProficiencySelect(e, 'weaponProficiencies', 1)}
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
              onChange={(e) => handleProficiencySelect(e, 'weaponProficiencies', 2)}
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
              onChange={(e) => handleProficiencySelect(e, 'armorProficiencies', 0)}
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
            <span style={{ marginRight: '8px' }}>Armor Proficiency 2:</span>
            <select
              value={characterData.armorProficiencies[1]}
              onChange={(e) => handleProficiencySelect(e, 'armorProficiencies', 1)}
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
              onChange={(e) => handleProficiencySelect(e, 'armorProficiencies', 2)}
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
              onChange={(e) => handleProficiencySelect(e, 'skillProficiencies', 0)}
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
              onChange={(e) => handleProficiencySelect(e, 'skillProficiencies', 1)}
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
              onChange={(e) => handleProficiencySelect(e, 'skillProficiencies', 2)}
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
              onChange={(e) => handleProficiencySelect(e, 'skillProficiencies', 3)}
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
              onChange={(e) => handleProficiencySelect(e, 'skillProficiencies', 4)}
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


        {/* Other fields for abilities, proficiencies, etc. */}
        <button type="submit">Create Character</button>
      </form>
    </div>
  );
}

export default CreateCharacter;
