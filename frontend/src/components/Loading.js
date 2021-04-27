import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSpinner } from '@fortawesome/free-solid-svg-icons'

const Loading = () => {
  return (
    <FontAwesomeIcon className="Loading-Icon" icon={faSpinner} spin />
  )
}

export default Loading;