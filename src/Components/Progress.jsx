const Progress = ({ questionsNums, index, points, totalPoints, answer }) => {
  return (
    <div>
      <header>
        <progress max={questionsNums} value={index + Number(answer !== null)} />
        <div className="progress">
          <p>
            <strong>
              Question : {index + 1} / {questionsNums}
            </strong>
          </p>

          <p>
            <strong>
              Points : {points}/ {totalPoints}
            </strong>
          </p>
        </div>
      </header>
    </div>
  );
};

export default Progress;
