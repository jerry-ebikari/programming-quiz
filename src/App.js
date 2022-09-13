import './App.css';
import React, { useState } from 'react'
import Navbar from './components/Navbar';
import { Outlet } from 'react-router-dom';
import Header from './components/Header/Header';

export const ModeContext = React.createContext();
function isMobile() {
  return window.innerWidth < 768;
}


function App() {
  let [isDrawerOpen, setIsDrawerOpen] = useState(false);
  function toggleDrawer() {
    setIsDrawerOpen(prevState => !prevState);
  }
  return (
    <div className="App" style={{height: '100%'}}>
      <ModeContext.Provider value={isMobile}>
        <Header isDrawerOpen={isDrawerOpen} toggleDrawer={toggleDrawer}></Header>
        <div style={{padding: '0 3%', height: '100%', backgroundColor: 'var(--page-background)'}}>
          <Outlet />
        </div>
        <Navbar isDrawerOpen={isDrawerOpen} setIsDrawerOpen={setIsDrawerOpen} />
      </ModeContext.Provider>
    </div>
  );
}

export default App;
