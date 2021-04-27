// External dependencies
import React from 'react';
import { BrowserRouter } from 'react-router-dom';
// Components
import Navbar from './Nav/Navbar';
import Router from './Routes/Router';
// Styles
import '../styles/App.css';

function App() {
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
