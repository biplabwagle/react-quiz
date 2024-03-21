import { useEffect, useReducer } from "react";
import { reducer, initialState } from "./state/initialState";
import {
  Header,
  Main,
  Error,
  Loader,
  StartScreen,
  Question,
} from "./components";

export default function App() {
  const [{ questions, status }, dispatch] = useReducer(reducer, initialState);
  const numberOfQuestions = questions.length;
  useEffect(
    () => async () => {
      try {
        const response = await fetch("http://localhost:9000/questions");
        const data = await response.json();
        dispatch({ type: "data received", payload: data });
      } catch (error) {
        dispatch({ type: "data failed", payload: error });
      }
    },
    []
  );
  return (
    <div className="app">
      <Header />
      <Main>
        {status === "loading" && <Loader />}
        {status === "error" && <Error />}
        {status === "ready" && (
          <StartScreen
            numberOfQuestions={numberOfQuestions}
            dispatch={dispatch}
          />
        )}
        {status === "active" && <Question />}
      </Main>
    </div>
  );
}
