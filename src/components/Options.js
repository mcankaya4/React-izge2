import { useQuiz } from "../contexts/QuizContext";

function Options({ question }) {
  const { dispatch, answer } = useQuiz();
  const hasAnswered = answer !== null;
  return (
    <div className="options">
      {question.options.map((option, i) => (
        <button
          onClick={() => {
            dispatch({ type: "newAnswer", payload: i });
          }}
          className={`btn btn-option ${i === answer && "answer"} ${hasAnswered ? (i === question?.correctOption ? "correct" : "wrong") : ""}`}
          key={option}
          disabled={hasAnswered}
        >
          {option}
        </button>
      ))}
    </div>
  );
}

export default Options;
