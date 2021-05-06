// External Dependencies
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSortUp, faSortDown, faComment, faBookmark } from '@fortawesome/free-solid-svg-icons'
import { useDispatch, useSelector } from 'react-redux';
// Internal Dependencies
import { showErrors, upratePostApi, downratePostApi } from '../../redux/actionCreators';
import YetiApi from '../../api';
// Styles
import '../../styles/Post.css';

const Post = ({ post, showComment }) => {
  const [ratingColor, setRatingColor] = useState('rgb(58,58,58)');
  const [owner, setOwner] = useState(null);
  const user = useSelector(state => state.userReducer.user);
  const token = useSelector(state => state.userReducer.token);
  const dispatch = useDispatch();

  useEffect(() => {
    if (post.rating < 0) setRatingColor('red');
    if (post.rating > 0) setRatingColor('green');
    if (post.rating === 0) setRatingColor('rgb(58,58,58)');

    let isMounted = true;

    const getOwner = async () => {
      try {
        const { user } = await YetiApi.getUserById(post.user_id);
        if (isMounted) {
          setOwner(user);
        }
      }
      catch (errs) {
        dispatch(showErrors(errs));
      }
    }

    if (!owner) {
      getOwner();
    }

    return () => {
      isMounted = false;
    }
  }, [dispatch, post.rating, post.user_id, user]);

  let isUpvoted = false;
  let isDownvoted = false;

  console.log(user.ratings);

  if (user && user.ratings) {
    const userVotedPost = user.ratings.posts.find(p => p.id === post.id);
    if (userVotedPost) {
      if (userVotedPost.rating === 1) {
        isUpvoted = true;
      }
      if (userVotedPost.rating === -1) {
        isDownvoted = true;
      }
    }
  }

  const upvoteColor = isUpvoted ? 'green' : 'black';
  const downvoteColor = isDownvoted ? 'red' : 'black';

  const upratePost = () => {
    dispatch(upratePostApi(token, user.id, post.id));
  }

  const downratePost = () => {
    dispatch(downratePostApi(token, user.id, post.id));
  }

  const savePost = () => {
    // save
  }

  return (
    <div className="Post">
      <div className="Post-User">
        <span>{owner ? owner.username : null}</span>
      </div>
      <div className="Post-Content">
        <p>{post.body}</p>
      </div>
      <div className="Post-Options">
        <FontAwesomeIcon
          icon={faSortUp}
          className="Post-Item rate"
          onClick={upratePost}
          style={{ color: upvoteColor }}
        />
        <span className="Post-Item text" style={{ color: ratingColor }}>{post.rating}</span>
        <FontAwesomeIcon
          icon={faSortDown}
          className="Post-Item rate"
          onClick={downratePost}
          style={{ color: downvoteColor }}
        />
        <FontAwesomeIcon
          icon={faBookmark}
          className="Post-Item"
          onClick={savePost}
        />
        {showComment ? (
          <Link to={`/posts/${post.id}`}> <FontAwesomeIcon
            icon={faComment}
            className="Post-Item"
          /></Link>
        ) : null}
      </div>
    </div>
  )
}

export default Post;