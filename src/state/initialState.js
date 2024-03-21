const initialState = {
  questions: [],
  //Possible status states for the app
  //loading, error, ready, active, finished
  status: "loading",
  index: 0,
  answer: null,
  points: 0,
};

function reducer(state, action) {
  switch (action.type) {
    case "data received":
      return { ...state, questions: action.payload, status: "ready" };
    case "data failed":
      return { ...state, status: "error" };
    case "start":
      return { ...state, status: "active" };
    case "newAnswer":
      return { ...state, answer: action.payload };
    default:
      throw new Error("This is not good");
  }
}

export { initialState, reducer };
