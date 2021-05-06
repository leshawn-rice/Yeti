// External Dependencies
import React from 'react';
// Components
import Post from './Post';
import NotFound from '../NotFound';
// Styles
import '../../styles/Posts.css';

const Posts = ({ posts }) => {
  if (!posts.length) {
    return (
      <NotFound />
    )
  }
  return (
    <div className="Posts">
      {posts.map(post => (
        <Post key={post.id} post={post} showComment={true} />
      ))}
    </div>
  )
}

export default Posts;