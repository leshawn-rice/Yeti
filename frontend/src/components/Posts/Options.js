// External Dependencies
import React from 'react';
import { Link } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSortUp, faSortDown, faBookmark, faComment, faTrash } from '@fortawesome/free-solid-svg-icons'
// Internal Dependencies
import {
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
// Styles
import '../../styles/ContentItem.css';

const Options = ({ ratingColor, content, setContent, isUprated, isDownrated, isSaved, showComment, allowDelete, type, token, user }) => {

  const dispatch = useDispatch();

  const uprateColor = isUprated ? 'green' : 'rgb(58,58,58)';
  const downrateColor = isDownrated ? 'red' : 'rgb(58,58,58)';
  const savedColor = isSaved ? 'rgb(90, 90, 230)' : 'rgb(58,58,58)';

  const uprate = () => {
    if (type === 'post') {
      dispatch(upratePostApi(token, user.id, content.id));
    }
    else if (type === 'comment') {
      dispatch(uprateCommentApi(token, user.id, content.id));
    }

    let diff;
    if (isUprated) diff = -1;
    if (isDownrated) diff = 2;
    if (!isUprated && !isDownrated) diff = 1;
    const newContent = { ...content, rating: content.rating + diff };
    setContent(content => newContent);
  }

  const downrate = () => {
    if (type === 'post') {
      dispatch(downratePostApi(token, user.id, content.id));
    }
    else if (type === 'comment') {
      dispatch(downrateCommentApi(token, user.id, content.id));
    }

    let diff;
    if (isUprated) diff = -2;
    if (isDownrated) diff = 1;
    if (!isUprated && !isDownrated) diff = -1;
    const newContent = { ...content, rating: content.rating + diff };
    setContent(content => newContent);
  }

  const save = () => {
    if (type === 'post') {
      if (user.saved.posts.find(post => post.post_id === content.id) !== undefined) {
        dispatch(unsavePostApi(token, user.username, content.id, user.id));
      }
      else {
        dispatch(savePostApi(token, user.username, content.id, user.id));
      }
    }
    if (type === 'comment') {
      if (user.saved.comments.find(comment => comment.comment_id === content.id) !== undefined) {
        dispatch(unsaveCommentApi(token, user.username, content.id, user.id));
      }
      else {
        dispatch(saveCommentApi(token, user.username, content.id, user.id));
      }
    }
  }

  const deleteItem = () => {
    if (type === 'post') {
      dispatch(deletePostApi(token, user.username, content.id));
    }
    if (type === 'comment') {
      dispatch(deleteCommentApi(token, user.username, content.id));
    }
  }

  return (
    <div className="ContentItem-Options">
      <FontAwesomeIcon
        icon={faSortUp}
        className="ContentItem-Option rate"
        onClick={uprate}
        style={{ color: uprateColor }}
      />
      <span className="ContentItem-Option text" style={{ color: ratingColor }}>{content.rating}</span>
      <FontAwesomeIcon
        icon={faSortDown}
        className="ContentItem-Option rate"
        onClick={downrate}
        style={{ color: downrateColor }}
      />
      <FontAwesomeIcon
        icon={faBookmark}
        className="ContentItem-Option"
        onClick={save}
        style={{ color: savedColor }}
      />
      {showComment ? (
        <Link to={`/posts/${content.id}`}><FontAwesomeIcon
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
  )
}

export default Options;