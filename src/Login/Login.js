
import React , { useState } from 'react';
import './Login.css';
import PropTypes from 'prop-types';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Login = () => {

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [authenticated, setAuthenticated] = useState(false);

    const navigate = useNavigate();
  
    const handleLogin = async (e) => {
      e.preventDefault();
      try {
        const response = await axios.post('https://todo_project.test/api/v1/authenticate/user', {
          email,
          password,
        }, {
          headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json',
          },
        });
        if (response.status === 200) {
          // Login was successful, handle the response accordingly.
          // setToken();
          sessionStorage.setItem('token', JSON.stringify(response.data.data.access_token));
          sessionStorage.setItem('user', JSON.stringify(response.data.data.user));
          sessionStorage.setItem('authenticated', true);
          // console.log('Login successful', response.data.data.user);
          // setAuthenticated(true)
          isAuthenticated(true)
          navigate('/todos');

        } else {
          // Handle login errors, e.g., display an error message to the user.
          console.error('Login failed');
          isAuthenticated(false)
          sessionStorage.setItem('authenticated', false);
        }
      } catch (error) {
        // Handle network or other errors, e.g., display an error message to the user.
        isAuthenticated(false)
        sessionStorage.setItem('authenticated', false);
        console.error('An error occurred', error);
      }
    };

   const isAuthenticated = (data) => {
     
      setAuthenticated(data)
    };
  


   return (  
     
      <div className="container">
        <div className="login-form">
            <div className="form-header">
                Login
            </div>
            <form onSubmit={handleLogin}>
                <div className="input-group">
                    <label htmlFor="email">Email</label>
                    <input type="email" id="email" 
                     placeholder="Enter your email" 
                     onChange={e => setEmail(e.target.value)}
                     />
                </div>
                <div className="input-group">
                    <label htmlFor="password">Password</label>
                    <input type="password" id="password" 
                   placeholder="Enter your password"
                   onChange={e => setPassword(e.target.value)}
                    />
                </div>
                <button className="btn">Login</button>
            </form>
            <div className="error-message">
            
            </div>
        </div>
       </div>

   );
  
}
// Login.propTypes = {
//     setToken: PropTypes.func.isRequired
// }
export default Login;