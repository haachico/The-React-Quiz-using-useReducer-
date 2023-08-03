const NextButton = ({ answer, dispatch, index, questionsNums }) => {
  if (answer === null) return;
  if (index < questionsNums - 1)
    return (
      <div>
        <button
          onClick={() => dispatch({ type: "nextQuestion" })}
          className="big--btn"
        >
          Next
        </button>
      </div>
    );
  if (index === questionsNums - 1)
    return (
      <div>
        <button
          onClick={() => dispatch({ type: "finish" })}
          className="big--btn"
        >
          Finish
        </button>
      </div>
    );
};

export default NextButton;
