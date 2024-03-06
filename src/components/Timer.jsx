import { useCallback, useEffect, useState } from 'react';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';

const Timer = ({ index, label, targetTime, removeTimer }) => {
    const [timerDisplay, setTimerDisplay] = useState('00:00:00');

    const timerAlert = useCallback(() => {
        // Play sound

        alert(label + " is done!");
        removeTimer(index);
    }, [index, label, removeTimer]);

    useEffect(() => {
        const calculateTimer = () => {
            const now = new Date().getTime();
            const difference = targetTime - now;

            if (difference <= 0) {
                timerAlert();
            }

            const hours = Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
            const minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
            const seconds = Math.floor((difference % (1000 * 60)) / 1000);

            setTimerDisplay(String(hours).padStart(2, '0') + ':' + String(minutes).padStart(2, '0') + ':' + String(seconds).padStart(2, '0'));
        };

        calculateTimer();
        const timer = setInterval(calculateTimer, 1000);

        return () => clearInterval(timer);
    }, [targetTime, timerAlert]);

    const handleStopTimerClick = () => {
        removeTimer(index);
    };

    return (
        <Card style={{width: '300px'}}>
            <Card.Body>
                <Card.Title>{label}</Card.Title>
                <Card.Text>{timerDisplay}</Card.Text>
                <Button variant='danger' onClick={handleStopTimerClick}>Cancel</Button>
            </Card.Body>
        </Card>
    );
};

export default Timer;
