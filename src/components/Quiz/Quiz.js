import React, { useEffect, useRef, useState } from 'react';
import './Quiz.css';
import Typography from '@mui/material/Typography';
import Paper from '@mui/material/Paper';
import Button from '@mui/material/Button';
import Modal from '@mui/material/Modal';
import Box from '@mui/material/Box';
import data from '../constants/data.json';

function useKey(key, cb) {
  const callbackRef = useRef(cb);
  useEffect(() => {
    callbackRef.current = cb;
  })
  useEffect(() => {
    function handle(event) {
      if (event.code == key) {
        callbackRef.current(event)
      }
    }
    document.addEventListener('keypress', handle)
    return () => document.removeEventListener('keypress', handle)
  }, [key])
}

const modalStyles = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 'min(80%, 500px)',
  bgcolor: 'background.paper',
  boxShadow: 24,
  p: 4,
};

function checkRank(score, total) {
  if (score < 1) return 'F';
  let rank = score / total;
  if (rank < 0.5) return 'D';
  if (rank < 0.8) return 'A';
  return 'S';
}

const rankMap = {
  F: {text: 'Don\'t give up', emoji: '🥺'},
  D: {text: 'Don\'t give up', emoji: '🥺'},
  A: {text: 'You\'re almost there', emoji: '💪'},
  S: {text:'I bow to the master', emoji: '🙇‍♂️'}
}

function Quiz() {
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => {setOpen(false); reset()};
  let questions = data.questions;
  let [questionNumber, setQuestionNumber] = useState(0);
  let question = questions[questionNumber];
  let [selectedAnswer, setSelectedAnswer] = useState();
  let [correctAnswerCount, updateCorrectAnswerCount] = useState(0);
  let [isSelectedCorrect, setIsSelectedCorrect] = useState(false);
  let [submitted, setSubmitted] = useState(false);
  useKey('Enter', () => {
    checkAnswer()
  })

  // CHECK ANSWER
  function checkAnswer() {
    if (!selectedAnswer) {
      alert('Please select an option');
      return;
    }
    setSubmitted((prevState) => {
      if (prevState) {
        if (question.id + 1 == questions.length) {
          handleOpen();
          return;
        }
        setQuestionNumber(prevState => prevState + 1);
        setSelectedAnswer();
        setIsSelectedCorrect(false);
      }
      else {
        if (question.correct_option == selectedAnswer) {
          setIsSelectedCorrect(true);
          updateCorrectAnswerCount(prevState => prevState + 1);
        }
        else {
          setIsSelectedCorrect(false);
        }
      }
      return !prevState;
    });
  }

  // RESET
  function reset() {
    setIsSelectedCorrect(false);
    updateCorrectAnswerCount(0);
    setQuestionNumber(0);
    setSelectedAnswer();
    setSubmitted(false);
  }

  // ASSIGN COLOR
  function assignColor(option, color1, color2, fallback) {
    if (submitted == false) {
      return fallback;
    }
    if (isSelectedCorrect && selectedAnswer == option) {
      return color1;
    }
    if (isSelectedCorrect && selectedAnswer != option) {
      return fallback;
    }
    if (isSelectedCorrect == false && selectedAnswer == option) {
      return color2
    }
    if (isSelectedCorrect == false && selectedAnswer != option) {
      return question.correct_option == option ? color1 : fallback;
    }
  }
  return (
    <div className='question-container' style={{
        height: '100%',
        padding: '70px 0 30px 0',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        flexDirection: 'column'
    }}>
      <div>
      {/* <Button onClick={handleOpen}>Open modal</Button> */}
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
        hideBackdrop
      >
        <Box sx={modalStyles}>
          <Typography variant='h1' id="modal-modal-description" sx={{ mt: 2 }} textAlign='center'>
            {rankMap[checkRank(correctAnswerCount, questions.length)].emoji}
          </Typography>
          <Typography variant='h6' id="modal-modal-description" sx={{ mt: 1 }} textAlign='center'>
            {rankMap[checkRank(correctAnswerCount, questions.length)].text}
          </Typography>
          <div className="button-container">
            {/* <Button onClick={handleClose} variant='contained'>Close</Button> */}
            <Button onClick={handleClose} variant='contained' sx={{backgroundColor: 'var(--primary-color)'}}>Play Again</Button>
          </div>
        </Box>
      </Modal>
    </div>
      <div className="quiz-container">
        <Paper
          sx={{
            padding: '20px',
          }}
          elevation={2}
        >
          <div className="quiz-title">
            <span>
              <Typography variant='h6'>
                JavaScript ({question.id + 1}/{questions.length})
              </Typography>
            </span>
            <span>
              <Typography variant='h6'>
                Score: {correctAnswerCount}
              </Typography>
            </span>
          </div>
          <div className="question-panel">

            {/* QUESTION */}
            <div className='question-header'>
              <Typography sx={{whiteSpace: 'pre-wrap'}} variant='body1'>
                {question.question}
              </Typography>
            </div>

            {/* OPTIONS */}
            {Object.keys(question.options).map(option => { return (
              <label key={option} className='clickable' htmlFor={option}>
                <Paper elevation={6} sx={{
                  padding: '10px',
                  marginTop: '10px',
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  backgroundColor: (() => {return assignColor(option, '#0f0', 'var(--color-danger)', 'transparent')}),
                  color: () => assignColor(option, '#fff', '#fff', '#000')
                  }}>
                  <Typography variant='body1' sx={{fontWeight: 900}}>
                    {question.options[option]}
                  </Typography>
                  <input
                    type="radio"
                    name="answer"
                    id={option}
                    value={option}
                    checked={selectedAnswer == option}
                    disabled={submitted}
                    className='radio-btn'
                    onChange={() => {
                      setSelectedAnswer(option);
                  }} />
                    <div
                      className="radio-div"
                      style={{outline: '2px solid ' + assignColor(option, '#fff', '#fff', '#333')}}
                    >
                      <span
                        className="ball"
                        style={{backgroundColor: assignColor(option, '#fff', '#fff', '')}}
                      ></span>
                    </div>
                </Paper>
              </label>
            )
            })}
          </div>
          <Button
            onClick={checkAnswer}
            variant="contained"
            sx={{backgroundColor: 'var(--primary-color)'}}
          >Submit</Button>
        </Paper>
      </div>
    </div>
  )
}

export default Quiz