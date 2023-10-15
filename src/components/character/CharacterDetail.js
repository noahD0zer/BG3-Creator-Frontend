import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { getOneCharacter, updateCharacter } from '../../api/characters';
import EditCharacter from './EditCharacter';
import { Button, Card, CardBody, Col, Row, Container, Form, CardTitle, CardText } from 'react-bootstrap'



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
    <>
      <Container className='mt-5'>
        <Row>
          <Col>
            <Card bg='dark' text='white' className='m-2'>
              <CardBody>
                <CardTitle className='fs-2'>{character.name}</CardTitle>
                <CardText className='ms-3'>Background: {character.background}</CardText>
                <CardText className='ms-3'>Race: {character.race}</CardText>
                <CardText className='ms-3'>Class: {character.characterClass}</CardText>
              </CardBody>

              <CardBody>
                <CardTitle>Weapon Proficiencies</CardTitle>
                <CardText>
                  {character.weaponProficiencies.map((proficiency, index) => (
                    <CardText className='ms-3' key={index}>{proficiency}</CardText>
                  ))}
                </CardText>
              </CardBody>

              <CardBody>
                <CardTitle>Armor Proficiencies</CardTitle>
                <CardText>
                  {character.armorProficiencies.map((proficiency, index) => (
                    <CardText className='ms-3' key={index}>{proficiency}</CardText>
                  ))}
                </CardText>
              </CardBody>

              <CardBody>
                <CardTitle>Skill Proficiencies</CardTitle>
                <CardText>
                  {character.skillProficiencies.map((proficiency, index) => (
                    <CardText className='ms-3' key={index}>{proficiency}</CardText>
                  ))}
                </CardText>
              </CardBody>
            </Card>
          </Col>
          <Col>        
            <Button className='m-2' onClick={editModalShow ? handleEditModalClose : handleEditModalShow}>
              {editModalShow ? 'Close Edit' : 'Edit'}
            </Button>
      
            <Form className='m-2'>
              {editModalShow && (
                <Card bg='dark' text='white'>
                  <EditCharacter
                    user={user}
                    updateCharacter={updateCharacter}
                    msgAlert={msgAlert}
                    handleClose={() => setEditModalShow(false)}
                    triggerRefresh={() => setCharacter(null)}
                    character={character} 
                  />
                </Card>
              )}
            </Form>
          </Col>    
        </Row>
      </Container>
    </>
    
  );
};

export default CharacterDetail;
