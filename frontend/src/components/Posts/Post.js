// External Dependencies
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSortUp, faSortDown, faComment, faBookmark } from '@fortawesome/free-solid-svg-icons'
import { useDispatch } from 'react-redux';
// Internal Dependencies
import { showErrors } from '../../redux/actionCreators';
import YetiApi from '../../api';
// Styles
import '../../styles/Post.css';

const Post = ({ post }) => {
  const [ratingColor, setRatingColor] = useState('rgb(58,58,58)');
  const [user, setUser] = useState(null);
  const dispatch = useDispatch();

  useEffect(() => {
    if (post.rating < 0) setRatingColor('red');
    if (post.rating > 0) setRatingColor('green');
    if (post.rating === 0) setRatingColor('rgb(58,58,58)');

    let isMounted = true;

    const getUser = async () => {
      try {
        const { user } = await YetiApi.getUserById(post.user_id);
        if (isMounted) {
          setUser(user);
        }
      }
      catch (errs) {
        dispatch(showErrors(errs));
      }
    }

    if (!user) {
      getUser();
    }

    return () => {
      isMounted = false;
    }
  }, [dispatch, post.rating, post.user_id, user])

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
      <div className="Post-User">
        <span>{user ? user.username : null}</span>
      </div>
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