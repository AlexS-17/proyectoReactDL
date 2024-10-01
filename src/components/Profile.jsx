import React from 'react';
import { Button, Card, Col, Container, Image, Row } from 'react-bootstrap';
import { useUser } from '../context/UserContext';

const Profile = () => {
  const { email, logout } = useUser();
  const profileImage = 'https://i.pinimg.com/564x/53/15/6d/53156da80e1a62ac22ad9dd98aa4a0ec.jpg'; // Imagen de perfil genérica

  // Galería de imágenes
  const galleryImages = [
    'https://i.pinimg.com/564x/67/d6/5e/67d65e5be361db18ba456d3b3bc1372f.jpg',
    'https://i.pinimg.com/564x/f9/34/9d/f9349da4781d7e2b3c023f3a3b3f4f5a.jpg',
    'https://i.pinimg.com/564x/fc/73/11/fc7311d60f2362d35a1d3aa71ab2b3de.jpg',
    'https://i.pinimg.com/564x/4c/b5/5a/4cb55a9a23bab00a9cb55d0ccc33e31d.jpg',
    'https://i.pinimg.com/564x/e1/07/a7/e107a76192f80f0999327282c9035988.jpg',
    'https://i.pinimg.com/564x/44/5f/c4/445fc4afa0527d3dd050f41de94171ff.jpg',
    'https://i.pinimg.com/564x/d7/4a/33/d74a3368db1c01f1548ad0ce2f6af8c3.jpg',
    'https://i.pinimg.com/564x/4d/75/c8/4d75c8804b41469c391ec14398a3fddc.jpg',
    'https://i.pinimg.com/736x/02/84/05/028405083125de290ff55f788cf04c88.jpg',
  ];

  return (
    <Container className="d-flex flex-column justify-content-center align-items-center fill-space mt-5">
      <Card className="w-50 shadow-lg mb-5">
        <Card.Body className="text-center">
          <Image 
            src={profileImage} 
            roundedCircle 
            className="mb-4" 
            alt="Foto de perfil" 
            width={150} 
            height={150}
          />
          <Card.Title className="mb-4">
            <h2>Alex Silva</h2>
          </Card.Title>
          <Card.Text>  
            <p><strong>País:</strong> Chile</p>
            <p><strong>Ciudad:</strong> Santiago</p>
            <p><strong>Email:</strong> {email}</p> {/* Mostramos el email del usuario autenticado */}
          </Card.Text>
          <Button variant="warning" onClick={logout} className="mt-3">
            Cerrar sesión
          </Button>
        </Card.Body>
      </Card>

      {/* Galería de imágenes */}
      <Container>
        <h3 className="mb-4">Galería de imágenes</h3>
        <Row>
          {galleryImages.map((imgSrc, index) => (
            <Col key={index} xs={12} sm={6} md={4} className="mb-4">
              <Image src={imgSrc} thumbnail />
            </Col>
          ))}
        </Row>
      </Container>
    </Container>
  );
};

export default Profile;
