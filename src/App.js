import React, { useState , useEffect } from 'react';
import './App.css';
import Login from './Login/Login';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Todos from './components/Todos/Todos';
import ProtectedRoute from './middleware/ProtectedRoute';

function setToken(userToken) {
  sessionStorage.setItem('token', JSON.stringify(userToken));
}

function getToken() {
  const tokenString = sessionStorage.getItem('token');
  const userToken = JSON.parse(tokenString);
  return userToken?.token
}

function App(){

  const isAuth = sessionStorage.getItem('token');
  const [userIsAuthenticated , setUserIsAuthenticated] = useState(false)

  // const [token, setToken] = useState(null);

  // setToken(isAuth)
 

 
  // console.log(userIsAuthenticated )

  const Token = getToken();

  // if(!token) {
  //      return <Login setToken={setToken} /> 
  // }
  useEffect(() => {
  
     isAuth !== null ? setUserIsAuthenticated(true) : setUserIsAuthenticated(false)

  }, [userIsAuthenticated]);

  return (
    <div className="App">
      <Router>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/todos" element={<Todos/>} />
          {/* <ProtectedRoute
            path="/todos"
            component={Todos}
            isAuthorized={userIsAuthenticated}
          /> */}
        </Routes>
      </Router>
     </div>
  );
}

export default App;
