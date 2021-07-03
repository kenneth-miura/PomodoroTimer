import Modal from "react-bootstrap/Modal";
import Tab from "react-bootstrap/Tab";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Nav from "react-bootstrap/Nav";
import Table from "react-bootstrap/Table";
import { useState, useEffect } from "react";
import Rating from "../Util/Rating";
import "./DataVisualizationModal.css";
import TripleBarGraph from "./Graphs/TripleBarGraph";

const barConfig = {
  avgEngagement: {
    name: "Average Engagement",
    color: "#8884d8",
  },
  avgEnergy: { name: "Average Energy", color: "#82ca9d" },
  avgInFlow: { name: "Percent In Flow", color: "#820000" },
};

function allRatingsVisual(allRatings) {
  return (
    <Table striped bordered>
      <thead>
        <tr>
          <th>Activity</th>
          <th>Engagement</th>
          <th>Energy</th>
          <th>inFlow</th>
          <th>Date</th>
        </tr>
      </thead>
      <tbody>
        {allRatings.map(rating => (
          <tr key={rating.getDate()}>
            <td>{rating.getActivity()}</td>
            <td>{rating.getEngagement()}</td>
            <td>{rating.getEnergy()}</td>
            <td>{rating.getInFlow()}</td>
            <td>{rating.getDate()}</td>
          </tr>
        ))}
      </tbody>
    </Table>
  );
}

export default function DataVisualizationModal(props) {
  // store the results of selectAll in state
  const [allRatings, setAllRatings] = useState([]);
  const [weeksRatings, setWeekRatings] = useState([]);
  const [activityRatings, setActivityRatings] = useState([]);
  // set in a useEffect
  useEffect(() => {
    fetchAllRatings(setAllRatings);
    fetchWeeksRatings(setWeekRatings);
    fetchActivityRatings(setActivityRatings);
  }, []);
  return (
    <Modal show={props.showModal} onHide={props.onCloseModal} size="xl">
      <Modal.Header closeButton>
        <Modal.Title> Data Visualization</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Tab.Container defaultActiveKey="all-ratings">
          <Row>
            <Nav>
              <Nav.Item>
                <Nav.Link eventKey="all-ratings">All Ratings</Nav.Link>
              </Nav.Item>
              <Nav.Item>
                <Nav.Link eventKey="ratings-over-week">Weeks Ratings</Nav.Link>
              </Nav.Item>
              <Nav.Item>
                <Nav.Link eventKey="activity-ratings">
                  Activity Ratings
                </Nav.Link>
              </Nav.Item>
            </Nav>
          </Row>
          <Row>
            <Col>
              <Tab.Content>
                <Tab.Pane eventKey="all-ratings">
                  {allRatingsVisual(allRatings)}
                </Tab.Pane>
                <Tab.Pane eventKey="ratings-over-week">
                  <TripleBarGraph
                    data={weeksRatings}
                    xAxisKey="day"
                    barConfig={barConfig}
                  />
                </Tab.Pane>
                <Tab.Pane eventKey="activity-ratings">
                  <TripleBarGraph
                    data={activityRatings}
                    xAxisKey="activity"
                    barConfig={barConfig}
                  />
                </Tab.Pane>
              </Tab.Content>
            </Col>
          </Row>
        </Tab.Container>
      </Modal.Body>
    </Modal>
  );
}

function fetchAllRatings(setAllRatings) {
  const allRatingsRequestOptions = {
    method: "GET",
    headers: { "Content-Type": "application/json" },
  };
  fetch("/all-ratings", allRatingsRequestOptions)
    .then(response => response.json())
    .then(data => {
      const ratings = data["all_ratings"].map(
        entry =>
          new Rating(entry[0], entry[1], entry[2], entry[3], entry[4], entry[5])
      );
      setAllRatings(ratings);
    });
}

function fetchWeeksRatings(setWeekRatings) {
  var weeksRatingUrl = "/weeks-ratings";

  const weeksRatingsRequestOptions = {
    method: "GET",
    headers: { "Content-Type": "application/json" },
  };
  fetch(weeksRatingUrl, weeksRatingsRequestOptions)
    .then(response => response.json())
    .then(data => {
      const weeksRatings = data["weeks_ratings"].map(entry => ({
        day: entry[0],
        avgEngagement: entry[1],
        avgEnergy: entry[2],
        avgInFlow: entry[3],
      }));
      setWeekRatings(weeksRatings);
    });
}

function fetchActivityRatings(setActivityRatings) {
  const requestOptions = {
    method: "GET",
    headers: { "Content-Type": "application/json" },
  };
  fetch("/activity-ratings", requestOptions)
    .then(response => response.json())
    .then(data => {
      const ratings = data["activity_ratings"].map(entry => ({
        activity: entry[0],
        avgEngagement: entry[1],
        avgEnergy: entry[2],
        avgInFlow: entry[3],
      }));
      setActivityRatings(ratings);
    });
}
