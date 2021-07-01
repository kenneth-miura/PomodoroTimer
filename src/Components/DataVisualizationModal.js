import Modal from "react-bootstrap/Modal";
import Tab from "react-bootstrap/Tab";
import Row from "react-bootstrap/Row";
import Nav from "react-bootstrap/Nav";
import Table from "react-bootstrap/Table";
import { useState, useEffect } from "react";
import Rating from "../Util/Rating";
import "./DataVisualizationModal.css";

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
          <tr>
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
  // set in a useEffect
  useEffect(() => {
    const requestOptions = {
      method: "GET",
      headers: { "Content-Type": "application/json" },
    };
    fetch("/all_ratings", requestOptions)
      .then(response => response.json())
      .then(data => {
        console.log(data);
        const ratings = data["all_ratings"].map(
          entry =>
            new Rating(
              entry[0],
              entry[1],
              entry[2],
              entry[3],
              entry[4],
              entry[5]
            )
        );
        setAllRatings(ratings);
      });
  }, []);
  return (
    <Modal
      show={props.showModal}
      onHide={props.onCloseModal}
      dialogClassName="data-modal"
    >
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
                <Nav.Link eventKey="ratings-over-week">
                  Ratings over a week
                </Nav.Link>
              </Nav.Item>
            </Nav>
          </Row>
          <Row>
            <Tab.Content>
              <Tab.Pane eventKey="all-ratings">
                {allRatingsVisual(allRatings)}
              </Tab.Pane>
            </Tab.Content>
          </Row>
        </Tab.Container>
      </Modal.Body>
    </Modal>
  );
}
