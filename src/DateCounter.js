import { useReducer } from "react";
const initialState = { count: 0, step: 1 };
function reducer(state, action) {
  switch (action.type) {
    case "add":
      return { ...state, count: state.count + state.step };
    case "subtract":
      return { ...state, count: state.count - state.step };
    case "setCount":
      return { ...state, count: Number(action.payload) };
    case "setStep":
      return { ...state, step: Number(action.payload) };
    default:
      return initialState;
  }
}

function DateCounter() {
  const [state, dispatch] = useReducer(reducer, initialState);
  // This mutates the date object.
  const date = new Date("june 21 2027");
  date.setDate(date.getDate() + state.count);

  const dec = function () {
    dispatch({ type: "subtract" });
  };

  const inc = function () {
    dispatch({ type: "add" });
  };

  const defineCount = function (e) {
    dispatch({ type: "setCount", payload: Number(e.target.value) });
  };

  const defineStep = function (e) {
    dispatch({ type: "setStep", payload: Number(e.target.value) });
  };

  const reset = function () {
    // setCount(0);
    dispatch({ type: "" });
  };

  return (
    <div className="counter">
      <div>
        <input
          type="range"
          min="0"
          max="10"
          value={state.step}
          onChange={defineStep}
        />
        <span>{state.step}</span>
      </div>

      <div>
        <button onClick={dec}>-</button>
        <input value={state.count} onChange={defineCount} />
        <button onClick={inc}>+</button>
      </div>

      <p>{date.toDateString()}</p>

      <div>
        <button onClick={reset}>Reset</button>
      </div>
    </div>
  );
}
export default DateCounter;
