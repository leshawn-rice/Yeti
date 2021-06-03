// External Dependencies
import React from 'react';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSortUp, faSortDown, faBookmark, faComment, faTrash } from '@fortawesome/free-solid-svg-icons'
// Styles
import '../../styles/ContentItem.css';

const Options = ({ ratingColor, content, isUprated, isDownrated, isSaved, uprate, downrate, save, deleteItem, showComment, allowDelete }) => {

  const uprateColor = isUprated ? 'green' : 'rgb(58,58,58)';
  const downrateColor = isDownrated ? 'red' : 'rgb(58,58,58)';
  const savedColor = isSaved ? 'rgb(90, 90, 230)' : 'rgb(58,58,58)';

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