import Question from "./Question";

export default function Main(props) {
  const questionElements = props.quizData.map((item) => (
    <Question
      key={item.id}
      phase={props.phase}
      id={item.id}
      questionLabel={item.questionLabel}
      allAnswers={item.allAnswers}
      userInput={item.userInput}
      correct={item.correct}
      changeAnswer={props.changeAnswer}
    />
  ));

  const checkBtn = (
    <button className="accent-btn check-btn" onClick={props.checkAnswers}>
      Check answers
    </button>
  );

  const resultUI = (
    <section className="result">
      <strong>
        You scored {props.calculateResult()}/{props.quizData.length} correct
        answers
      </strong>
      <button className="accent-btn" onClick={props.playAgain}>
        Play again
      </button>
    </section>
  );

  return (
    <main className="main">
      {questionElements}
      {props.phase === 1 && checkBtn}
      {props.phase === 2 && resultUI}
    </main>
  );
}
