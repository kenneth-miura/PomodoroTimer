import "./App.css";
import Timer from "./Components/PomodoroTimer";
import Button from 'react-bootstrap/Button';
import DataVisualizationModal from "./Components/DataVisualizationModal";
import {useState} from 'react';

function App() {
  const [showDataModal, setShowDataModal] = useState(false);

  return (
    <div>
      <Button onClick={() => setShowDataModal(true)}>Data Visualization</Button>

      <DataVisualizationModal showModal={showDataModal} onCloseModal={() => setShowDataModal(false)}></DataVisualizationModal>
      <Timer pomodoroDuration={52} breakDuration={0}></Timer>
    </div>
  );
}


export default App;
