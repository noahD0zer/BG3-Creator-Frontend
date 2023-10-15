import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom'
import { updateCharacter } from '../../api/characters';
import { getBackgrounds, getClasses, getRaces, getProficiencies } from '../../api/getoptions';
import { Button, Card, CardBody, Col, Row, Container, Form, FormLabel, FormGroup, FormControl, Dropdown, DropdownToggle, DropdownItem, DropdownMenu } from 'react-bootstrap'



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

  const navigate = useNavigate()

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
        navigate(`/character-list`)
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
    <Form className="m-3">
      <FormGroup className='m-2'>
        <FormLabel htmlFor="name">Name</FormLabel>
        <FormControl
          id="name"
          value={characterData.name}
          onChange={(e) => setCharacterData({ ...characterData, name: e.target.value })}
        />
      </FormGroup>
      
      <Row>

        <Col>

          <FormLabel className='ms-2'>Background</FormLabel>

          <FormGroup className='ms-2'>
            <Dropdown
              id="background"
              value={characterData.background}
              onSelect={(key) => setCharacterData({ ...characterData, background: key })}
            >
              <DropdownToggle id="dropdown-basic">
                {characterData.background || 'Select a Background'}
              </DropdownToggle>
              <DropdownMenu>
                {backgrounds.map((bg) => (
                  <DropdownItem key={bg.id} eventKey={bg.background}>
                    {bg.background}
                  </DropdownItem>
                ))}
              </DropdownMenu>
            </Dropdown>
          </FormGroup>

          <FormLabel className='m-2'>Race</FormLabel>

          <FormGroup className='ms-2'>
            <Dropdown
              id="race"
              value={characterData.race}
              onSelect={(key) => setCharacterData({ ...characterData, race: key })}
            >
              <DropdownToggle id="race-dropdown">
                {characterData.race || 'Select a Race'}
              </DropdownToggle>
              <DropdownMenu>
                <DropdownItem eventKey="">Select a Race</DropdownItem>
                {races.map((race) => (
                  <DropdownItem key={race.id} eventKey={race.race}>
                    {race.race}
                  </DropdownItem>
                ))}
              </DropdownMenu>
            </Dropdown>
          </FormGroup>

          <FormLabel className='m-2'>Class</FormLabel>

          <FormGroup className='ms-2'>
            <Dropdown
              id="characterClass"
              value={characterData.characterClass}
              onSelect={(key) => setCharacterData({ ...characterData, characterClass: key })}
            >
              <DropdownToggle id="characterClass-dropdown">
                {characterData.characterClass || 'Select a Class'}
              </DropdownToggle>
              <DropdownMenu>
                <DropdownItem eventKey="">Select a Class</DropdownItem>
                {classes.map((cls) => (
                  <DropdownItem key={cls.id} eventKey={cls.class}>
                    {cls.class}
                  </DropdownItem>
                ))}
              </DropdownMenu>
            </Dropdown>
          </FormGroup>

          <FormLabel className='m-2'>Weapon Proficiencies</FormLabel>

          <FormGroup className='ms-2'>
            <Dropdown
              id="weaponProficiency1"
              value={characterData.weaponProficiencies[0]}
              onSelect={(key) => {
                const updatedWeaponProficiencies = [...characterData.weaponProficiencies];
                updatedWeaponProficiencies[0] = key;
                setCharacterData({ ...characterData, weaponProficiencies: updatedWeaponProficiencies });
              }}
            >
              <DropdownToggle id="weaponProficiency1-dropdown">
                {characterData.weaponProficiencies[0] || 'Select a Weapon Proficiency'}
              </DropdownToggle>
              <DropdownMenu>
                <DropdownItem eventKey="">Select a Weapon Proficiency</DropdownItem>
                {proficiencies.map((proficiency) =>
                  proficiency.proficiencyType === 'weapon' ? (
                    <DropdownItem key={proficiency._id.$oid} eventKey={proficiency.proficiencyName}>
                      {proficiency.proficiencyName}
                    </DropdownItem>
                  ) : null
                )}
              </DropdownMenu>
            </Dropdown>
          </FormGroup>

          <FormGroup className='m-2'>
            <Dropdown
              id="weaponProficiency2"
              value={characterData.weaponProficiencies[1]}
              onSelect={(key) => {
                const updatedWeaponProficiencies = [...characterData.weaponProficiencies];
                updatedWeaponProficiencies[1] = key;
                setCharacterData({ ...characterData, weaponProficiencies: updatedWeaponProficiencies });
              }}
            >
              <DropdownToggle id="weaponProficiency2-dropdown">
                {characterData.weaponProficiencies[1] || 'Select a Weapon Proficiency'}
              </DropdownToggle>
              <DropdownMenu>
                <DropdownItem eventKey="">Select a Weapon Proficiency</DropdownItem>
                {proficiencies.map((proficiency) =>
                  proficiency.proficiencyType === 'weapon' ? (
                    <DropdownItem key={proficiency._id.$oid} eventKey={proficiency.proficiencyName}>
                      {proficiency.proficiencyName}
                    </DropdownItem>
                  ) : null
                )}
              </DropdownMenu>
            </Dropdown>
          </FormGroup>

          <FormGroup className='m-2'>
            <Dropdown
              id="weaponProficiency3"
              value={characterData.weaponProficiencies[2]}
              onSelect={(key) => {
                const updatedWeaponProficiencies = [...characterData.weaponProficiencies];
                updatedWeaponProficiencies[2] = key;
                setCharacterData({ ...characterData, weaponProficiencies: updatedWeaponProficiencies });
              }}
            >
              <DropdownToggle id="weaponProficiency3-dropdown">
                {characterData.weaponProficiencies[2] || 'Select a Weapon Proficiency'}
              </DropdownToggle>
              <DropdownMenu>
                <DropdownItem eventKey="">Select a Weapon Proficiency</DropdownItem>
                {proficiencies.map((proficiency) =>
                  proficiency.proficiencyType === 'weapon' ? (
                    <DropdownItem key={proficiency._id.$oid} eventKey={proficiency.proficiencyName}>
                      {proficiency.proficiencyName}
                    </DropdownItem>
                  ) : null
                )}
              </DropdownMenu>
            </Dropdown>
          </FormGroup>
          
        </Col>

        <Col>

          <FormLabel className='m-2'>Armor Proficiencies</FormLabel>

          <FormGroup className='ms-2'>
            <Dropdown
              id="armorProficiency1"
              value={characterData.armorProficiencies[0]}
              onSelect={(key) => {
                const updatedArmorProficiencies = [...characterData.armorProficiencies];
                updatedArmorProficiencies[0] = key;
                setCharacterData({ ...characterData, armorProficiencies: updatedArmorProficiencies });
              }}
            >
              <DropdownToggle id="armorProficiency1-dropdown">
                {characterData.armorProficiencies[0] || 'Select an Armor Proficiency'}
              </DropdownToggle>
              <DropdownMenu>
                <DropdownItem eventKey="">Select an Armor Proficiency</DropdownItem>
                {proficiencies.map((proficiency) =>
                  proficiency.proficiencyType === 'armor' ? (
                    <DropdownItem key={proficiency._id.$oid} eventKey={proficiency.proficiencyName}>
                      {proficiency.proficiencyName}
                    </DropdownItem>
                  ) : null
                )}
              </DropdownMenu>
            </Dropdown>
          </FormGroup>

          <FormGroup className='m-2'>
            <Dropdown
              id="armorProficiency2"
              value={characterData.armorProficiencies[1]}
              onSelect={(key) => {
                const updatedArmorProficiencies = [...characterData.armorProficiencies];
                updatedArmorProficiencies[1] = key;
                setCharacterData({ ...characterData, armorProficiencies: updatedArmorProficiencies });
              }}
            >
              <DropdownToggle id="armorProficiency2-dropdown">
                {characterData.armorProficiencies[1] || 'Select an Armor Proficiency'}
              </DropdownToggle>
              <DropdownMenu>
                <DropdownItem eventKey="">Select an Armor Proficiency</DropdownItem>
                {proficiencies.map((proficiency) =>
                  proficiency.proficiencyType === 'armor' ? (
                    <DropdownItem key={proficiency._id.$oid} eventKey={proficiency.proficiencyName}>
                      {proficiency.proficiencyName}
                    </DropdownItem>
                  ) : null
                )}
              </DropdownMenu>
            </Dropdown>
          </FormGroup>

          <FormGroup className='m-2'>
            <Dropdown
              id="armorProficiency3"
              value={characterData.armorProficiencies[2]}
              onSelect={(key) => {
                const updatedArmorProficiencies = [...characterData.armorProficiencies];
                updatedArmorProficiencies[2] = key;
                setCharacterData({ ...characterData, armorProficiencies: updatedArmorProficiencies });
              }}
            >
              <DropdownToggle id="armorProficiency3-dropdown">
                {characterData.armorProficiencies[2] || 'Select an Armor Proficiency'}
              </DropdownToggle>
              <DropdownMenu>
                <DropdownItem eventKey="">Select an Armor Proficiency</DropdownItem>
                {proficiencies.map((proficiency) =>
                  proficiency.proficiencyType === 'armor' ? (
                    <DropdownItem key={proficiency._id.$oid} eventKey={proficiency.proficiencyName}>
                      {proficiency.proficiencyName}
                    </DropdownItem>
                  ) : null
                )}
              </DropdownMenu>
            </Dropdown>
          </FormGroup>

          <FormLabel className='m-2'>Skill Proficiencies</FormLabel>
        
          <FormGroup className='ms-2'>
            <Dropdown
              id="skillProficiency1"
              value={characterData.skillProficiencies[0]}
              onSelect={(key) => {
                const updatedSkillProficiencies = [...characterData.skillProficiencies];
                updatedSkillProficiencies[0] = key;
                setCharacterData({ ...characterData, skillProficiencies: updatedSkillProficiencies });
              }}
            >
              <DropdownToggle id="skillProficiency1-dropdown">
                {characterData.skillProficiencies[0] || 'Select a Skill Proficiency'}
              </DropdownToggle>
              <DropdownMenu>
                <DropdownItem eventKey="">Select a Skill Proficiency</DropdownItem>
                {proficiencies.map((proficiency) =>
                  proficiency.proficiencyType === 'skill' ? (
                    <DropdownItem key={proficiency._id.$oid} eventKey={proficiency.proficiencyName}>
                      {proficiency.proficiencyName}
                    </DropdownItem>
                  ) : null
                )}
              </DropdownMenu>
            </Dropdown>
          </FormGroup>

          <FormGroup className='m-2'>
            <Dropdown
              id="skillProficiency2"
              value={characterData.skillProficiencies[1]}
              onSelect={(key) => {
                const updatedSkillProficiencies = [...characterData.skillProficiencies];
                updatedSkillProficiencies[1] = key;
                setCharacterData({ ...characterData, skillProficiencies: updatedSkillProficiencies });
              }}
            >
              <DropdownToggle id="skillProficiency2-dropdown">
                {characterData.skillProficiencies[1] || 'Select a Skill Proficiency'}
              </DropdownToggle>
              <DropdownMenu>
                <DropdownItem eventKey="">Select a Skill Proficiency</DropdownItem>
                {proficiencies.map((proficiency) =>
                  proficiency.proficiencyType === 'skill' ? (
                    <DropdownItem key={proficiency._id.$oid} eventKey={proficiency.proficiencyName}>
                      {proficiency.proficiencyName}
                    </DropdownItem>
                  ) : null
                )}
              </DropdownMenu>
            </Dropdown>
          </FormGroup>

          <FormGroup className='m-2'>
            <Dropdown
              id="skillProficiency3"
              value={characterData.skillProficiencies[2]}
              onSelect={(key) => {
                const updatedSkillProficiencies = [...characterData.skillProficiencies];
                updatedSkillProficiencies[2] = key;
                setCharacterData({ ...characterData, skillProficiencies: updatedSkillProficiencies });
              }}
            >
              <DropdownToggle id="skillProficiency3-dropdown">
                {characterData.skillProficiencies[2] || 'Select a Skill Proficiency'}
              </DropdownToggle>
              <DropdownMenu>
                <DropdownItem eventKey="">Select a Skill Proficiency</DropdownItem>
                {proficiencies.map((proficiency) =>
                  proficiency.proficiencyType === 'skill' ? (
                    <DropdownItem key={proficiency._id.$oid} eventKey={proficiency.proficiencyName}>
                      {proficiency.proficiencyName}
                    </DropdownItem>
                  ) : null
                )}
              </DropdownMenu>
            </Dropdown>
          </FormGroup>

          <FormGroup className='m-2'>
            <Dropdown
              id="skillProficiency4"
              value={characterData.skillProficiencies[3]}
              onSelect={(key) => {
                const updatedSkillProficiencies = characterData.skillProficiencies.slice(0, 3);
                updatedSkillProficiencies.push(key);
                setCharacterData({ ...characterData, skillProficiencies: updatedSkillProficiencies });
              }}
            >
              <DropdownToggle id="skillProficiency4-dropdown">
                {characterData.skillProficiencies[3] || 'Select a Skill Proficiency'}
              </DropdownToggle>
              <DropdownMenu>
                <DropdownItem eventKey="">Select a Skill Proficiency</DropdownItem>
                {proficiencies.map((proficiency) =>
                  proficiency.proficiencyType === 'skill' ? (
                    <DropdownItem key={proficiency._id.$oid} eventKey={proficiency.proficiencyName}>
                      {proficiency.proficiencyName}
                    </DropdownItem>
                  ) : null
                )}
              </DropdownMenu>
            </Dropdown>
          </FormGroup>

          <FormGroup className='m-2'>
            <Dropdown
              id="skillProficiency5"
              value={characterData.skillProficiencies[4]}
              onSelect={(key) => {
                const updatedSkillProficiencies = characterData.skillProficiencies.slice(0, 4);
                updatedSkillProficiencies.push(key);
                setCharacterData({ ...characterData, skillProficiencies: updatedSkillProficiencies });
              }}
            >
              <DropdownToggle id="skillProficiency5-dropdown">
                {characterData.skillProficiencies[4] || 'Select a Skill Proficiency'}
              </DropdownToggle>
              <DropdownMenu>
                <DropdownItem eventKey="">Select a Skill Proficiency</DropdownItem>
                {proficiencies.map((proficiency) =>
                  proficiency.proficiencyType === 'skill' ? (
                    <DropdownItem key={proficiency._id.$oid} eventKey={proficiency.proficiencyName}>
                      {proficiency.proficiencyName}
                    </DropdownItem>
                  ) : null
                )}
              </DropdownMenu>
            </Dropdown>
          </FormGroup>

        </Col>

      </Row>

      <FormGroup>
        <Button className='m-2' variant='success' onClick={updateCharacterDetails}>Update Character</Button>
      </FormGroup>
      
    </Form>
);
};

export default EditCharacter;

