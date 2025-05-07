import { useQuiz } from "../contexts/QuizContext";

function Progress() {
  const { levelQuizSort, points, answer } = useQuiz();
  const num = 10;
  return (
    <header className="progress">
      <progress max={num} value={levelQuizSort + +(answer !== null)} />
      <p>
        Level Question <strong>{levelQuizSort + 1}</strong> / {num}
      </p>
      <p>
        Point: <strong>{points}</strong>
      </p>
    </header>
  );
}

export default Progress;
