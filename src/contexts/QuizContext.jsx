import { createContext, useContext, useReducer } from "react";
import { questions } from "../data/questions";

const QuizContext = createContext();

function createShuffledQuestionOrder(totalQuestions) {
  const indices = Array.from({ length: totalQuestions }, (_, i) => i);

  for (let i = indices.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [indices[i], indices[j]] = [indices[j], indices[i]];
  }
  return indices;
}

// Todo: Varsayılan state'ler
const initialState = {
  questions: [...questions],
  quizSort: [...createShuffledQuestionOrder(questions.length)],
  level: 1,
  // loading, error, ready, active, finished
  status: "ready",
  index: 0,
  answer: null,
  points: 0,
  highScore: 0,
  secondsRemaining: 30,
  levelQuizSort: 0,
};

// Todo: State yönetimi
function reducer(state, action) {
  switch (action.type) {
    case "start":
      return {
        ...state,
        status: "active",
      };
    // Todo: Cevabı işaretlediğinde, soruyu tespit et.
    // Todo: answer içerisine işaretlenen cevap sıra numarasını aktar.
    // Todo: işaretlenen cevap sıra numarası, api'deki doğru şık ise;
    // Todo: puana soru puanını ekle, değilse soru puanı olarak devam et.
    case "newAnswer":
      const isLevel = state.index !== 0 && (state.index + 1) % 10 === 0;
      const question = state.questions.at(state.quizSort.at(state.index));
      const numQuiz = state.questions.length - 1;
      return {
        ...state,
        index: state.index + 1,
        levelQuizSort: state.levelQuizSort + 1,
        status:
          state.index < numQuiz
            ? !isLevel
              ? action.payload !== question?.correctOption
                ? "finished"
                : state.status
              : "levelUp"
            : "complete",
        points:
          action.payload === question?.correctOption
            ? state.points + question.points
            : state.points,
        highScore:
          state.points > state.highScore ? state.points : state.highScore,
      };
    // Todo: Süre bittiğinde veya soru sayısı bittiğinde aktif olacak.
    // Todo: Durumu finished olarak ayarla.
    // Todo: Score yüksek score'dan fazla ise yüksek score'u güncelle.
    case "finish":
      return {
        ...state,
        status: "finished",
        levelQuizSort: 0,
        highScore:
          state.points > state.highScore ? state.points : state.highScore,
      };
    // Todo: Restart olurken initial'i aktar ve güncelle.
    // Todo: Durumu ready yap, soruları aktar, highscore'u al.
    case "restartQuiz":
      return {
        ...initialState,
        status: "active",
        highScore: state.highScore,
        quizSort: [...createShuffledQuestionOrder(questions.length)],
      };
    // Todo: Her 1 saniyede tetiklenecek olan tik'de saniyeyi 1 azalt.
    // Todo: secondsRemaining 0 ise durumu finished yap yoksa durum kalsın.
    case "tik":
      return {
        ...state,
        secondsRemaining: state.secondsRemaining - 1,
        highScore:
          state.points > state.highScore ? state.points : state.highScore,
        status: state.secondsRemaining === 0 ? "finished" : state.status,
      };
    case "nextLevel":
      return {
        ...state,
        level: state.level + 1,
        secondsRemaining: 30,
        status: "active",
        levelQuizSort: 0,
      };
    // Todo: Yanlış komut geldiyse hata döndür.
    default:
      throw new Error(`Unknown action type ${action.type}`);
  }
}

function QuizProvider({ children }) {
  const [
    {
      questions,
      status,
      index,
      answer,
      points,
      highScore,
      secondsRemaining,
      quizSort,
      level,
      levelQuizSort,
    },
    dispatch,
  ] = useReducer(reducer, initialState);

  return (
    <QuizContext.Provider
      value={{
        questions,
        status,
        index,
        answer,
        points,
        highScore,
        secondsRemaining,
        quizSort,
        level,
        levelQuizSort,
        dispatch,
      }}
    >
      {children}
    </QuizContext.Provider>
  );
}

function useQuiz() {
  const context = useContext(QuizContext);
  if (context === undefined)
    throw new Error("useQuiz'i yanlış yerde kullandın!");
  return context;
}

export { QuizProvider, useQuiz };
