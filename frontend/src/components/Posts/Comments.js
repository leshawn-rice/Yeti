// External Dependencies
import React from 'react';
// Components
import Comment from './Comment';
import NotFound from '../NotFound';
// Styles
import '../../styles/Comments.css';

const Comments = ({ comments }) => {
  if (!comments.length) {
    return (
      <NotFound />
    )
  }
  return (
    <div className="Comments">
      {comments.map(comment => (
        <Comment key={comment.id} comment={comment} />
      ))}
    </div>
  )
}

export default Comments;