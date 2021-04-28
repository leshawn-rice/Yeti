// External dependencies
import React, { useEffect } from 'react';
import { BrowserRouter, Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
// Internal Dependencies
import { getLocationApi, clearErrors } from '../redux/actionCreators';
// Components
import Navbar from './Nav/Navbar';
import Router from './Routes/Router';
// Styles
import '../styles/App.css';
import Alert from './Alert';

const App = () => {
  const dispatch = useDispatch();
  const user = useSelector(state => state.authReducer.user);

  useEffect(() => {
    // Because we use a persisted store, when the App component first mounts, clear any errors
    // from state
    dispatch(clearErrors());
    // Grab the user's location anytime the app mounts
    dispatch(getLocationApi());
  }, [dispatch]);


  return (
    <BrowserRouter>
      <Navbar />
      <div className="container">
        {user.username && !user.confirmed ? (
          <Alert
            message={
              <Link className="Email-Confirmation-Link" to="/settings#confirm-email">You need to confirm your email</Link>
            }
            status={400}
          />
        ) : null}
        <Router />
      </div>
    </BrowserRouter>
  );
}

export default App;
