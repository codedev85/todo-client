import React, { useEffect } from 'react';
import './App.css';
import Login from './Login/Login';
import { BrowserRouter as Router, Route, Routes , Outlet, useNavigate} from 'react-router-dom';
import Todos from './components/Todos/Todos';
//import ProtectedRoute from './middleware/ProtectedRoute';

// function setToken(userToken) {
//   sessionStorage.setItem('token', JSON.stringify(userToken));
// }

// function getToken() {
//   const tokenString = sessionStorage.getItem('token');
//   const userToken = JSON.parse(tokenString);
//   return userToken?.token
// }

function ProtectedRoute() {

  const navigate = useNavigate();
  const isAuth = sessionStorage.getItem('token');
  

  useEffect(() => {

    if(!isAuth){

      navigate('/'); 

    }
 }, [isAuth,navigate]);

  if (isAuth) {
    console.log('autheticated')
    return <Outlet />;
  } else {
    console.log('not autheticated')
    return null;
    
  }
}
function App(){

  // const isAuth = sessionStorage.getItem('token');
  // const [userIsAuthenticated , setUserIsAuthenticated] = useState(false)
  
  
 
  // useEffect(() => {
  
  //    isAuth !== null ? setUserIsAuthenticated(true) : setUserIsAuthenticated(false)

  // }, [userIsAuthenticated]);

  return (
    <div className="App">
      <Router>
        <Routes>
          <Route path="/" element={<Login />} />
           <Route element={<ProtectedRoute/>}> 
                <Route path="/todos" element={<Todos/>} /> 
           </Route>  
        </Routes> 
      </Router>
     </div>
  );
}

export default App;
