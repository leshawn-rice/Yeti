// External Dependencies
import React from 'react';
import { useSelector } from 'react-redux';
// Components
import ContentItem from '../../Posts/ContentItem';

/**
 * ProfileUprated Component
 * 
 * Displays posts/comments that the user has uprated
 */


const ProfileUprated = () => {
  const user = useSelector(state => state.userReducer.user);

  const posts = user.ratings.posts;
  posts.forEach(post => {
    post.type = 'post';
    post.id = post.post_id;
  });
  const comments = user.ratings.comments;
  comments.forEach(comment => {
    comment.type = 'comment';
    comment.id = comment.comment_id;
  });
  const allItems = [...posts, ...comments];
  const uprated = allItems.sort((a, b) => a.rating - b.rating).filter((item) => item.rating > 0);

  return (
    <>
      {uprated.map(item => (
        <ContentItem
          key={`${item.type}-${item.id}`}
          contentItem={item}
          type={item.type}
          showComment={item.type === 'post' ? true : false}
          isList={true} />
      ))}
    </>
  )
}

export default ProfileUprated;