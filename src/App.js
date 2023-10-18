import React, { useState } from 'react';
import './App.css';
import Login from './Login/Login';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Todos from './components/Todos/Todos';

function setToken(userToken) {
  sessionStorage.setItem('token', JSON.stringify(userToken));
}

function getToken() {
  const tokenString = sessionStorage.getItem('token');
  const userToken = JSON.parse(tokenString);
  return userToken?.token
}

function App() {

  const [token, setToken] = useState(null);

  const Token = getToken();

  // if(!token) {
  //      return <Login setToken={setToken} /> 
  // }

  return (
    <div className="App">
      <Router>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/todos" element={<Todos/>} />
        </Routes>
      </Router>
     </div>
  );
}

export default App;
