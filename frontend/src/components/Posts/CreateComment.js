// External Dependencies
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
// Internal Dependencies
import { createCommentApi } from '../../redux/actionCreators';
// Components
import Form from '../Forms/Form';
// Styles
import '../../styles/CreateComment.css';


const CreateComment = ({ postId }) => {
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
    dispatch(createCommentApi(token, user.username, formData));
    // kind of a hack to get the comment on the page, just refresh
    setTimeout(() => {
      window.location.reload();
    }, 10);
    if (!formData.comment) return;
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