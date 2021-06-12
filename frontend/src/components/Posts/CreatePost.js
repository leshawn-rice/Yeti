// External Dependencies
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
// Internal Dependencies
import { createPostApi } from '../../redux/actionCreators';
// Components
import Form from '../Forms/Form';
// Styles
import '../../styles/CreatePost.css';

/**
 * CreatePost Component
 * 
 * Displays a Form component with a single messageArea field to create a new post
 */

const CreatePost = () => {
  const dispatch = useDispatch();
  const user = useSelector(state => state.userReducer.user);
  const token = useSelector(state => state.userReducer.token);
  const location = useSelector(state => state.locationReducer.location);
  const INITIAL_DATA = {
    body: ''
  }

  const messageAreas = [
    {
      name: 'body',
      id: 'body',
      placeholder: 'It\'s really sunny out and I love it',
      label: '',
    }
  ];

  if (!user.username) {
    messageAreas[0].disabled = true;
    messageAreas[0].placeholder = 'You need to be logged in to post';
  }

  const handleSubmit = (formData) => {
    formData.location = location;
    if (!user.username) return;
    dispatch(createPostApi(token, user.username, formData));
  }

  return (
    <div className="CreatePost">
      <Form
        messageAreas={messageAreas}
        INITIAL_DATA={INITIAL_DATA}
        buttonLabel="Post"
        submit={handleSubmit} />
    </div>
  )
}

export default CreatePost;