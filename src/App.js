import Header from "./components/Header";
import Main from "./components/Main";
import Loader from "./components/Loader";
import Err from "./components/Err";
import StartScreen from "./components/StartScreen";
import Question from "./components/Question";
import FinishedScreen from "./components/FinishedScreen";
import NextButton from "./components/NextButton";
import Progress from "./components/Progress";
import Footer from "./components/Footer";
import Timer from "./components/Timer";
import LevelScreen from "./components/LevelScreen";
import CompleteScreen from "./components/CompleteScreen";
import { useQuiz } from "./contexts/QuizContext";

function App() {
  const { status } = useQuiz();

  return (
    <div className="app">
      <Header />
      <Main>
        {/* Todo: Duruma göre loader */}
        {status === "loading" && <Loader />}
        {/* Todo: Duruma göre error */}
        {status === "error" && <Err />}
        {/* Todo: Duruma göre başlangıç ekranı */}
        {status === "ready" && <StartScreen />}
        {/* Todo: Duruma göre soruları çalıştır */}
        {status === "active" && (
          <>
            <Progress />
            <Question />
            <Footer>
              <Timer />
              <NextButton />
            </Footer>
          </>
        )}
        {status === "levelUp" && <LevelScreen />}
        {/* Todo: Duruma göre bitiş ekranı */}
        {status === "finished" && <FinishedScreen />}
        {status === "complete" && <CompleteScreen />}
      </Main>
    </div>
  );
}

export default App;
