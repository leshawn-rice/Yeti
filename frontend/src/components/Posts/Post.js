// External Dependencies
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSortUp, faSortDown, faComment, faBookmark } from '@fortawesome/free-solid-svg-icons'
// Styles
import '../../styles/Post.css';

const Post = ({ post }) => {
  const [ratingColor, setRatingColor] = useState('rgb(58,58,58)');


  useEffect(() => {
    if (post.rating < 0) setRatingColor('red');
    if (post.rating > 0) setRatingColor('green');
    if (post.rating === 0) setRatingColor('rgb(58,58,58)');

  }, [post.rating])

  const upratePost = () => {
    // uprate
  }

  const downratePost = () => {
    // downrate
  }

  const savePost = () => {
    // save
  }

  return (
    <div className="Post">
      <div className="Post-Content">
        <p>{post.body}</p>
      </div>
      <div className="Post-Options">
        <FontAwesomeIcon
          icon={faSortUp}
          className="Post-Item rate"
          onClick={upratePost}
        />
        <span className="Post-Item text" style={{ color: ratingColor }}>{post.rating}</span>
        <FontAwesomeIcon
          icon={faSortDown}
          className="Post-Item rate"
          onClick={downratePost}
        />
        <FontAwesomeIcon
          icon={faBookmark}
          className="Post-Item"
          onClick={savePost}
        />
        <Link to={`/posts/${post.id}`}> <FontAwesomeIcon
          icon={faComment}
          className="Post-Item"
        /> </Link>
      </div>
    </div>
  )
}

export default Post;