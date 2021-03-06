// External Dependencies
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSlidersH } from '@fortawesome/free-solid-svg-icons'
// Internal Dependencies
import { getLocalPostsApi, loadPosts } from '../../redux/actionCreators';
import { checkBottom } from '../../helpers';
// Components
import Posts from './Posts';
import Loading from '../Loading';
import Modal from '../Modal';
import NotFound from '../NotFound';
// Styles
import '../../styles/LocalPosts.css';

/**
 * LocalPosts Component
 * 
 * Finds, and displays all posts within the radius set by the user
 */

const LocalPosts = () => {
  const location = useSelector(state => state.locationReducer.location);
  const isLoading = useSelector(state => state.loadingReducer.isLoading);
  const posts = useSelector(state => state.contentReducer.loadedPosts);
  const [distance, setDistance] = useState(5);
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);
  const dispatch = useDispatch();

  useEffect(() => {
    const data = { ...location, distance };
    dispatch(getLocalPostsApi(data));

    const infiniteScroll = () => {
      if (checkBottom()) {
        dispatch(loadPosts());
      }
    }

    window.addEventListener('scroll', infiniteScroll);
    return () => {
      window.removeEventListener('scroll', infiniteScroll);
    };

  }, [dispatch, distance, location]);

  // Sets isSettingsOpen to true when calles

  const openSettings = () => {
    setIsSettingsOpen(true);
  }

  // Handles the submission of post filter form

  const handleSubmit = (evt) => {
    evt.preventDefault();
    const value = document.querySelector('#post-range').value;
    setDistance(value);
    setIsSettingsOpen(false);
  }

  // Updates the text next to the range for the post range filter to the appropriate value

  const updateRangeValue = (evt) => {
    const { value } = evt.target;
    document.getElementById('post-range-value').value = `${value} miles`;
  }

  const content = {
    title: 'Filter',
    body:
      <form className="LocalPosts-Settings" onSubmit={handleSubmit}>
        <div className="PostRange">
          <label className="PostRange-Label" htmlFor="range">Post Range</label>
          <input
            onChange={updateRangeValue}
            className="PostRange-Slider"
            type="range"
            name="post-range"
            id="post-range"
            placeholder={5}
            min={1} max={100} />
          <input className="PostRange-Value" id="post-range-value" type="text" placeholder="50 miles" readOnly />
        </div>
        <button className="LocalPosts-Settings-Submit">Change</button>
      </form>
  }

  if (isLoading) {
    return (
      <Loading />
    )
  }

  if (!posts.length) {
    return (
      <>
        <Modal toggled={isSettingsOpen} toggleModal={setIsSettingsOpen} content={content} />
        <FontAwesomeIcon
          icon={faSlidersH}
          className="LocalPosts-Settings-Button"
          onClick={openSettings}
        />
        <NotFound />
      </>
    )
  }

  return (
    <>
      <Modal toggled={isSettingsOpen} toggleModal={setIsSettingsOpen} content={content} />
      <FontAwesomeIcon
        icon={faSlidersH}
        className="LocalPosts-Settings-Button"
        onClick={openSettings}
      />
      <Posts posts={posts} />
    </>
  )
}

export default LocalPosts;