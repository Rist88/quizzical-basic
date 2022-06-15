export default function Start(props) {
  return (
    <div className="start">
      <h1>Quizzical Trivia</h1>
      <p>Challenge yourself with five easy questions!</p>
      <button className="accent-btn" onClick={props.startQuiz}>
        Start quiz
      </button>
    </div>
  );
}
