const StartScreen = ({ questionsNums, dispatch }) => {
  return (
    <div className="start">
      <h3>Hello! Welcome to React Quiz!</h3>
      <h4>{questionsNums} questions to test your React mastery! </h4>
      <button onClick={() => dispatch({ type: "START" })} className="big--btn">
        Start
      </button>
    </div>
  );
};

export default StartScreen;
