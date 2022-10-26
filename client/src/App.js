import TeamScore from "./components/TeamScore";
import Equation from "./components/Equation";
import "./styles/App.css";
import { useState } from "react";

function App() {
  const [score, setScore] = useState({ Blue: 0, Red: 0 });
  function gotRightAnswer(isAnswerRight) {
    if (isAnswerRight) {
      setScore((current) => {
        return {
          ...current,
          Blue: current.Blue + 1,
        };
      });
    } else {
      setScore((current) => {
        return {
          ...current,
          Red: current.Red + 1,
        };
      });
    }
  }
  return (
    <div className="App">
      <div className="scoreboard">
        <TeamScore className="teamscore" name="Blue" score={score.Blue} />
        <TeamScore className="teamscore" name="Red" score={score.Red} />
      </div>
      <Equation className="equation" callback={gotRightAnswer} />
    </div>
  );
}

export default App;
