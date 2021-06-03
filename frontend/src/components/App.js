// External dependencies
import React, { useEffect } from 'react';
import { BrowserRouter, Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
// Internal Dependencies
import { getLocationApi, clearErrors, refreshUserApi } from '../redux/actionCreators';
// Components
import Navbar from './Nav/Navbar';
import Router from './Routes/Router';
// Styles
import '../styles/App.css';
import Alert from './Alert';

const App = () => {
  const dispatch = useDispatch();
  const user = useSelector(state => state.userReducer.user);
  const token = useSelector(state => state.userReducer.token);
  const errorThrown = useSelector(state => state.errorReducer.errorThrown);
  const errors = useSelector(state => state.errorReducer.errors);

  useEffect(() => {
    // Because we use a persisted store, when the App component first mounts, clear any errors
    // from state
    dispatch(clearErrors());
    // Grab the user's location anytime the app mounts
    dispatch(getLocationApi());
    // Refresh the user anytime the app mounts
    if (user.username) dispatch(refreshUserApi(token, user.username));
  }, [dispatch, token, user.username]);


  // if (!Array.isArray(errors)) {
  //   dispatch(clearErrors());
  // }

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
        {errorThrown ?
          Array.isArray(errors) ? (
            errors.map(err => <Alert key={err.message} message={err.message} status={err.status} />)
          ) : <Alert key={errors.message} message={errors.message} status={errors.status} /> : null
        }
        <Router />
      </div>
    </BrowserRouter>
  );
}

export default App;
