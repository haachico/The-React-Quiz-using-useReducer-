const Questions = ({ question, answer, dispatch }) => {
  const hasAnswer = answer !== null;
  return (
    <div className="questions--div">
      <h2>{question.question}</h2>

      <div className="options">
        {question.options.map((option, index) => (
          <button
            onClick={() => dispatch({ type: "newAnswer", payload: index })}
            key={option}
            className={`${answer === index ? "selected--answer" : ""} ${
              hasAnswer
                ? index === question.correctOption
                  ? "correct--answer"
                  : "wrong--answer"
                : ""
            }`}
            disabled={hasAnswer}
          >
            {option}
          </button>
        ))}
      </div>
    </div>
  );
};

export default Questions;
