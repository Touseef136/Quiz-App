import React, { useRef, useState } from "react";
import './quiz.css';
import { data } from '../../assets/data';

const Quiz = () => {
  const [index, setIndex] = useState(0);
  const [question, setQuestion] = useState(data[index]);
  const [lock, setLock] = useState(false);
  const [score, setScore] = useState(0);
  const [result, setResult] = useState(false);

  const option1 = useRef(null);
  const option2 = useRef(null);
  const option3 = useRef(null);
  const option4 = useRef(null);



  const option_array = [option1, option2, option3, option4];

  const checkAns = (e, ans) => {
    if (!lock) {
      if (question.ans === ans) {
        e.target.classList.add("correct");
        setScore((prevScore) => prevScore + 1);
      } else {
        e.target.classList.add("wrong");
        option_array[question.ans - 1].current.classList.add("correct");
      }
      setLock(true);
    }
  };

  const next = () => {
    if (lock) {
      if (index === data.length - 1) {
        setResult(true);
        return;
      }
      setIndex((prevIndex) => prevIndex + 1);
      setQuestion(data[index + 1]);
      setLock(false);
      option_array.forEach((option) => {
        option.current.classList.remove("wrong", "correct");
      });
    }
  };

  const Reset = () => {
    // Reset the quiz to its initial state
    setIndex(0);
    setQuestion(data[0]); // Reset to the first question
    setScore(0);
    setLock(false);
    setResult(false);

    // Clear classes for all options
    option_array.forEach((option) => {
      if (option.current) {
        option.current.classList.remove("wrong", "correct");
      }
    });
  };

  if (!data || data.length === 0) {
    return <div>No quiz data available.</div>;
  }

  return (
    <div className="container">
      <h1>Quiz App</h1>
      <hr />
      {result ? (
        <>
          <h1>You Scored {score} out of {data.length}</h1>
          <button onClick={Reset}>Reset</button>
        </>
      ) : (
        <>
          <h2>{index + 1}. {question.question}</h2>
          <ul>
            <li ref={option1} onClick={(e) => checkAns(e, 1)}>{question.option1}</li>
            <li ref={option2} onClick={(e) => checkAns(e, 2)}>{question.option2}</li>
            <li ref={option3} onClick={(e) => checkAns(e, 3)}>{question.option3}</li>
            <li ref={option4} onClick={(e) => checkAns(e, 4)}>{question.option4}</li>

          </ul>
          <button onClick={next}>Next</button>
          <div className="index">{index + 1} of {data.length} questions</div>
        </>
      )}
    </div>
  );
};

export default Quiz;
