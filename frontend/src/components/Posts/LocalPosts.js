// External Dependencies
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSlidersH } from '@fortawesome/free-solid-svg-icons'
// Internal Dependencies
import { getLocalPostsApi } from '../../redux/actionCreators';
// Components
import Posts from './Posts';
// Styles
import '../../styles/LocalPosts.css';

const LocalPosts = () => {
  const location = useSelector(state => state.locationReducer.location);
  const posts = useSelector(state => state.contentReducer.loadedPosts);
  const dispatch = useDispatch();

  useEffect(() => {
    const data = { ...location, distance: 5 }
    dispatch(getLocalPostsApi(data))
  }, [dispatch]);


  return (
    <>
      <FontAwesomeIcon
        icon={faSlidersH}
        className="LocalPosts-Settings"
      />
      <Posts posts={posts} />
    </>
  )
}

export default LocalPosts;