// External dependencies
import React, { useEffect } from 'react';
import { BrowserRouter } from 'react-router-dom';
import { useDispatch } from 'react-redux';
// Internal Dependencies
import { checkLocalStorage } from '../redux/actionCreators';
// Components
import Navbar from './Nav/Navbar';
import Router from './Routes/Router';
// Styles
import '../styles/App.css';

function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(checkLocalStorage())
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
