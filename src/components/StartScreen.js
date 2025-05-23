import { useQuiz } from "../contexts/QuizContext";

function StartScreen() {
  const { questions, dispatch } = useQuiz();
  const numQuestions = questions.length;
  return (
    <div className="start">
      <h2>Welcome to WordQuest 5</h2>
      <h3>Test yourself on {numQuestions} words to learn in grade 5.</h3>
      <p className="highscore test">
        5. sınıfta öğrenmek gereken {numQuestions} kelimede kendini test et.
      </p>
      <button
        className="btn btn-ui"
        onClick={() => dispatch({ type: "start" })}
      >
        Let's start
      </button>
    </div>
  );
}

export default StartScreen;
