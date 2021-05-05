// External Dependencies
import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Redirect } from 'react-router';
// Internal Dependencies
import { stopLoading } from '../../../redux/actionCreators';
// Components
import Form from '../../Forms/Form';
import Loading from '../../Loading';
// Styles
import '../../../styles/Auth.css';

const Auth = ({ inputs = [], INITIAL_DATA = {}, buttonLabel = '', extraButton = {}, handleSubmit }) => {
  const dispatch = useDispatch();
  const user = useSelector(state => state.userReducer.user);
  const loading = useSelector(state => state.loadingReducer.isLoading);

  useEffect(() => {
    dispatch(stopLoading());
  }, [dispatch])

  if (user.username !== undefined) {
    return <Redirect to="/" />
  }

  if (loading) {
    return <Loading />
  }

  return (
    <div className="Auth-Form">
      <Form
        inputs={inputs}
        INITIAL_DATA={INITIAL_DATA}
        buttonLabel={buttonLabel}
        extraButton={extraButton}
        submit={handleSubmit}
      />
    </div>
  )
}

export default Auth;