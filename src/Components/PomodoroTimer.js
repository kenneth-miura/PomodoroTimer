import { useState, useEffect } from "react";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Button from "react-bootstrap/Button";
import ButtonGroup from "react-bootstrap/ButtonGroup";
import RatingModal from "./RatingModal";
import "./PomodoroTimer.css";

const minutesToMilliseconds = minutes => {
  return minutes * 60000;
};

const convertMillisecondsToTimeString = milliseconds => {
  let date = new Date(milliseconds);
  if (milliseconds <= 0) {
    return "00:00";
  }
  var minutesString =
    date.getMinutes() === 0 ? "00" : String(date.getMinutes());
  var secondsString =
    date.getSeconds() === 0 ? "00" : String(date.getSeconds());
  return `${minutesString}: ${secondsString}`;
};

export default function PomodoroTimer(props) {
  const defaultTimerDuration = minutesToMilliseconds(props.pomodoroDuration);
  const [timerStart, setTimerStart] = useState(
    Date.now() + defaultTimerDuration
  );
  const [timeLeft, setTimeLeft] = useState(defaultTimerDuration);
  const [timerRunning, setTimerRunning] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const handleCloseModal = () => setShowModal(false);

  useEffect(() => {
    let intervalID;
    if (timerRunning) {
      intervalID = setInterval(() => {
        let remainingTime = timerStart - Date.now();
        if (remainingTime <= 0) {
          setShowModal(true);
          clearInterval(intervalID);
        }
        setTimeLeft(remainingTime);
      });
    }
    return () => clearInterval(intervalID);
  }, [timerRunning, timerStart]);

  // update current time if duration is changed
  useEffect(() => {
    console.log("default timer duration changed")
    setTimerStart(Date.now() + defaultTimerDuration);
    setTimeLeft(defaultTimerDuration);
    setTimerRunning(false);
  }, [defaultTimerDuration])

  return (
    <Container className="pomodoro-container drop-shadow">
      <Row className="centered-row">
        <ButtonGroup aria-label="Basic example">
          <Button
            className="custom-button"
            variant="primary"
            onClick={() => {
              setTimerStart(
                Date.now() + minutesToMilliseconds(props.pomodoroDuration)
              );
              setTimerRunning(true);
            }}
          >
            Pomodoro
          </Button>
          <Button
            className="custom-button"
            variant="primary"
            onClick={() => {
              setTimerStart(
                Date.now() + minutesToMilliseconds(props.breakDuration)
              );
              setTimerRunning(true);
            }}
          >
            Break
          </Button>
        </ButtonGroup>
      </Row>
      <Row className="centered-row pomodoro-timer"> {convertMillisecondsToTimeString(timeLeft)}</Row>
      <Row className="centered-row">
        <Button
          className="custom-button"
          variant="primary"
          onClick={() => {
            setTimerStart(Date.now() + timeLeft);
            setTimerRunning(!timerRunning);
          }}
        >
          {timerRunning ? "Stop" : "Start"}
        </Button>
      </Row>
      <RatingModal
        showModal={showModal}
        onCloseModal={handleCloseModal}
      ></RatingModal>
    </Container>
  );
}
