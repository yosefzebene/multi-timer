import { useCallback, useEffect, useState, useMemo } from 'react';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import alarmSound from '../assets/alarm.mp3';

const Timer = ({ index, label, targetTime, removeTimer }) => {
    const [timerDisplay, setTimerDisplay] = useState('00:00:00');
    const sound = useMemo(() => new Audio(alarmSound), []);

    const timerAlert = useCallback(() => {
        sound.play();

        document.getElementsByClassName(`timer-${index}`)[0].classList.remove('bg-dark');
    }, [index, sound]);

    useEffect(() => {
        const calculateTimer = () => {
            const now = new Date().getTime();
            let differenceInSeconds = (targetTime - now) / 1000;

            if (differenceInSeconds <= 0) {
                timerAlert();
            }
            else {
                const hours = Math.floor(differenceInSeconds / 3600);
                differenceInSeconds %= 3600;
                const minutes = Math.floor(differenceInSeconds / 60);
                const seconds = Math.floor(differenceInSeconds % 60);

                setTimerDisplay(String(hours).padStart(2, '0') + ':' + String(minutes).padStart(2, '0') + ':' + String(seconds).padStart(2, '0'));
            }
        };

        calculateTimer();
        const timer = setInterval(calculateTimer, 1000);

        return () => clearInterval(timer);
    }, [targetTime, timerAlert]);

    const handleStopTimerClick = () => {
        sound.pause();
        removeTimer(index);
    };

    return (
        <Card className={`bg-dark text-white text-center alarm-triggered timer-${index}`}>
            <Card.Body>
                <Card.Title>{label}</Card.Title>
                <Card.Text className='timer-display'>{timerDisplay}</Card.Text>
                <Button variant='danger' onClick={handleStopTimerClick}>Cancel</Button>
            </Card.Body>
        </Card>
    );
};

export default Timer;
