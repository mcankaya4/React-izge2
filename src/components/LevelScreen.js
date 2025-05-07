import { useQuiz } from "../contexts/QuizContext";

function LevelScreen() {
  const { level, points, dispatch } = useQuiz();
  return (
    <>
      <p className="highscore">Congratulations (Tebrikler)</p>
      <div className="result">
        <p>
          {level}st level completed. <span>💯</span>
        </p>
      </div>
      <p className="highscore">
        At level <strong>{level}</strong> you managed to collect {points}
        points.
      </p>
      <p className="highscore">
        <strong>{level}</strong>. levelde {points} puan toplamayı başardın.
      </p>
      <button
        className="btn btn-ui"
        onClick={() => {
          dispatch({ type: "nextLevel" });
        }}
      >
        Next Level 👉🏻
      </button>
    </>
  );
}

export default LevelScreen;
