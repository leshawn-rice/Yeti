// External Dependencies
import React from 'react';
// Components
import ContentItem from './ContentItem';
import NotFound from '../NotFound';
// Styles
import '../../styles/Posts.css';

/**
 * Comments Component
 * 
 * Returns a list of ContentItem Components for each post in
 * the posts prop
 */

const Posts = ({ posts, allowDelete }) => {
  if (!posts.length) {
    return (
      <NotFound />
    )
  }
  return (
    <div className="Posts">
      {posts.map(post => (
        <ContentItem
          key={`post-${post.id}`}
          contentItem={post}
          type='post'
          showComment={true}
          allowDelete={allowDelete} />
      ))}
    </div>
  )
}

export default Posts;