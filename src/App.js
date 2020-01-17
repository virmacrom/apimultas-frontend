import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import Multas from './Multas.js';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

function App() {
  
  return (
    <div>
      <Container>

      <Row>
        <br/>
            <Col sm={10}> </Col>
              <br/>
          </Row>
        
      <div align='center'>
      <h1 >Registro de multas</h1></div>
      <br/>
      

          <Row>
          </Row>

            <Row>
              <Col>
                <Multas>
                </Multas>
              </Col>
            </Row>
        </Container>
      </div>
  );
}

export default App;