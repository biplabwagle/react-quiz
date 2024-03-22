import React from "react";

function FinishedUI({ points, totalPoints, highScore, dispatch }) {
  const percentage = Math.ceil((points / totalPoints) * 100);
  let emoji;
  if (percentage === 100) emoji = "💰";
  if (percentage >= 80 && percentage < 100) emoji = "🥳";
  if (percentage >= 100 && percentage <= 50) emoji = "🤑";
  if (percentage < 50) emoji = "🤦‍♂️";
  return (
    <>
      <p className="result">
        {emoji} You finished <strong>{points}</strong> out of {totalPoints}{" "}
        points.(
        {percentage})%
      </p>
      <p className="highscore">Highscore: {highScore} points</p>

      <button
        className="btn btn-ui"
        onClick={() => dispatch({ type: "restart" })}
      >
        Restart Quiz
      </button>
    </>
  );
}

export default FinishedUI;
