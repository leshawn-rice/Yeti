// External Dependencies
import React from 'react';
// Components
import Comment from './Comment';
import NotFound from '../NotFound';
// Styles
import '../../styles/Comments.css';

const Comments = ({ comments, allowDelete }) => {
  if (!comments.length) {
    return (
      <NotFound />
    )
  }

  return (
    <div className="Comments">
      {comments.map(comment => (
        <Comment key={`comment-${comment.id}`} comment={comment} allowDelete={allowDelete} />
      ))}
    </div>
  )
}

export default Comments;