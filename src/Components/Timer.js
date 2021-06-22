import { useState, useEffect } from "react";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Button from "react-bootstrap/Button";

const convertMinutesToMilliseconds = minutes => {
  return minutes * 60000;
};

const convertMillisecondsToTimeString = milliseconds => {
  let date = new Date(milliseconds);
  return `${date.getMinutes()}: ${date.getSeconds()}`;
};


export default function Timer(props) {
	const defaultTimerDuration = convertMinutesToMilliseconds(25);
  const [timerStart, setTimerStart] = useState(
    Date.now() + defaultTimerDuration
  );
  const [timeLeft, setTimeLeft] = useState(defaultTimerDuration);
  const [timerRunning, setTimerRunning] = useState(false);
	const [timerID, setTimerID] = useState();

  useEffect(() => {
      if (timerRunning) {
				setTimerID(setInterval( () => {
					setTimeLeft(timerStart - Date.now());
				}));
      }
			else{
				clearInterval(timerID);
			}
  }, [timerRunning, timerStart]);

  return (
    <Container>
      <Row> {convertMillisecondsToTimeString(timeLeft)}</Row>
      <Row>
        <Button
          variant="primary"
          onClick={() => {
            setTimerStart(Date.now() + timeLeft);
						setTimerRunning(!timerRunning);
          }}
        >
          {timerRunning ? "Stop": "Start"}
        </Button>
      </Row>
    </Container>
  );
}
