import './App.css';
import React, { useState } from 'react';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Navbar from './components/Navbar';
import { Outlet, useNavigate } from 'react-router-dom';
import Header from './components/Header/Header';

export const QuestionContext = React.createContext();

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

function App() {
  let navigate = useNavigate();
  let [isDrawerOpen, setIsDrawerOpen] = useState(false);
  function toggleDrawer() {
    setIsDrawerOpen(prevState => !prevState);
  }
  let [questionNumber, setQuestionNumber] = useState(0);
  function changeQuestionNumber(number) {
    setQuestionNumber(number);
  }
  const [open, setOpen] = React.useState(false);
  let [route, setRoute] = useState('')
  const handleOpen = (path) => {
    setOpen(true);
    setRoute(path);
  };
  const handleClose = (leavePage) => {
    setOpen(false);
    if (leavePage) {
      navigate(route);
    }
  };
  return (
    <div className="App" style={{height: '100%'}}>
      <Modal
        open={open}
        onClose={() => {handleClose(false)}}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={modalStyles}>
          <Typography variant='body1' id="modal-modal-description" sx={{ mt: 2 }} textAlign='center'>
            This will reset your quiz progress, do you want to continue?
          </Typography>
          <div className="button-container">
            <Button onClick={() => {handleClose(true)}} variant='contained' sx={{backgroundColor: 'var(--color-danger)'}}>Quit game</Button>
            <Button onClick={() => {handleClose(false)}} variant='contained' sx={{backgroundColor: 'var(--primary-color)'}}>Stay here</Button>
          </div>
        </Box>
      </Modal>
      <QuestionContext.Provider value={{questionNumber: questionNumber, changeQuestionNumber: changeQuestionNumber, handleOpen: handleOpen}}>
        <Header isDrawerOpen={isDrawerOpen} toggleDrawer={toggleDrawer}></Header>
        <div style={{padding: '0 3%', height: '100%', backgroundColor: 'var(--page-background)'}}>
          <Outlet />
        </div>
        <Navbar isDrawerOpen={isDrawerOpen} setIsDrawerOpen={setIsDrawerOpen} />
      </QuestionContext.Provider>
    </div>
  );
}

export default App;
