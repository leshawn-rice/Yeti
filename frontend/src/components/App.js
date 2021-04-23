import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import Navbar from './Nav/Navbar';
import Router from './Routes/Router';
// import GeoLocator from '../GeoLocater';
import '../styles/App.css';

function App() {
  // useEffect(() => {
  //   const locate = async () => {
  //     try {
  //       // Serving over HTTPS, use window GeoLocation API
  //       const domLocation = await GeoLocator.getLocationDOM();
  //       setLocation(domLocation);
  //       setLoading(false);
  //     }
  //     catch (err) {
  //       try {
  //         // Serving over HTTP, or disallow location, use less accurate ipinfo API
  //         const apiLocation = await GeoLocator.getLocationAPI();
  //         setLocation(apiLocation);
  //         setLoading(false);
  //       }
  //       catch (e) {
  //         console.warn('Error getting location data!')
  //       }
  //     }
  //   }
  //   locate();
  // }, [])

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
