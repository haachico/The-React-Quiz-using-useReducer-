import "./styles.css";
import { fakeFetch } from "./data/questionsData";
import { useEffect, useReducer } from "react";
import StartScreen from "./Components/StartScreen";
import Questions from "./Components/Questions";
import NextButton from "./Components/NextButton";
import Progress from "./Components/Progress";
import FinishScreen from "./Components/FinishScreen";
import Timer from "./Components/Timer";
import Header from "./Components/Header";

const initialState = {
  questions: [],
  status: "loading",
  index: 0,
  answer: null,
  points: 0,
  highScore: 0,
  secondsRemaining: null
};

const reducer = (state, action) => {
  switch (action.type) {
    case "DATA_RECIEVED":
      return {
        ...state,
        questions: action.payload,
        status: "ready"
      };
    case "ERROR":
      return {
        ...state,
        status: "error"
      };
    case "START":
      return {
        ...state,
        status: "active",
        secondsRemaining: state.questions.length * 30
      };
    case "newAnswer":
      const currentQuestion = state.questions[state.index];
      return {
        ...state,
        answer: action.payload,
        points:
          currentQuestion.correctOption === action.payload
            ? state.points + currentQuestion.points
            : state.points
      };
    case "nextQuestion":
      return {
        ...state,
        index: state.index + 1,
        answer: null
      };
    case "finish":
      return {
        ...state,
        status: "finish",
        highScore:
          state.points > state.highScore ? state.points : state.highScore
      };
    case "restart":
      return {
        ...state,
        status: "ready",
        points: 0,
        index: 0,
        answer: null
      };
    case "tick":
      return {
        ...state,
        secondsRemaining: state.secondsRemaining - 1,
        status: state.secondsRemaining === 0 ? "finish" : state.status
      };
    default:
      return state;
  }
};

export default function App() {
  const [state, dispatch] = useReducer(reducer, initialState);
  const getQuestionsData = async () => {
    try {
      const response = await fakeFetch("https://example.com/api/questions");
      dispatch({ type: "DATA_RECIEVED", payload: response.questions });
    } catch (err) {
      dispatch({ type: "ERROR" });
    }
  };

  useEffect(() => {
    getQuestionsData();
  }, []);

  const questionsNums = state.questions.length;

  const totalPoints = state.questions.reduce((acc, curr) => {
    acc = acc + curr.points;
    return acc;
  }, 0);

  return (
    <div className="App">
      <Header />
      {state.status === "loading" && <h4>Loading...</h4>}
      {state.status === "error" && <h3>Some Error!</h3>}
      {state.status === "ready" && (
        <StartScreen questionsNums={questionsNums} dispatch={dispatch} />
      )}
      {state.status === "active" && (
        <>
          <Progress
            questionsNums={questionsNums}
            index={state.index}
            points={state.points}
            totalPoints={totalPoints}
            answer={state.answer}
          />
          <Questions
            question={state.questions[state.index]}
            answer={state.answer}
            index={state.index}
            dispatch={dispatch}
          />
          <Timer
            dispatch={dispatch}
            secondsRemaining={state.secondsRemaining}
          />
          <NextButton
            answer={state.answer}
            dispatch={dispatch}
            questionsNums={questionsNums}
            index={state.index}
          />
        </>
      )}
      {state.status === "finish" && (
        <FinishScreen
          points={state.points}
          totalPoints={totalPoints}
          highScore={state.highScore}
          dispatch={dispatch}
        />
      )}
    </div>
  );
}
