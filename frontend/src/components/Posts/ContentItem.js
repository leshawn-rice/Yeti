// External Dependencies
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSortUp, faSortDown, faBookmark, faComment, faTrash } from '@fortawesome/free-solid-svg-icons'
// Internal Dependencies
import {
  showErrors,
  upratePostApi,
  downratePostApi,
  uprateCommentApi,
  downrateCommentApi,
  deletePostApi,
  deleteCommentApi,
  savePostApi,
  saveCommentApi,
  unsavePostApi,
  unsaveCommentApi
} from '../../redux/actionCreators';
import YetiApi from '../../api';
// Components
import Loading from '../Loading';
// Styles
import '../../styles/ContentItem.css';

const ContentItem = ({ contentItem, type, showComment, allowDelete, isList, isSavedItem }) => {
  const [ratingColor, setRatingColor] = useState('rgb(58,58,58)');
  const [awaitingItem, setAwaitingItem] = useState(true);
  const user = useSelector(state => state.userReducer.user);
  const token = useSelector(state => state.userReducer.token);
  const [owner, setOwner] = useState(null);
  const dispatch = useDispatch();
  const history = useHistory();

  useEffect(() => {
    if (contentItem.rating < 0) setRatingColor('red');
    if (contentItem.rating > 0) setRatingColor('green');
    if (contentItem.rating === 0) setRatingColor('rgb(58,58,58)');

    let isMounted = true;

    const getOwner = async () => {
      try {
        const { user } = await YetiApi.getUserById(contentItem.user_id);
        if (isMounted) {
          setOwner(user);
        }
      }
      catch (errs) {
        dispatch(showErrors(errs));
      }
    }

    // Get item is where the issue for upvoting is happening

    const getItem = async () => {
      if (type === 'post') {
        try {
          const { post } = await YetiApi.getPost(token, contentItem.id);
          if (isMounted) {
            contentItem.user_id = post.user_id
            contentItem.body = post.body;
            if (isSavedItem) contentItem.rating = post.rating;
            setOwner(null);
            setAwaitingItem(false);
          }
        }
        catch (errs) {
          dispatch(showErrors(errs));
        }
      }
      else if (type === 'comment') {
        try {
          const { comment } = await YetiApi.getComment(token, contentItem.id);
          if (isMounted) {
            contentItem.user_id = comment.user_id
            contentItem.post_id = comment.post_id;
            contentItem.comment = comment.comment;
            if (isSavedItem) contentItem.rating = comment.rating;
            setOwner(null);
            setAwaitingItem(false)
          }
        }
        catch (errs) {
          dispatch(showErrors(errs));
        }
      }
    }

    if (!owner) {
      getOwner();
    }

    if (isList && !contentItem.body && !contentItem.comment) {
      getItem();
    }
    else {
      setAwaitingItem(false);
    }

    return () => {
      isMounted = false;
    }

  }, [contentItem.rating, contentItem.user_id, owner, dispatch, contentItem, token, isList, type, isSavedItem])

  const uprate = () => {
    if (type === 'post') {
      dispatch(upratePostApi(token, user.id, contentItem.id));
    }
    else if (type === 'comment') {
      dispatch(uprateCommentApi(token, user.id, contentItem.id));
    }
  }

  const downrate = () => {
    if (type === 'post') {
      dispatch(downratePostApi(token, user.id, contentItem.id));
    }
    else if (type === 'comment') {
      dispatch(downrateCommentApi(token, user.id, contentItem.id));
    }
  }

  const save = () => {
    if (type === 'post') {
      const savedPost = user.saved.posts.length ? user.saved.posts.find(postSaved => postSaved.post_id === contentItem.id) : null;
      if (savedPost) {
        dispatch(unsavePostApi(token, user.username, contentItem.id, user.id));
      }
      else {
        dispatch(savePostApi(token, user.username, contentItem.id, user.id));
      }
    }
    if (type === 'comment') {
      const savedComment = user.saved.comments.length ? user.saved.comments.find(commentSaved => commentSaved.comment_id === contentItem.id) : null;
      if (savedComment) {
        dispatch(unsaveCommentApi(token, user.username, contentItem.id, user.id));
      }
      else {
        dispatch(saveCommentApi(token, user.username, contentItem.id, user.id));
      }
    }
  }

  const deleteItem = () => {
    if (type === 'post') {
      dispatch(deletePostApi(token, user.username, contentItem.id));
    }
    if (type === 'comment') {
      dispatch(deleteCommentApi(token, user.username, contentItem.id));
    }
  }

  let isUprated = false;
  let isDownrated = false;
  let isSaved = false;

  const checkRatedPost = () => {
    const ratedPost = user.ratings.posts.find(postRating => postRating.post_id === contentItem.id);
    if (ratedPost && ratedPost.myRating !== undefined) {
      if (ratedPost.myRating === 1) isUprated = true;
      if (ratedPost.myRating === -1) isDownrated = true;
    }
    else if (ratedPost && ratedPost.rating !== 0) {
      if (ratedPost.rating === 1) isUprated = true;
      if (ratedPost.rating === -1) isDownrated = true;
    }
  }

  const checkRatedComment = () => {
    const ratedComment = user.ratings.comments.find(commentRating => commentRating.comment_id === contentItem.id);
    if (ratedComment && ratedComment.rating !== 0) {
      if (ratedComment.rating === 1) isUprated = true;
      if (ratedComment.rating === -1) isDownrated = true;
    }
  }

  const checkSavedPost = () => {
    const savedPost = user.saved.posts.find(postSaved => postSaved.post_id === contentItem.id);
    if (savedPost) isSaved = true;
  }

  const checkSavedComment = () => {
    const savedComment = user.saved.comments.find(commentSaved => commentSaved.comment_id === contentItem.id);
    if (savedComment) isSaved = true;
  }

  const goToItem = () => {
    if (type === 'post') {
      history.push(`/posts/${contentItem.id}`);
    }
    if (type === 'comment') {
      history.push(`/posts/${contentItem.post_id}#comment-${contentItem.id}`)
    }
  }

  if (user && user.ratings) {
    if (type === 'post') {
      checkRatedPost();
      if (user.saved.posts.length) checkSavedPost();
    }
    else if (type === 'comment') {
      checkRatedComment();
      if (user.saved.comments.length) checkSavedComment();
    }
  }

  const upvoteColor = isUprated ? 'green' : 'rgb(58,58,58)';
  const downvoteColor = isDownrated ? 'red' : 'rgb(58,58,58)';
  const savedColor = isSaved ? 'rgb(90, 90, 230)' : 'rgb(58,58,58)';

  if (awaitingItem) {
    return (
      <Loading />
    )
  }

  return (
    <div
      className={isList ? `ContentItem post` : `ContentItem ${type}`}
      id={`${type}-${contentItem.id}`}>
      <div className="ContentItem-User">
        <span onClick={goToItem}>{owner ? owner.username : null}</span>
      </div>
      <div className="ContentItem-Content">
        <p>{type === 'post' ? contentItem.body : contentItem.comment}</p>
      </div>
      <div className="ContentItem-Options">
        <FontAwesomeIcon
          icon={faSortUp}
          className="ContentItem-Option rate"
          onClick={uprate}
          style={{ color: upvoteColor }}
        />
        <span className="ContentItem-Option text" style={{ color: ratingColor }}>{contentItem.rating}</span>
        <FontAwesomeIcon
          icon={faSortDown}
          className="ContentItem-Option rate"
          onClick={downrate}
          style={{ color: downvoteColor }}
        />
        <FontAwesomeIcon
          icon={faBookmark}
          className="ContentItem-Option"
          onClick={save}
          style={{ color: savedColor }}
        />
        {showComment ? (
          <Link to={`/posts/${contentItem.id}`}><FontAwesomeIcon
            icon={faComment}
            className="ContentItem-Option"
          /></Link>
        ) : null}
        {allowDelete ? (
          <FontAwesomeIcon
            icon={faTrash}
            className="ContentItem-Option"
            onClick={deleteItem}
            style={{ color: 'rgb(255, 82, 82)' }}
          />
        ) : null}
      </div>
    </div>
  )
}

export default ContentItem;