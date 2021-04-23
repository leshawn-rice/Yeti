import React, { useEffect, useState } from 'react';
import ios from '../../img/download-ios.svg';
import android from '../../img/download-android.svg';
import '../../styles/Home.css'

const Home = () => {
  const [mobileView, setMobileView] = useState(false);

  useEffect(() => {
    const setResponsiveness = () => {
      return window.innerWidth < 900
        ? setMobileView(true)
        : setMobileView(false);
    };
    setResponsiveness();
    window.addEventListener('resize', setResponsiveness);
    // cleanup function
    return () => {
      window.removeEventListener('resize', setResponsiveness);
    }
  }, []);

  const displayMobile = () => {
    return (
      <div className="Downloads">
        <img className="Home-Download-Image" src={ios} alt="Download on Apple App Store" />
        <img className="Home-Download-Image" src={android} alt="Download on Google Play Store" />
      </div>
    )
  }

  const displayDesktop = () => {
    return (
      <h1>Hello World</h1>
    )
  }

  return (
    <>
      { mobileView ? displayMobile() : displayDesktop()}
    </>
  )
}

export default Home;