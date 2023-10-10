import React, { useState } from 'react';

function CreateCharacter() {
  const [characterData, setCharacterData] = useState({
    background: '',
    race: '',
    class: '',
    // Add more fields as needed
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setCharacterData({
      ...characterData,
      [name]: value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Send characterData to the server for creation
    // You can use Axios or the fetch API for this purpose
  };

  return (
    <div>
      <h1>Create Character</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="background">Background:</label>
          <input
            type="text"
            id="background"
            name="background"
            value={characterData.background}
            onChange={handleInputChange}
          />
        </div>
        <div>
          <label htmlFor="race">Race:</label>
          <input
            type="text"
            id="race"
            name="race"
            value={characterData.race}
            onChange={handleInputChange}
          />
        </div>
        <div>
          <label htmlFor="class">Class:</label>
          <input
            type="text"
            id="class"
            name="class"
            value={characterData.class}
            onChange={handleInputChange}
          />
        </div>
        {/* Add more input fields for other character attributes */}
        <button type="submit">Create Character</button>
      </form>
    </div>
  );
}

export default CreateCharacter;
