import { useEffect, useReducer } from "react";
import { reducer, initialState } from "./state/initialState";
import {
  Header,
  Main,
  Error,
  Loader,
  StartScreen,
  Question,
  NextButton,
  Progress,
  Timer,
  Footer,
} from "./components";
import FinishedUI from "./components/FinishedUI";

export default function App() {
  const [
    { questions, status, index, answer, points, highScore, secondsRemaining },
    dispatch,
  ] = useReducer(reducer, initialState);

  const numberOfQuestions = questions.length;
  const totalPoints = questions.reduce((acc, cur) => acc + cur.points, 0);

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
        {status === "active" && (
          <>
            <Progress
              index={index}
              numQuestions={numberOfQuestions}
              points={points}
              totalPoints={totalPoints}
              answer={answer}
            />
            <Question
              question={questions[index]}
              dispatch={dispatch}
              answer={answer}
            />
            <Footer>
              <Timer dispatch={dispatch} secondsRemaining={secondsRemaining} />
              <NextButton
                dispatch={dispatch}
                answer={answer}
                index={index}
                numQuestions={numberOfQuestions}
              />
            </Footer>
          </>
        )}
        {status === "finished" && (
          <FinishedUI
            points={points}
            totalPoints={totalPoints}
            highScore={highScore}
            dispatch={dispatch}
          />
        )}
      </Main>
    </div>
  );
}
