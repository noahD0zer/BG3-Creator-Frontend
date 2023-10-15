import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom'
import { getBackgrounds, getClasses, getRaces, getProficiencies } from '../../api/getoptions';
import {createCharacter} from '../../api/characters';
import { createCharacterSucess, createCharacterFailure } from '../shared/AutoDismissAlert/messages';
import { Container, Form, FormGroup, FormLabel, Dropdown, Button, FormControl, Row, Col, Card } from 'react-bootstrap';



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


  const handleProficiencySelect = (selectedValue, proficiencyType, index) => {
    setCharacterData((prevData) => ({
      ...prevData,
      [proficiencyType]: [
        ...prevData[proficiencyType].slice(0, index),
        selectedValue,
        ...prevData[proficiencyType].slice(index + 1),
      ],
    }));
  };

  const navigate = useNavigate()

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
            navigate(`/character-list`)
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
    <Container className='mt-5'>
      <Card bg='dark' text='white' className='m-2'>
      <Form className='m-3' onSubmit={onSubmit}>
      <Button className='mb-3' type="submit" variant="success">Save</Button>
      <Row>
      

        <FormGroup className='mb-2'>
          <FormLabel className='fs-5' htmlFor="name">Name</FormLabel>
          <FormControl
            id="name"
            value={characterData.name}
            onChange={(e) => setCharacterData({ ...characterData, name: e.target.value })}
          />
        </FormGroup>
      
      <Col>
      
        <FormGroup className='mb-2'>
          <FormLabel htmlFor="background">Background:</FormLabel>
          <Dropdown
            id="background"
            value={characterData.background}
            onSelect={(key) => setCharacterData({ ...characterData, background: key })}
          >
            <Dropdown.Toggle id="background-dropdown">
              {characterData.background || 'Select a Background'}
            </Dropdown.Toggle>
            <Dropdown.Menu>
              <Dropdown.Item eventKey="">Select a Background</Dropdown.Item>
              {backgrounds.map((bg) => (
                <Dropdown.Item key={bg.id} eventKey={bg.background}>
                  {bg.background}
                </Dropdown.Item>
              ))}
            </Dropdown.Menu>
          </Dropdown>
        </FormGroup>

        <FormGroup className='mb-2'>
          <FormLabel htmlFor="race">Race:</FormLabel>
          <Dropdown
            id="race"
            value={characterData.race}
            onSelect={(key) => setCharacterData({ ...characterData, race: key })}
          >
            <Dropdown.Toggle id="race-dropdown">
              {characterData.race || 'Select a Race'}
            </Dropdown.Toggle>
            <Dropdown.Menu>
              <Dropdown.Item eventKey="">Select a Race</Dropdown.Item>
              {races.map((race) => (
                <Dropdown.Item key={race.id} eventKey={race.race}>
                  {race.race}
                </Dropdown.Item>
              ))}
            </Dropdown.Menu>
          </Dropdown>
        </FormGroup>

        <FormGroup className='mb-2'>
          <FormLabel htmlFor="characterClass">Class:</FormLabel>
          <Dropdown
            id="characterClass"
            value={characterData.characterClass}
            onSelect={(key) => setCharacterData({ ...characterData, characterClass: key })}
          >
            <Dropdown.Toggle id="characterClass-dropdown">
              {characterData.characterClass || 'Select a Class'}
            </Dropdown.Toggle>
            <Dropdown.Menu>
              <Dropdown.Item eventKey="">Select a Class</Dropdown.Item>
              {classes.map((cls) => (
                <Dropdown.Item key={cls.id} eventKey={cls.class}>
                  {cls.class}
                </Dropdown.Item>
              ))}
            </Dropdown.Menu>
          </Dropdown>
        </FormGroup>

        {characterData.weaponProficiencies.map((_, index) => (
          <FormGroup key={`weaponProficiency${index}`} className="mb-2">
              <FormLabel>{`Weapon Proficiency ${index + 1}:`}</FormLabel>
              <Dropdown
                value={characterData.weaponProficiencies[index]}
                onSelect={(key) => handleProficiencySelect(key, 'weaponProficiencies', index)}
              >
                <Dropdown.Toggle id={`weaponProficiency${index}-dropdown`}>
                  {characterData.weaponProficiencies[index] || 'Select a Weapon Proficiency'}
                </Dropdown.Toggle>
                <Dropdown.Menu>
                  <Dropdown.Item eventKey="">Select a Weapon Proficiency</Dropdown.Item>
                  {proficiencies.map((proficiency) =>
                    proficiency.proficiencyType === 'weapon' ? (
                      <Dropdown.Item key={proficiency._id.$oid} eventKey={proficiency.proficiencyName}>
                        {proficiency.proficiencyName}
                      </Dropdown.Item>
                    ) : null
                  )}
                </Dropdown.Menu>
              </Dropdown>
          </FormGroup>
        ))}

      </Col>
      <Col>

        {characterData.armorProficiencies.map((_, index) => (
          <FormGroup key={`armorProficiency${index}`} className="m-2">
              <FormLabel>{`Armor Proficiency ${index + 1}:`}</FormLabel>
              <Dropdown
                value={characterData.armorProficiencies[index]}
                onSelect={(key) => handleProficiencySelect(key, 'armorProficiencies', index)}
              >
                <Dropdown.Toggle id={`armorProficiency${index}-dropdown`}>
                  {characterData.armorProficiencies[index] || 'Select an Armor Proficiency'}
                </Dropdown.Toggle>
                <Dropdown.Menu>
                  <Dropdown.Item eventKey="">Select an Armor Proficiency</Dropdown.Item>
                  {proficiencies.map((proficiency) =>
                    proficiency.proficiencyType === 'armor' ? (
                      <Dropdown.Item key={proficiency._id.$oid} eventKey={proficiency.proficiencyName}>
                        {proficiency.proficiencyName}
                      </Dropdown.Item>
                    ) : null
                  )}
                </Dropdown.Menu>
              </Dropdown>
          </FormGroup>
        ))}

        {characterData.skillProficiencies.map((_, index) => (
          <FormGroup key={`skillProficiency${index}`} className="m-2">
              <FormLabel>{`Skill Proficiency ${index + 1}:`}</FormLabel>
              <Dropdown
                value={characterData.skillProficiencies[index]}
                onSelect={(key) => handleProficiencySelect(key, 'skillProficiencies', index)}
              >
                <Dropdown.Toggle id={`skillProficiency${index}-dropdown`}>
                  {characterData.skillProficiencies[index] || 'Select a Skill Proficiency'}
                </Dropdown.Toggle>
                <Dropdown.Menu>
                  <Dropdown.Item eventKey="">Select a Skill Proficiency</Dropdown.Item>
                  {proficiencies.map((proficiency) =>
                    proficiency.proficiencyType === 'skill' ? (
                      <Dropdown.Item key={proficiency._id.$oid} eventKey={proficiency.proficiencyName}>
                        {proficiency.proficiencyName}
                      </Dropdown.Item>
                    ) : null
                  )}
                </Dropdown.Menu>
              </Dropdown>
          </FormGroup>
        ))}
      
      </Col>
      </Row>
      </Form>
      </Card>
    </Container>
  );
}

export default CreateCharacter;
