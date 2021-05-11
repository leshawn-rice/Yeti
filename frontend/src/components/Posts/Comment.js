// External Dependencies
import React from 'react';
// Components
import ContentItem from './ContentItem';

const Comment = ({ comment, allowDelete }) => {
  return (
    <ContentItem contentItem={comment} type='comment' allowDelete={allowDelete} />
  );
}

export default Comment;