import React from "react";
import {
  operators,
  randomNumber,
  Number,
  Operator,
  Result,
  CheckButton,
} from "./helperFunctions";

export default function Equation(props) {
  const [currentEquation, setCurrentEquation] = React.useState({
    num1: randomNumber(props.max),
    num2: randomNumber(props.max),
    operator: operators[randomNumber(operators.length)],
  });

  const [userAnswer, setUserAnswer] = React.useState("");
  function handleChange(e) {
    setUserAnswer(e.target.value);
  }

  function handleClick() {
    const correctAnswer = eval(
      `${currentEquation.num1}${currentEquation.operator}${currentEquation.num2}`
    );

    if (userAnswer == correctAnswer) {
      alert(
        "Correct answer." + (props.levelUp ? "\nYou passed the level!" : "")
      );
      props.callback(true);
      setUserAnswer("");
      setCurrentEquation({
        num1: randomNumber(props.max),
        num2: randomNumber(props.max),
        operator: operators[randomNumber(operators.length)],
      });
    } else {
      alert(
        "Wrong answer. " +
          (props.levelDown ? "You went back a level." : "") +
          "The answer is " +
          correctAnswer +
          ". Try again."
      );
      props.callback(false);
      setUserAnswer("");
    }
  }
  return (
    <div className="Equation">
      <span>
        {" "}
        <Number id="num1" value={currentEquation.num1} />{" "}
      </span>
      <span>
        {" "}
        <Operator value={currentEquation.operator} />{" "}
      </span>
      <span>
        {" "}
        <Number id="num2" value={currentEquation.num2} />{" "}
      </span>
      <span> = </span>
      <span>
        {" "}
        <Result onChange={handleChange} value={userAnswer} />{" "}
      </span>

      <span>
        <CheckButton
          id="resultBtn"
          className="resultBtn"
          onClick={handleClick}
        />
      </span>
    </div>
  );
}
