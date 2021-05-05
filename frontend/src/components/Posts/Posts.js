// External Dependencies
import React from 'react';
// Components
import Post from './Post';
// Styles
import '../../styles/Posts.css';

const Posts = ({ posts }) => {
  return (
    <div className="Posts">
      {posts.map(post => (
        <Post key={post.id} post={post} />
      ))}
    </div>
  )
}

export default Posts;