// External Dependencies
import React, { useEffect, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSortUp, faSortDown, faBookmark } from '@fortawesome/free-solid-svg-icons'
import { useDispatch } from 'react-redux';
// Internal Dependencies
import { showErrors } from '../../redux/actionCreators';
import YetiApi from '../../api';
// Styles
import '../../styles/Comment.css';

const Comment = ({ comment }) => {
  const [ratingColor, setRatingColor] = useState('rgb(58,58,58)');
  const [user, setUser] = useState(null);
  const dispatch = useDispatch();

  useEffect(() => {
    if (comment.rating < 0) setRatingColor('red');
    if (comment.rating > 0) setRatingColor('green');
    if (comment.rating === 0) setRatingColor('rgb(58,58,58)');

    let isMounted = true;

    const getUser = async () => {
      try {
        const { user } = await YetiApi.getUserById(comment.user_id);
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

  }, [comment.rating, comment.user_id, user, dispatch])

  const uprate = () => {
    // uprate
  }

  const downrate = () => {
    // downrate
  }

  const save = () => {
    // save
  }

  return (
    <div className="Comment">
      <div className="Comment-User">
        <span>{user ? user.username : null}</span>
      </div>
      <div className="Comment-Content">
        <p>{comment.comment}</p>
      </div>
      <div className="Comment-Options">
        <FontAwesomeIcon
          icon={faSortUp}
          className="Comment-Item rate"
          onClick={uprate}
        />
        <span className="Comment-Item text" style={{ color: ratingColor }}>{comment.rating}</span>
        <FontAwesomeIcon
          icon={faSortDown}
          className="Comment-Item rate"
          onClick={downrate}
        />
        <FontAwesomeIcon
          icon={faBookmark}
          className="Comment-Item"
          onClick={save}
        />
      </div>
    </div>
  )
}

export default Comment;