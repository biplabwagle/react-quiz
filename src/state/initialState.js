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
      const question = state.questions.at(state.index);
      return {
        ...state,
        answer: action.payload,
        points:
          action.payload === question.correctOption
            ? state.points + question.points
            : state.points,
      };
    case "nextQuestion": {
      return { ...state, index: state.index + 1, answer: null };
    }
    case "finished": {
      return { ...state, status: "finished" };
    }
    default:
      throw new Error("This is not good");
  }
}

export { initialState, reducer };
