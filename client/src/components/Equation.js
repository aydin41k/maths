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
  //console.log(props.level);
  const [currentEquation, setCurrentEquation] = React.useState({
    num1: randomNumber(props.level),
    num2: randomNumber(props.level),
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
      alert("Correct answer");
      props.callback(true);
      setUserAnswer("");
      setCurrentEquation({
        num1: randomNumber(),
        num2: randomNumber(),
        operator: operators[randomNumber(operators.length)],
      });
    } else {
      alert("Wrong. The answer is " + correctAnswer + ". Try again.");
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
