// External Dependencies
import React from 'react';
// Components
import ContentItem from './ContentItem';

const Post = ({ post, showComment, allowDelete }) => {
  return (
    <ContentItem contentItem={post} type='post' showComment={showComment} allowDelete={allowDelete} />
  );
}

export default Post;