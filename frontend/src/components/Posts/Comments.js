// External Dependencies
import React from 'react';
// Components
import ContentItem from './ContentItem';
import NotFound from '../NotFound';
// Styles
import '../../styles/Comments.css';

/**
 * Comments Component
 * 
 * Filters null values out of comments and returns a list of ContentItem Components for each comment in
 * the comments prop
 */

const Comments = ({ comments, allowDelete }) => {
  if (!comments.length) {
    return (
      <NotFound />
    )
  }

  const filtered = comments.filter((comment) => comment !== null);

  return (
    <div className="Comments">
      {filtered.map(comment => (
        <ContentItem key={`comment-${comment.id}`} contentItem={comment} type='comment' allowDelete={allowDelete} />
      ))}
    </div>
  )
}

export default Comments;