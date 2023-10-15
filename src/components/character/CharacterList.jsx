import React, { useState, useEffect } from 'react';
import { Button, Card, CardBody, Col, Row, Container } from 'react-bootstrap'
import { getAllCharacters, removeCharacter } from '../../api/characters'; // Import the removeCharacter function


const CharacterList = ({ user }) => {
  const [characters, setCharacters] = useState(null);

  useEffect(() => {
    getAllCharacters(user)
      .then((response) => {
        setCharacters(response.data.characters);
      })
      .catch((error) => {
        console.error('Error fetching characters:', error);
      });
  }, [user]);

  const handleDelete = (characterId) => {
    removeCharacter(user, characterId) // Use the removeCharacter function
      .then(() => {
        // Refresh the character list after deletion
        getAllCharacters(user)
          .then((response) => {
            setCharacters(response.data.characters);
          })
          .catch((error) => {
            console.error('Error fetching characters:', error);
          });
      })
      .catch((error) => {
        console.error('Error deleting character:', error);
      });
  };

  return (

    <Container className="m-5">
      {characters ? (
        <Card className='m-4'>
          {characters.map((character) => (
            <CardBody key={character._id}>
              <Row>
                <Col>
                  <Card.Title>{character.name}</Card.Title>
                  <Card.Text>{character.race}, {character.characterClass}</Card.Text>
                </Col>

                <Col className='d-flex justify-content-end'>
                  <Button className='m-2' href={`/characters/${character._id}`}>View Details</Button>
                  <Button className='m-2' variant="danger" onClick={() => handleDelete(character._id)}>Delete</Button>                 
                </Col>

              </Row>
  
            </CardBody>
          ))}
        </Card>
      ) : (
        <p>No characters found...</p>
      )}
    </Container>

  );
};

export default CharacterList;
