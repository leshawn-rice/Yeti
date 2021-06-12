// External Dependencies
import React from 'react';
// Components
import ProfilePosts from './ProfilePosts';
import ProfileComments from './ProfileComments';
import ProfileSaved from './ProfileSaved';
import ProfileUprated from './ProfileUprated';
import ProfileDownrated from './ProfileDownrated';
// Styles
import '../../../styles/Profile.css';

/**
 * ProfileContent Component
 * 
 * General Component to display the content of the profile depending on the active prop
 */

const ProfileContent = ({ active }) => {

  const contentOptions = {
    'Posts': <ProfilePosts />,
    'Comments': <ProfileComments />,
    'Saved': <ProfileSaved />,
    'Uprated': <ProfileUprated />,
    'Downrated': <ProfileDownrated />
  }

  return (
    <div className="Profile-Content">
      {contentOptions[active]}
    </div>
  )
}

export default ProfileContent;