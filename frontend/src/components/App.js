import { useEffect, useState } from 'react';
import GeoLocator from '../GeoLocater';
import '../styles/App.css';

function App() {
  const [adError, setAdError] = useState(null);


  useEffect(() => {
    const locate = async () => {
      try {
        const location = await GeoLocator.getLocation();
        console.log(location);
      }
      catch (err) {
        setAdError(
          <p>
            Your adblocker is preventing Yeti from accessing your location!
            <br />
            Add Yeti to your whitelist or disable it on our site to use Yeti!
          </p>
        )
      }
    }
    locate();
  }, [])

  if (!adError) {
    return (
      <div className="App">
        <h1>Hello World</h1>
      </div>
    );
  }
  else {
    return (
      <div className="App">
        <h1>{adError}</h1>
      </div>
    )
  }
}

export default App;
