export default function Question(props) {
  const answerStyles = {
    firstUnchecked: {
      cursor: "pointer",
    },
    firstChecked: {
      border: "none",
      backgroundColor: "#D6DBF5",
      cursor: "pointer",
    },
    secondCorrect: {
      border: "none",
      backgroundColor: "#94D7A2",
      outline: "none",
    },
    secondUncorrect: {
      border: "none",
      backgroundColor: "#F8BCBC",
      opacity: "0.5",
      outline: "none",
    },
    secondUnchecked: {
      opacity: "0.5",
      outline: "none",
    },
  };
  const answerElements = props.allAnswers.map((item) => {
    let phaseProps = {};
    if (props.phase === 1) {
      phaseProps =
        item === props.userInput
          ? {
              style: { ...answerStyles.firstChecked },
              onClick: () => {
                props.changeAnswer(props.id, item);
              },
            }
          : {
              style: { ...answerStyles.firstUnchecked },
              onClick: () => {
                props.changeAnswer(props.id, item);
              },
            };
    } else if (props.phase === 2) {
      if (item === props.correct) {
        // This is correct answer, so button color is green
        phaseProps = {
          style: { ...answerStyles.secondCorrect },
        };
      } else if (item === props.userInput) {
        // This is mistake, so button color is red
        phaseProps = {
          style: { ...answerStyles.secondUncorrect },
        };
      } else {
        // This is neither, so button style is transparent
        phaseProps = {
          style: { ...answerStyles.secondUnchecked },
        };
      }
    }

    return (
      <button
        key={item}
        className="answer-btn"
        dangerouslySetInnerHTML={{ __html: item }}
        {...phaseProps}
      />
    );
  });

  return (
    <div className="question">
      <h3 dangerouslySetInnerHTML={{ __html: props.questionLabel }} />
      <div className="answers">{answerElements}</div>
    </div>
  );
}
