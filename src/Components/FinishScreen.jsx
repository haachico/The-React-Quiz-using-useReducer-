const FinishScreen = ({ points, totalPoints, highScore, dispatch }) => {
  const percentagePoints = (points / totalPoints) * 100;
  return (
    <div className="finish">
      <div>
        <h4>
          You have scored {points} out of {totalPoints}(
          {Math.ceil(percentagePoints)}%)
        </h4>
        <p>
          <strong>High Score : {highScore}</strong>
        </p>
      </div>
      <button
        onClick={() => dispatch({ type: "restart" })}
        className="big--btn"
      >
        Restart game
      </button>
    </div>
  );
};
export default FinishScreen;
