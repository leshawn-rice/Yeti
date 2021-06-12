// External Dependencies
import React from 'react';
// Components
import CreatePost from '../Posts/CreatePost';
import LocalPosts from '../Posts/LocalPosts';
// Styles
import '../../styles/Home.css'

/**
 * Home Component
 * 
 * Shows the Create Post & Local Posts components
 */

const Home = () => {
  return (
    <div className="Home">
      <h1 className="Home-Header">Yeti</h1>
      <CreatePost />
      <LocalPosts />
    </div>
  )
}

export default Home;