// External dependencies
import React, { useEffect } from 'react';
import { BrowserRouter } from 'react-router-dom';
import { useDispatch } from 'react-redux';
// Internal Dependencies
import { getLocationApi, clearErrors } from '../redux/actionCreators';
// Components
import Navbar from './Nav/Navbar';
import Router from './Routes/Router';
// Styles
import '../styles/App.css';

const App = () => {
  const dispatch = useDispatch();

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
        <Router />
      </div>
    </BrowserRouter>
  );
}

export default App;
