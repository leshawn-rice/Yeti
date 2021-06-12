// External Dependencies
import React from 'react';
import { useSelector } from 'react-redux';
// Components
import ContentItem from '../../Posts/ContentItem';

/**
 * ProfileSaved Component
 * 
 * Displays posts/comments that the user has saved
 */


const ProfileSaved = () => {
  const user = useSelector(state => state.userReducer.user);

  const posts = user.saved.posts;
  posts.forEach(post => {
    post.type = 'post';
    post.id = post.post_id;
  });
  const comments = user.saved.comments;
  comments.forEach(comment => {
    comment.type = 'comment';
    comment.id = comment.comment_id;
  });
  const saved = [...posts, ...comments];

  return (
    <>
      {saved.map(item => (
        <ContentItem
          key={`${item.type}-${item.id}`}
          contentItem={item}
          type={item.type}
          showComment={item.type === 'post' ? true : false}
          isList={true}
          isSavedItem={true} />
      ))}
    </>
  )
}

export default ProfileSaved;