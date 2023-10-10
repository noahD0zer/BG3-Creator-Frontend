import React, { useState } from 'react';

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

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setCharacterData({
      ...characterData,
      [name]: value,
    });
  };

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
    // You can use Axios or the fetch API for this purpose
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

  // Define arrays of options (replace with your actual data)
  const backgroundOptions = Array.from({ length: 11 }, (_, i) => `Background ${i + 1}`);
  const raceOptions = Array.from({ length: 8 }, (_, i) => `Race ${i + 1}`);
  const classOptions = Array.from({ length: 12 }, (_, i) => `Class ${i + 1}`);

  const generateButtonRows = (options, field) => {
    const rows = [];
    for (let i = 0; i < Math.ceil(options.length / 4); i++) {
      const row = (
        <div key={i} style={{ display: 'flex' }}>
          {options.slice(i * 4, (i + 1) * 4).map((option) => (
            <button
              key={option}
              onClick={() => handleButtonClick(option, field)}
              style={{ margin: '4px' }}
            >
              {option}
            </button>
          ))}
        </div>
      );
      rows.push(row);
    }
    return rows;
  };

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
          {isBackgroundExpanded && <div>{generateButtonRows(backgroundOptions, 'background')}</div>}
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
          {isRaceExpanded && <div>{generateButtonRows(raceOptions, 'race')}</div>}
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
          {isClassExpanded && <div>{generateButtonRows(classOptions, 'characterClass')}</div>}
        </div>

        {/* Other fields for abilities, proficiencies, etc. */}
        <button type="submit">Create Character</button>
      </form>
    </div>
  );
}

export default CreateCharacter;
