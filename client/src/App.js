import TeamScore from "./components/TeamScore";
import Equation from "./components/Equation";
import "./styles/App.css";
import { useState } from "react";

function App() {
  const [score, setScore] = useState({ Blue: 0, Red: 0 });

  const [levelObj, setLevel] = useState({ level: 10, scoreInLevel: 0 });

  /*This function is passed as a callback to the Equation component. If the answer given to the 
  equation is the correct answer, the Equation component will pass 'true' to gotRightAnswer, if the answer is wrong it will pass 'false'. 
  That will be used to update the score state*/
  function gotRightAnswer(isAnswerRight) {
    if (isAnswerRight) {
      setLevel((current) => {
        if (current.scoreInLevel >= 1) {
          return { level: current.level + 1, scoreInLevel: 0 };
        }
        return { level: current.level, scoreInLevel: current.scoreInLevel + 1 };
      });
      setScore((current) => {
        return {
          ...current,
          Blue: current.Blue + 1,
        };
      });
    } else {
      setLevel((current) => {
        if (current.scoreInLevel <= -1) {
          return { level: current.level - 1, scoreInLevel: 0 };
        }
        return { level: current.level, scoreInLevel: current.scoreInLevel - 1 };
      });
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
      <div className="Level">{`Your current level is: ${levelObj.level} ${levelObj.scoreInLevel}`}</div>
      <div className="scoreboard">
        <TeamScore className="teamscore" name="Blue" score={score.Blue} />
        <TeamScore className="teamscore" name="Red" score={score.Red} />
      </div>
      <Equation
        className="equation"
        callback={gotRightAnswer}
        level={levelObj.level}
      />
    </div>
  );
}

export default App;
