import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Nav from './Components/Nav/Nav';
import Login from './Components/Auth/Login';
import Signup from './Components/Auth/Signup';
import ChatBody from './Components/ChatBody/ChatBody';


function App() {
  return (
    <Router>
      <div className="__main">
        <Nav />
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/chat" element={<ChatBody />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
