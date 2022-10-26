import React from "react";

export default function TeamScore(props) {
  return (
    <div
      className="score-pane"
      style={{ backgroundColor: props.name === "Blue" ? "blue" : "red" }}
    >
      <span>
        <p>{`${props.name} Team`}</p>
        <span id="me_score">{props.score}</span>
      </span>
    </div>
  );
}
