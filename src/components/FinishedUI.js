import React from "react";

function FinishedUI({ points, totalPoints }) {
  const percentage = Math.ceil((points / totalPoints) * 100);
  return (
    <p className="result">
      You finished <strong>{points}</strong> out of {totalPoints}({percentage})%
    </p>
  );
}

export default FinishedUI;
