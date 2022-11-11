import TeamScore from "./components/TeamScore";
import Equation from "./components/Equation";
import "./styles/App.css";
import { useState } from "react";

function App() {
  const [score, setScore] = useState({ Blue: 0, Red: 0 });

  /* We use state to keep the level because we want the div with level information to be re-render every time the level changes */
  const [levelObj, setLevel] = useState({
    level: 1,
    scoreInLevel: 0,
    bestLevel: 1,
  });

  const ROUNDS_IN_LEVEL = 3;
  /*This function is passed as a callback to the Equation component. If the answer given to the 
  equation is the correct answer, the Equation component will pass 'true' to gotRightAnswer, if the answer is wrong it will pass 'false'. 
  That will be used to update the score state*/
  function gotRightAnswer(isAnswerRight) {
    if (isAnswerRight) {
      setLevel((current) => {
        if (current.scoreInLevel >= ROUNDS_IN_LEVEL - 1) {
          return {
            level: current.level + 1,
            scoreInLevel: 0,
            bestLevel: Math.max(current.level + 1, current.bestLevel),
          };
        }
        return { ...current, scoreInLevel: current.scoreInLevel + 1 };
      });
      setScore((current) => {
        return {
          ...current,
          Blue: current.Blue + 1,
        };
      });
    } else {
      setLevel((current) => {
        /*To avoid goind to a level lower than level 1*/
        if (current.level === 1) {
          return { ...current };
        }
        if (current.scoreInLevel <= -1 * ROUNDS_IN_LEVEL + 1) {
          return { ...current, level: current.level - 1, scoreInLevel: 0 };
        }
        return {
          ...current,
          level: current.level,
          scoreInLevel: current.scoreInLevel - 1,
        };
      });
      setScore((current) => {
        return {
          ...current,
          Red: current.Red + 1,
        };
      });
    }
  }

  /*max number will be (5 + (level - 1) * 5), so in level 1 max number is 5, level 2
  is 10, level 3 is 15 and so on*/
  return (
    <div className="App">
      <div className="scoreboard">
        <TeamScore className="teamscore" name="Blue" score={score.Blue} />
        <TeamScore className="teamscore" name="Red" score={score.Red} />
      </div>
      <div className="Level">
        {`Your current level is: ${levelObj.level} 
      (numbers from 0 to ${5 + (levelObj.level - 1) * 5})`}{" "}
      </div>
      <div> {`Your best level so far is: ${levelObj.bestLevel}`}</div>
      <Equation
        className="equation"
        callback={gotRightAnswer}
        max={5 + (levelObj.level - 1) * 5}
        /*levelUp and levelDown will tell the alert message if the player leveled up or leveled down*/
        levelUp={levelObj.scoreInLevel === ROUNDS_IN_LEVEL - 1}
        levelDown={levelObj.scoreInLevel === 1 - ROUNDS_IN_LEVEL}
      />
    </div>
  );
}

export default App;
