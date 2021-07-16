import "./App.css";
import Timer from "./Components/PomodoroTimer";
import Button from "react-bootstrap/Button";
import DataVisualizationModal from "./Components/DataVisualizationModal";
import { useState } from "react";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

function App() {
  const [showDataModal, setShowDataModal] = useState(false);

  return (
    <div className="main">
        <Button
          className="custom-button flex-item-right"
          onClick={() => setShowDataModal(true)}
        >
          Data Visualization
        </Button>
        <DataVisualizationModal showModal={showDataModal} onCloseModal={() => setShowDataModal(false)}></DataVisualizationModal>
        <Timer pomodoroDuration={52} breakDuration={0}></Timer>
    </div>


  );
}

export default App;
