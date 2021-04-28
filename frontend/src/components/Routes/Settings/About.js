// External Dependencies
import React from 'react';
// Styles
import '../../../styles/About.css';

const About = ({ setActiveSetting }) => {

  const toggleContact = () => {
    const target = document.querySelector('#settings-contact-option');
    target.click();
  }

  return (
    <div className="About">
      <h1 className="About-Header">About Yeti</h1>
      <div className="About-Body">
        Yeti is a free-to-use, open-source application built with React and Express by <a className="About-Link" href="https://leshawnrice.com" rel="noreferrer" target="_blank">Leshawn Rice</a> in 2021, and was inspired by <a className="About-Link" href="https://en.wikipedia.org/wiki/Yik_Yak" rel="noreferrer" target="_blank">Yik Yak</a>.
        <br />
        <br />
        At Yeti, we are dedicated to cultivating a community that everyone can partake in. We have taken certain steps to ensure that our users feel safe on our platform. These include, but are not limited to: randomly creating usernames for our users, not allowing direct messages, and <strong>never</strong> storing location data with associated user information.
        <br />
        <br />
        Keeping our users' information secure is very important to us, so we will never sell, give, or use any of our users' data outside of Yeti itself. The entire codebase for Yeti is public on <a className="About-Link" href="https://github.com/leshawn-rice/Yeti" rel="noreferrer" target="_blank">Github</a>, and we encourage developers to peruse through our codebase and <span onClick={toggleContact} className="About-Link">contact us</span> if you have a way for us to keep our users' information even more secure!
      </div>
    </div>
  )
}

export default About;