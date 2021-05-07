// External Dependencies
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { v4 as uuid } from 'uuid';
// Internal Dependencies
import { createCommentApi } from '../../redux/actionCreators';
// Components
import Form from '../Forms/Form';
// Styles
import '../../styles/CreateComment.css';


const CreateComment = ({ postId, addToPost }) => {
  const dispatch = useDispatch();
  const user = useSelector(state => state.userReducer.user);
  const token = useSelector(state => state.userReducer.token);
  const INITIAL_DATA = {
    comment: ''
  }

  const messageAreas = [
    {
      name: 'comment',
      id: 'comment',
      placeholder: 'What a wonderful post!',
      label: '',
    }
  ];

  if (!user.username) {
    messageAreas[0].disabled = true;
    messageAreas[0].placeholder = 'You need to be logged in to comment';
  }

  const handleSubmit = (formData) => {
    formData.postId = postId;
    // if (!user.username) return;
    dispatch(createCommentApi(token, user.username, formData));
    const id = uuid();
    const data = { id, user_id: user.id, post_id: postId, comment: formData.comment, rating: 0 };
    addToPost(data);
  }

  return (
    <div className="CreateComment">
      <Form
        messageAreas={messageAreas}
        INITIAL_DATA={INITIAL_DATA}
        buttonLabel="Comment"
        submit={handleSubmit} />
    </div>
  )
}

export default CreateComment;