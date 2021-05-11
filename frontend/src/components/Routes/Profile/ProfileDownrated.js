// External Dependencies
import React from 'react';
import { useSelector } from 'react-redux';
// Components
import ContentItem from '../../Posts/ContentItem';

const ProfileDownrated = () => {
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
  const downrated = allItems.sort((a, b) => a.rating - b.rating).filter((item) => item.rating < 0);

  return (
    <>
      {downrated.map(item => (
        <ContentItem
          key={`${item.type}-${item.id}`}
          contentItem={item}
          type={item.type}
          showComment={item.type === 'post' ? true : false}
          isRating={true} />
      ))}
    </>
  )
}

export default ProfileDownrated;