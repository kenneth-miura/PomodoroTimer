import { useState } from "react";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";

const [defaultRangeMin, defaultRangeMax] = [0, 100];
const defaultActivity = "None Specified";
const mapToRange = (value, newMin, newMax) => {
  return (
    ((value - defaultRangeMin) / (defaultRangeMax - defaultRangeMin)) *
      (newMax - newMin) +
    newMin
  );
};
const saveRatings = (engagement, energy, inFlow, activity) => {
  if (activity.length === 0) {
    activity = defaultActivity;
  }
  const requestOptions = {
    method: "Post",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      activity: activity,
      engagement: engagement,
      energy: energy,
      inFlow: inFlow,
    }),
  };

  fetch("/store_ratings", requestOptions)
    .then(response => response.json())
    .then(data => console.log(data));
};

export default function RatingModal(props) {
  const [engagement, setEngagement] = useState(0);
  const [energy, setEnergy] = useState(0);
  const [inFlow, setInFlow] = useState(false);
  const [activity, setActivity] = useState("None");

  const boundSaveRatings = saveRatings.bind(
    null,
    engagement,
    energy,
    inFlow,
    activity
  );

  return (
    <Modal show={props.showModal} onHide={props.onCloseModal}>
      <Modal.Header closeButton>
        <Modal.Title> Modal heading</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form
          onSubmit={event => {
            event.preventDefault();
            boundSaveRatings();
            props.onCloseModal();
          }}
        >
          <Form.Group>
            <Form.Label> Activity Name</Form.Label>
            <Form.Control
              type="text"
              placeholder="Your Activity"
              onChange={event => {
                setActivity(event.target.value);
              }}
            />
            <Form.Label> Engagement</Form.Label>
            <Form.Control
              type="range"
              onChange={event =>
                setEngagement(mapToRange(+event.target.value, -1, 1))
              }
            />
            <Form.Label> Flow </Form.Label>
            <Form.Check
              type="checkbox"
              label="In Flow State"
              onChange={event => setInFlow(event.target.checked)}
            />
            <Form.Label>Energy</Form.Label>
            <Form.Control
              type="range"
              onChange={event =>
                setEnergy(mapToRange(+event.target.value, -1, 1))
              }
            />
          </Form.Group>
        </Form>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={props.onCloseModal}>
          Close
        </Button>
        <Button
          variant="secondary"
          onClick={() => {
            boundSaveRatings();
            props.onCloseModal();
          }}
        >
          Save
        </Button>
      </Modal.Footer>
    </Modal>
  );
}
