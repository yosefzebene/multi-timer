import Card from 'react-bootstrap/Card';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import { useState } from 'react';

const CreateTimer = ({ addTimer }) => {
    const [label, setLabel] = useState('Timer');
    const [hours, setHours] = useState(0);
    const [minutes, setMinutes] = useState(0);
    const [seconds, setSeconds] = useState(0);

    const handleStartTimerClick = () => {
        // Calculate target time
        const now = new Date().getTime();
        const timerInMilliseconds = (hours * 3600000) + (minutes * 60000) + (seconds * 1000);

        addTimer(label, now + timerInMilliseconds);
    };

    return (
        <Card style={{width: '300px'}}>
            <Card.Body>
                <Card.Title><Form.Control type='text' value={label} onChange={(e) => setLabel(e.target.value)}/></Card.Title>
                <Form.Control type='number' min={0} value={hours} onChange={(e) => setHours(e.target.value)}/>
                <Form.Control type='number' min={0} max={60} value={minutes} onChange={(e) => setMinutes(e.target.value)}/>
                <Form.Control type='number' min={0} max={60} value={seconds} onChange={(e) => setSeconds(e.target.value)}/>
                <Button variant='success' onClick={handleStartTimerClick}>Start</Button>
            </Card.Body>
        </Card>
    );
};

export default CreateTimer;
