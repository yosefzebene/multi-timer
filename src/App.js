import './App.css';
import Navbar from 'react-bootstrap/Navbar';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import CreateTimer from './components/CreateTimer';
import Timer from './components/Timer';
import { useEffect, useState, useRef } from 'react';

function App() {
  const [timers, setTimers] = useState([]);
  const hasPageRendered = useRef(false);

  useEffect(() => {
    const storedTimers = JSON.parse(localStorage.getItem('timers'));
    setTimers(storedTimers);
  }, []);

  useEffect(() => {
    if (hasPageRendered.current)
      localStorage.setItem('timers', JSON.stringify(timers));

    hasPageRendered.current = true;
  }, [timers]);

  const addTimer = (label, targetTime) => {
    const newTimer = {label: label, targetTime: targetTime};
    setTimers(oldArray => [...oldArray, newTimer]);
  };

  const removeTimer = (index) => {
    const updatedTimers = [...timers];
    updatedTimers.splice(index, 1);
    setTimers(updatedTimers);
  };

  return (
    <div className="App">
      <Navbar>
        <Container>
            <Navbar.Brand>Multi Timer</Navbar.Brand>
          </Container>
      </Navbar>
      <Container fluid>
        <Row>
          {
            timers.map((timer, index) => {
              return <Col key={index} xs={6} sm={4} md={4} lg={3}><Timer index={index} label={timer.label} targetTime={timer.targetTime} removeTimer={removeTimer}/></Col>
            })
          }
          <Col><CreateTimer addTimer={addTimer}/></Col>
        </Row>
      </Container>
    </div>
  );
}

export default App;
