import { useEffect } from "react";

const Timer = ({ dispatch, secondsRemaining }) => {
  const mins = Math.floor(secondsRemaining / 60);
  const secs = secondsRemaining % 60;
  useEffect(() => {
    const timer = setInterval(() => {
      dispatch({ type: "tick" });
    }, 1000);
    return () => clearInterval(timer);
  }, []);
  return (
    <div>
      <p>
        {mins < 10 ? "0" : ""}
        {mins}: {secs < 10 ? "0" : ""}
        {secs}
      </p>
    </div>
  );
};

export default Timer;
