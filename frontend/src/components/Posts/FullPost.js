// External Dependencies
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router';
// Internal Dependencies
import { getPostApi } from '../../redux/actionCreators';
// Components
import Loading from '../Loading';
import NotFound from '../NotFound';
import Post from './Post';
import Comment from './Comment';
import CreateComment from './CreateComment';
// Styles
import '../../styles/FullPost.css';
import Comments from './Comments';

const FullPost = () => {
  const { id } = useParams();
  const token = useSelector(state => state.userReducer.token);
  const isLoading = useSelector(state => state.loadingReducer.isLoading);
  const dispatch = useDispatch();
  const [post, setPost] = useState(null);

  useEffect(() => {
    dispatch(getPostApi(token, id))
      .then((post) => {
        setPost(post);
      });
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
      <Post post={post} />
      <div className="FullPost-Comments">
        <CreateComment postId={post.id} addToPost={addComment} />
        <Comments comments={post.comments} />
      </div>
    </div>
  )
}

export default FullPost;