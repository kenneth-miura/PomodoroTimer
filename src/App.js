import "./App.css";
import Timer from "./Components/PomodoroTimer";

function App() {
  return <Timer pomodoroDuration={1} breakDuration={17}></Timer>;
}

export default App;
