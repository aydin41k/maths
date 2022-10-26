import React from "react";
import "./style.css";
import generateQuestion from "./helpers/generateQuestion.js"

export default function App(props) {
    const [{score}, setScoreData] = React.useState({
        score: {
            blueTeam: 0,
            redTeam: 0,
        },
    });

    function incrementScore(team) {
        score[team]++;
        setScoreData({score});
    }

    return <div>
        <div id="top_container">
            <Teams score={score}/>
        </div>
        <div id="equation">
            <Equation scored={(team) => incrementScore(team)}/>
        </div>
    </div>;
}


// Scoreboard
function Teams(props) {
    return <div className="scoreboard">
        <div className="left-pane">
            <Team name="Blue Team" score={props.score.blueTeam}/>
        </div>
        <div className="right-pane">
            <Team name="Red Team" score={props.score.redTeam}/>
        </div>
    </div>;
}

function Team(props) {
    return <span>
        <p>{props.name}</p>
        <span id="me_score">{props.score}</span>
    </span>;
}

// Equation
function Equation(props) {
    const [curEquation, setCurEquation] = React.useState(() => {
        return generateQuestion();
    });
    const inputRef = React.useRef(null);

    function newQuestion() {
        setCurEquation(generateQuestion());
    }

    function handleClick() {
        let answer = curEquation.result;
        let givenAnswer = +(inputRef.current.value);
        if (givenAnswer === answer) {
            alert('Correct answer!');
            newQuestion();
            inputRef.current.value = '';
            props.scored('blueTeam');
        } else {
            alert('Wrong. The answer is ' + answer + '. Try again.');
            inputRef.current.value = '';
            props.scored('redTeam');
        }
    }

    return (
        <div className="equationContainer">
            <span>{curEquation.num1}</span>
            <span>{curEquation.operatorObject.operatorSign}</span>
            <span>{curEquation.num2}</span>
            <span>=</span>
            <input type="text" ref={inputRef}/>
            <button onClick={handleClick}>Check</button>
        </div>
    );
}