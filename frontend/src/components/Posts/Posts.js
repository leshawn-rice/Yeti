// External Dependencies
import React from 'react';
// Components
import ContentItem from './ContentItem';
import NotFound from '../NotFound';
// Styles
import '../../styles/Posts.css';

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