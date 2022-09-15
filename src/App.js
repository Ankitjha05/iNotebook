import './App.css';
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from './Components/Navbar';
import Home from './Components/Home';
import About from './Components/About';
import NoteState from './context/notes/NoteState';
import Login from './Components/Login';
import Singup from './Components/Singup';
import Alert from './Components/Alert';

function App() {
  return (
    <>
      <Router>
        <Navbar />
        <Alert >
          <NoteState>
            <div className="container">
              <Routes>
                <Route exact path='/' element={<Home />} />
                <Route exact path='/about' element={<About />} />
                <Route exact path='/login' element={<Login />} />
                <Route exact path='/singup' element={<Singup />} />
              </Routes>
            </div>
          </NoteState>
        </Alert>
      </Router>
    </>
  );
}

export default App;
