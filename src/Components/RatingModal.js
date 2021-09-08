import { useState, useEffect } from "react";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import InputGroup from "react-bootstrap/InputGroup";
import "./RatingModal.css";
import { FormControl } from "react-bootstrap";

const defaultActivity = "None Specified";

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

const addActivity = (activity, callback) => {
  const requestOptions = {
    method: "Post",
    headers: {"Content-Type": "application/json"},
    body: JSON.stringify({
      activity:activity
    })
  }

  fetch('/add-activity', requestOptions)
    .then(response => response.json())
    .then(data => {
      console.log({data})
      callback();
    })
}

const updateActivityList = setActivityList => {
  console.log("updating activity list");
  const requestOptions = {
    method: "GET",
    headers: { "Content-Type": "application/json" },
  };
  fetch("/all_activities", requestOptions)
    .then(response => response.json())
    .then(data => {
      setActivityList(data["activities"]);
    });
};

export default function RatingModal(props) {
  const [engagement, setEngagement] = useState(0);
  const [energy, setEnergy] = useState(0);
  const [inFlow, setInFlow] = useState(false);
  const [activity, setActivity] = useState("None");
  const [activityList, setActivityList] = useState([]);
  const [activityToAdd, setActivityToAdd] = useState("New Activity");

  useEffect(() => updateActivityList(setActivityList), []);

  const [sliderMin, sliderMax] = [-1, 1];
  const sliderStep = 0.05;

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
        <Modal.Title> Ratings</Modal.Title>
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
              as="select"
              aria-label="select"
              onChange={event => {
                setActivity(event.target.value);
              }}
            >
              <option>Select option</option>
              {activityList.map(activity => {
                return <option>{activity}</option>;
              })}
            </Form.Control>
            <InputGroup className="mb-3">
              <FormControl
                value={activityToAdd}
                aria-label="New Activity"
                onChange={event => {
                  setActivityToAdd(event.target.value);
                }}
              />
              <Button variant="outline-secondary"
                onClick={() => {
                  console.log(activityToAdd);
                  addActivity(activityToAdd, () => {
                    updateActivityList(setActivityList)
                    setActivityToAdd("New Activity")
                  });
                }}
              >
                Add new Activity
              </Button>
            </InputGroup>
            <br/>
            <Form.Label> Engagement</Form.Label>
            <div className="slider">
              <p>{sliderMin}</p>
              <Form.Control
                type="range"
                onChange={event => {
                  console.log("engagement");
                  console.log(+event.target.value);
                  setEngagement(+event.target.value);
                }}
                min={sliderMin.toString()}
                max={sliderMax.toString()}
                step={sliderStep}
              />
              <p>{sliderMax}</p>
            </div>
            <Form.Label> Flow </Form.Label>
            <Form.Check
              type="checkbox"
              label="In Flow State"
              onChange={event => setInFlow(event.target.checked)}
            />
            <Form.Label>Energy</Form.Label>
            <div className="slider">
              <p>{sliderMin}</p>
              <Form.Control
                type="range"
                onChange={event => {
                  console.log("energy");
                  console.log(+event.target.value);
                  setEnergy(+event.target.value);
                }}
                min={sliderMin.toString()}
                max={sliderMax.toString()}
                step={sliderStep}
              />
              <p>{sliderMax}</p>
            </div>
          </Form.Group>
        </Form>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={props.onCloseModal}>
          Close
        </Button>
        <Button
          variant="primary"
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
