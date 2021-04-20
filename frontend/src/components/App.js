import { useEffect, useState } from 'react';
import GeoLocator from '../GeoLocater';
import '../styles/App.css';

function App() {
  const [location, setLocation] = useState({});
  const [loading, setLoading] = useState(true);
  const [errorThrown, setErrorThrown]

  useEffect(() => {
    const locate = async () => {
      try {
        // Serving over HTTPS, use window GeoLocation API
        const domLocation = await GeoLocator.getLocationDOM();
        setLocation(domLocation);
        setLoading(false);
      }
      catch (err) {
        try {
          // Serving over HTTP, or disallow location, use less accurate ipinfo API
          const apiLocation = await GeoLocator.getLocationAPI();
          setLocation(apiLocation);
          setLoading(false);
        }
        catch (e) {
          console.warn('Error getting location data!')
        }
      }
    }
    locate();
  }, [])

  if (loading) {
    return (
      <div className="App">
        <h1>Loading...</h1>
      </div>
    );
  }

  else {
    return (
      <div className="App">
        <h1>Hello!</h1>
        <p>Your latitude is: {location.latitude} and your longitude is: {location.longitude}</p>
      </div>
    );
  }
}

export default App;
