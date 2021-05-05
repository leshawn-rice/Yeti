// External Dependencies
import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { Redirect } from 'react-router';
// Components
import ProfileContent from './ProfileContent';
// Styles
import '../../../styles/Profile.css';


const Profile = () => {
  const [activeTab, setActiveTab] = useState(null);

  const user = useSelector(state => state.userReducer.user);

  useEffect(() => {
    const tablist = document.querySelector('.Profile-Tablist');
    setActiveTab('Posts');

    const toggleActive = (evt) => {
      const target = evt.target;
      if (!target.classList.contains('Profile-Tab')) return;
      for (let child of tablist.children) {
        child.classList.remove('active');
      }
      target.classList.add('active');
      setActiveTab(target.innerText);
    }

    tablist.addEventListener('click', toggleActive);
    return () => tablist.removeEventListener('click', toggleActive)
  }, [])

  if (!user.username) return <Redirect to="/" />

  return (
    <div className="Profile">
      <div className="Profile-Tablist">
        <h1 className="Profile-Tab active">Posts</h1>
        <h1 className="Profile-Tab">Comments</h1>
        <h1 className="Profile-Tab">Saved</h1>
        <h1 className="Profile-Tab">Uprated</h1>
        <h1 className="Profile-Tab">Downrated</h1>
        <div className="slider" role="presentation"></div>
      </div>
      <ProfileContent active={activeTab} />
    </div>
  )
}

export default Profile;