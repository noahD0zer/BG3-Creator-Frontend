import React, { useState, useEffect } from 'react';
import { getBackgrounds, getClasses, getRaces, getProficiencies } from './api/getoptions';

function CreateCharacter() {
  const [characterData, setCharacterData] = useState({
    background: '',
    race: '',
    characterClass: '',
    // Add more fields for abilities, proficiencies, etc.
  });

  const [isBackgroundExpanded, setIsBackgroundExpanded] = useState(false);
  const [isRaceExpanded, setIsRaceExpanded] = useState(false);
  const [isClassExpanded, setIsClassExpanded] = useState(false);

  const [backgrounds, setBackgrounds] = useState([]); // To store background data
  const [classes, setClasses] = useState([]); // To store class data
  const [races, setRaces] = useState([]); // To store race data

  const handleButtonClick = (selectedValue, field) => {
    setCharacterData({
      ...characterData,
      [field]: selectedValue,
    });
    switch (field) {
      case 'background':
        setIsBackgroundExpanded(false);
        break;
      case 'race':
        setIsRaceExpanded(false);
        break;
      case 'characterClass':
        setIsClassExpanded(false);
        break;
      default:
        break;
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Send characterData to the server for creation
    // use fetch API
  };

  const toggleExpansion = (field) => {
    switch (field) {
      case 'background':
        setIsBackgroundExpanded(!isBackgroundExpanded);
        setIsRaceExpanded(false); // Collapse other sections
        setIsClassExpanded(false);
        break;
      case 'race':
        setIsRaceExpanded(!isRaceExpanded);
        setIsBackgroundExpanded(false); // Collapse other sections
        setIsClassExpanded(false);
        break;
      case 'characterClass':
        setIsClassExpanded(!isClassExpanded);
        setIsBackgroundExpanded(false); // Collapse other sections
        setIsRaceExpanded(false);
        break;
      default:
        break;
    }
  };

  useEffect(() => {
    // Fetch background data from your backend API
      getBackgrounds()
        .then(res => setBackgrounds(res.data))
        .catch((error) => console.error('Error fetching backgrounds:', error));
  }, []);
  console.log("backgrounds", backgrounds)
  
  useEffect(() => {
    // Fetch class data from backend API
      getClasses()
        .then(res => setClasses(res.data))
        .catch((error) => console.error('Error fetching classes:', error));
  }, []);
  console.log("classes", classes)
  
  useEffect(() => {
    // Fetch race data from backend API
      getRaces()
        .then(res => setRaces(res.data))
        .catch((error) => console.error('Error fetching races:', error));
  }, []);
  console.log("races",races)
  
  // const generateButtonRows = (options, field) => {
  //   const rows = [];
  //   for (let i = 0; i < Math.ceil(options.length / 4); i++) {
  //     const row = (
  //       <div key={i} style={{ display: 'flex' }}>
  //         {options.slice(i * 4, (i + 1) * 4).map((option) => (
  //           <button
  //             key={option}
  //             onClick={() => handleButtonClick(option, field)}
  //             style={{ margin: '4px' }}
  //           >
  //             {option}
  //           </button>
  //         ))}
  //       </div>
  //     );
  //     rows.push(row);
  //   }
  //   return rows;
  // };

  return (
    <div>
      <h1>Create Character</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              cursor: 'pointer',
            }}
            onClick={() => toggleExpansion('background')}
          >
            <span style={{ marginRight: '8px' }}>Background</span>
            {isBackgroundExpanded ? '▲' : '▼'}
          </div>
          {isBackgroundExpanded && (
            <select
              value={characterData.background}
              onChange={(e) => handleButtonClick(e.target.value, 'background')}
            >
              <option value="">Select a Background</option>
              {backgrounds.map((bg) => (
                <option key={bg.id} value={bg.background}>
                  {bg.background}
                </option>
              ))}
            </select>
          )}
        </div>

        <div>
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              cursor: 'pointer',
            }}
            onClick={() => toggleExpansion('race')}
          >
            <span style={{ marginRight: '8px' }}>Race</span>
            {isRaceExpanded ? '▲' : '▼'}
          </div>
          {isRaceExpanded && (
            <select
              value={characterData.race}
              onChange={(e) => handleButtonClick(e.target.value, 'race')}
            >
              <option value="">Select a Race</option>
              {races.map((race) => (
                <option key={race.id} value={race.race}>
                  {race.race}
                </option>
              ))}
            </select>
          )}
        </div>

        <div>
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              cursor: 'pointer',
            }}
            onClick={() => toggleExpansion('characterClass')}
          >
            <span style={{ marginRight: '8px' }}>Class</span>
            {isClassExpanded ? '▲' : '▼'}
          </div>
          {isClassExpanded && (
            <select
              value={characterData.characterClass}
              onChange={(e) => handleButtonClick(e.target.value, 'characterClass')}
            >
              <option value="">Select a Class</option>
              {classes.map((cls) => (
                <option key={cls.id} value={cls.class}>
                  {cls.class}
                </option>
              ))}
            </select>
          )}
        </div>

        {/* Other fields for abilities, proficiencies, etc. */}
        <button type="submit">Create Character</button>
      </form>
    </div>
  );
}

export default CreateCharacter;
         
