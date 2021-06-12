import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSpinner } from '@fortawesome/free-solid-svg-icons'

/**
 * Loading component
 * 
 * Diplays an animated loading icon on the screen
 */

const Loading = () => {
  return (
    <FontAwesomeIcon className="Loading-Icon" icon={faSpinner} spin />
  )
}

export default Loading;