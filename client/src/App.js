import TeamScore from "./components/TeamScore";
import Equation from "./components/Equation";
import "./styles/App.css";
import { useState } from "react";

function App() {
  const [score, setScore] = useState({ Blue: 0, Red: 0 });

  /*This function is passed as a callback to the Equation component. If the answer given to the 
  equation is the correct answer, the Equation component will pass 'true' to gotRightAnswer, if the answer is wrong it will pass 'false'. 
  That will be used to update the score state*/
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
