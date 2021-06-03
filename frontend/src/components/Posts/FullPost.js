// External Dependencies
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router';
// Internal Dependencies
import { getFullPostApi } from '../../redux/actionCreators';
// Components
import Loading from '../Loading';
import NotFound from '../NotFound';
import ContentItem from './ContentItem';
import CreateComment from './CreateComment';
import Comments from './Comments';
// Styles
import '../../styles/FullPost.css';

const FullPost = () => {
  const { id } = useParams();
  const token = useSelector(state => state.userReducer.token);
  const isLoading = useSelector(state => state.loadingReducer.isLoading);
  const dispatch = useDispatch();
  const post = useSelector(state => state.contentReducer.currentPost);

  useEffect(() => {
    dispatch(getFullPostApi(token, id));
  }, [dispatch, id, token]);

  const addComment = (comment) => {
    post.comments.push(comment)
  }

  if (isLoading) {
    return (
      <Loading />
    )
  }

  if (!post) {
    return (
      <NotFound />
    )
  }

  return (
    <div className="FullPost">
      <div className="FullPost-Post">
        <ContentItem type='post' contentItem={post} />
      </div>
      <div className="FullPost-Comments">
        <CreateComment postId={post.id} addToPost={addComment} />
        <Comments comments={post.comments} />
      </div>
    </div>
  )
}

export default FullPost;