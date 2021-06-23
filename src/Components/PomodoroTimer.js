import { useState, useEffect } from "react";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";

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

  return (
    <Container>
      <Row>
        <Button
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
      </Row>
      <Row> {convertMillisecondsToTimeString(timeLeft)}</Row>
      <Row>
        <Button
          variant="primary"
          onClick={() => {
            setTimerStart(Date.now() + timeLeft);
            setTimerRunning(!timerRunning);
          }}
        >
          {timerRunning ? "Stop" : "Start"}
        </Button>
      </Row>
      <Modal show={showModal} onHide={handleCloseModal}>
        <Modal.Header closeButton>
          <Modal.Title> Modal heading</Modal.Title>
        </Modal.Header>
        <Modal.Body>WOOOO MODAL BODY TEXT LETS GO</Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseModal}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </Container>
  );
}
