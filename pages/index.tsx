import type { NextPage } from "next";
import { useEffect, useState } from "react";
import Main from "../components/Main";
import Start from "../components/Start";
import Head from "next/head";
import { nanoid } from "nanoid";
import Confetti from "react-confetti";

const Home: NextPage = () => {
  const [phase, setPhase] = useState(0);
  const [grabQuiz, setGrabQuiz] = useState(true);
  const [quizData, setQuizData] = useState([]);

  useEffect(() => {
    // Shuffle allAnswers array
    function shuffle(oldAnswers: string[]) {
      let array = oldAnswers;
      let currentIndex = array.length,
        randomIndex;
      // While there remain elements to shuffle...
      while (currentIndex !== 0) {
        // Pick a remaining element...
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex--;
        // And swap it with the current element.
        [array[currentIndex], array[randomIndex]] = [
          array[randomIndex],
          array[currentIndex],
        ];
      }
      return array;
    }

    async function fetchQuiz() {
      const res = await fetch(
        "https://opentdb.com/api.php?amount=5&difficulty=easy"
      );
      const data = await res.json();
      // console.log(data)
      const newQuiz = data.results.map((item) => ({
        questionLabel: item.question,
        correct: item.correct_answer,
        allAnswers:
          item.type === "multiple"
            ? shuffle([...item.incorrect_answers, item.correct_answer])
            : ["True", "False"],
        userInput: "",
        id: nanoid(),
      }));
      setQuizData(newQuiz);
      // Output answers (for testing purposes!!😁)
      // const correctAnswersTest = newQuiz.map((item, i) => `Q: ${i+1}, A: ${item.correct}`)
      // correctAnswersTest.forEach(item => console.log(item))
      ///////////////////////////////
    }

    if (grabQuiz) {
      fetchQuiz();
      setGrabQuiz(false);
    }
  }, [grabQuiz]);

  function changeAnswer(id, value) {
    setQuizData((oldQuizData) =>
      oldQuizData.map((item) =>
        item.id === id ? { ...item, userInput: value } : item
      )
    );
  }

  function startQuiz() {
    setPhase(1);
  }

  function checkAnswers() {
    setPhase(2);
  }

  function calculateResult() {
    let correctCount = 0;
    for (let question of quizData) {
      if (question.userInput === question.correct) {
        correctCount++;
      }
    }

    return correctCount;
  }

  function playAgain() {
    setPhase(1);
    setGrabQuiz(true);
  }
  return (
    <div className="container">
      <Head>
        <title>Quizzical</title>
        <meta name="description" content="Basic trivia app" />
        <link rel="icon" href="/favicon.ico" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" />
        <link
          href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&family=Karla:wght@700&display=swap"
          rel="stylesheet"
        ></link>
      </Head>
      <div className="app">
        <div className={phase > 0 ? "blob-top small" : "blob-top"}>
          <svg xmlns="http://www.w3.org/2000/svg">
            <path d="M156.4,339.5c31.8-2.5,59.4-26.8,80.2-48.5c28.3-29.5,40.5-47,56.1-85.1c14-34.3,20.7-75.6,2.3-111  c-18.1-34.8-55.7-58-90.4-72.3c-11.7-4.8-24.1-8.8-36.8-11.5l-0.9-0.9l-0.6,0.6c-27.7-5.8-56.6-6-82.4,3c-38.8,13.6-64,48.8-66.8,90.3c-3,43.9,17.8,88.3,33.7,128.8c5.3,13.5,10.4,27.1,14.9,40.9C77.5,309.9,111,343,156.4,339.5z" />
          </svg>
        </div>
        <div className={phase > 0 ? "blob-bottom small" : "blob-bottom"}>
          <svg xmlns="http://www.w3.org/2000/svg">
            <path d="M156.4,339.5c31.8-2.5,59.4-26.8,80.2-48.5c28.3-29.5,40.5-47,56.1-85.1c14-34.3,20.7-75.6,2.3-111  c-18.1-34.8-55.7-58-90.4-72.3c-11.7-4.8-24.1-8.8-36.8-11.5l-0.9-0.9l-0.6,0.6c-27.7-5.8-56.6-6-82.4,3c-38.8,13.6-64,48.8-66.8,90.3c-3,43.9,17.8,88.3,33.7,128.8c5.3,13.5,10.4,27.1,14.9,40.9C77.5,309.9,111,343,156.4,339.5z" />
          </svg>
        </div>
        {phase === 0 && <Start startQuiz={startQuiz} />}
        {phase !== 0 && (
          <Main
            quizData={quizData}
            phase={phase}
            changeAnswer={changeAnswer}
            checkAnswers={checkAnswers}
            calculateResult={calculateResult}
            playAgain={playAgain}
          />
        )}
        {phase === 2 && calculateResult() === quizData.length && <Confetti />}
      </div>
    </div>
  );
};

export default Home;
