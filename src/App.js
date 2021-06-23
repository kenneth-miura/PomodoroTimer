import "./App.css";
import Timer from "./Components/PomodoroTimer";

function App() {
  return <Timer pomodoroDuration={0} breakDuration={17}></Timer>;
}

export default App;
