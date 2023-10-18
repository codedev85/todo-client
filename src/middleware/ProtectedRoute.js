// import React from 'react';
// import { Route, Navigate } from 'react-router-dom';
// import Login from '../Login/Login';

// function ProtectedRoute({ element, ...rest }) {
// //   item = sessionStorage.getItem('authenticated');
//   return Login.isAuthenticated(true) ? (
//     <Route {...rest} element={element} />
//   ) : (
//     <Navigate to="/" replace />
//   );
// }

// export default ProtectedRoute;

import React from 'react';

import { BrowserRouter as Router ,Route,useNavigate } from 'react-router-dom';

const ProtectedRoute = ({ component: Component, isAuthorized, ...rest }) => {

  const navigate = useNavigate();
  
  return (
   
        <Route
              {...rest}
              render={(props) => {
                if (isAuthorized) {
                  return <Component {...props} />;
                } else {
                  navigate('/');
                }
              }}
            />
    
    
  );
};

export default ProtectedRoute;
