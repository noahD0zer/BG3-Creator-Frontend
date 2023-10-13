import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { getOneCharacter, updateCharacter } from './api/characters';
import EditCharacter from './EditCharacter';



const CharacterDetail = ({ user, msgAlert }) => {
  const { id } = useParams();
  const [character, setCharacter] = useState(null);
  const [editModalShow, setEditModalShow] = useState(false);


  useEffect(() => {
    getOneCharacter(id)
      .then((res) => setCharacter(res.data.character))
      .catch((error) => {
        console.error('Error fetching character:', error);
      });
  }, [id]);
  
  const handleEditModalShow = () => {
    setEditModalShow(true);
  };

  const handleEditModalClose = () => {
    setEditModalShow(false);
  };

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

      {/* Expandable section for editing character details */}
      <div>
        <button
          onClick={editModalShow ? handleEditModalClose : handleEditModalShow}
        >
          {editModalShow ? 'Close Edit' : 'Edit'}
        </button>

        {editModalShow && (
          <EditCharacter
            user={user}
            updateCharacter={(updatedCharacter) => {
              updateCharacter(user, updatedCharacter)
                .then(() => {
                  // Show a success message or perform any additional logic
                  msgAlert({
                    heading: 'Character Updated',
                    message: 'Character details have been updated successfully.',
                    variant: 'success',
                  });
                  // Set a timeout to refresh the character details after a short delay
                  setTimeout(() => {
                    getOneCharacter(id)
                      .then((res) => setCharacter(res.data.character))
                      .catch((error) => {
                        console.error('Error fetching character:', error);
                      });
                  }, 1000); // Delay in milliseconds (1 second in this example)
                })
                .catch((error) => {
                  console.error('Error updating character:', error);
                  msgAlert({
                    heading: 'Character Update Failed',
                    message: 'Failed to update character details.',
                    variant: 'danger',
                  });
                });
            }}
            handleClose={() => setEditModalShow(false)}
            triggerRefresh={() => setCharacter(null)}
            character={character}
            msgAlert={msgAlert}
          />
        )}
      </div>
    </div>
  );
};

export default CharacterDetail;
