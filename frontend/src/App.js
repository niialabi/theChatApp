import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Nav from './Components/Nav/Nav';
import ChatBody from './Components/ChatBody/ChatBody';
import Login from './Components/Login/Login';

function App() {
  return (
    <Router>
      <div className="__main">
        <Nav />
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/chat" element={<ChatBody />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;