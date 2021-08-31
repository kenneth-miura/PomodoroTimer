import { useState } from "react";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";

export default function SettingsModal(props) {
  const [pomodoroDuration, setPomodoroDuration] = useState(props.defaultPomodoroDuration)
  const [breakDuration, setBreakDuration] = useState(props.defaultBreakDuration);

  return (
    <Modal show={props.showModal} onHide={props.onCloseModal}>
      <Modal.Header closeButton>
        <Modal.Title> Settings</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form.Group>
          <Form.Label>
            Pomodoro Duration
          </Form.Label>
          <Form.Control
            type="number"
            placeholder={pomodoroDuration}
            onChange={event => {
              setPomodoroDuration(event.target.value);
            }}
          >

          </Form.Control>
          <Form.Label>
            Break Duration
          </Form.Label>
          <Form.Control
            type="number"
            placeholder={breakDuration}
            onChange={event => {
              setBreakDuration(event.target.value);
            }}
          >
          </Form.Control>
        </Form.Group>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={props.onCloseModal}>Close</Button>
        <Button variant="primary" onClick={() => {
          props.savePomodoroDuration(pomodoroDuration);
          props.saveBreakDuration(breakDuration);
          props.onCloseModal();
        }}>Save changes</Button>
      </Modal.Footer>
    </Modal>
  );
}
