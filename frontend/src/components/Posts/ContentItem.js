// External Dependencies
import React, { useCallback, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router';
// Internal Dependencies
import YetiApi from '../../api';
import { showErrors } from '../../redux/actionCreators';
// Components
import Options from './Options';
import Loading from '../Loading';
// Styles
import '../../styles/ContentItem.css';

/**
 * ContentItem Component
 * 
 * Most important, and biggest component of the app
 * 
 * Gets data about the content item (post/comment), and displays it, updating if any changes are made
 */

const ContentItem = ({ contentItem, type, showComment, allowDelete, isList }) => {
  const [ratingColor, setRatingColor] = useState('rgb(58,58,58)');
  const [content, setContent] = useState({});
  const [awaitingItem, setAwaitingItem] = useState(true);
  const [owner, setOwner] = useState(null);

  const user = useSelector(state => state.userReducer.user);
  const token = useSelector(state => state.userReducer.token);

  const dispatch = useDispatch();
  const history = useHistory();

  /**
   * Gets the owner of the content item given the content id
   */

  const getOwner = useCallback(
    async (id) => {
      try {
        const { user } = await YetiApi.getUserById(id);
        setOwner(user);
      }
      catch (errs) {
        dispatch(showErrors(errs));
      }
    }, [dispatch]);

  /**
   * Gets the full post information and sets content to the appropriate values
   */

  const getPost = useCallback(
    async () => {
      try {
        const { post } = await YetiApi.getPost(token, contentItem.id);
        setContent({
          id: post.id,
          body: post.body,
          userId: post.user_id,
          rating: post.rating,
          owner
        });
        getOwner(post.user_id);
        setAwaitingItem(false);
      }
      catch (errs) {
        dispatch(showErrors(errs));
      }
    }, [dispatch, contentItem.id, getOwner, owner, token]);

  /**
   * Gets the full comment information and sets content to the appropriate values
   */

  const getComment = useCallback(
    async () => {
      try {
        const { comment } = await YetiApi.getComment(token, contentItem.id);
        setContent({
          id: comment.id,
          body: comment.comment,
          userId: comment.user_id,
          postId: comment.post_id,
          rating: comment.rating,
          owner
        });
        getOwner(comment.user_id);
        setAwaitingItem(false);
      }
      catch (errs) {
        dispatch(showErrors(errs));
      }
    }, [dispatch, contentItem.id, getOwner, owner, token]);


  useEffect(() => {
    let isMounted = true;

    if (!isMounted) return;

    /**
     * sets the rating color to the appropriate color based on the content item's rating
     */

    const getRatingColor = () => {
      switch (content.rating) {
        case content.rating < 0:
          setRatingColor('red');
          break;
        case content.rating > 0:
          setRatingColor('green');
          break;
        default:
          setRatingColor('rgb(58,58,58)');
          break;
      }
    }

    if (content.body && isMounted) getRatingColor();
    if (!owner && isMounted) getOwner(contentItem.user_id);

    if (isMounted && !content.body) {
      switch (type) {
        case 'post':
          getPost();
          break;
        case 'comment':
          getComment();
          break;
        default:
          break;
      }
    }

    return () => {
      isMounted = false;
    }

  }, [
    contentItem.rating, contentItem.user_id,
    owner, dispatch,
    contentItem, content.body,
    content.rating,
    getComment, getPost,
    getOwner, type
  ]);

  let isUprated = false;
  let isDownrated = false;
  let isSaved = false;

  /**
   * Checks if the content item is a rated post in the user's rated items
   */

  const checkRatedPost = () => {
    const ratedPost = user.ratings.posts.find(post => post.post_id === content.id);
    if (ratedPost && ratedPost.myRating !== undefined) {
      if (ratedPost.myRating === 1) isUprated = true;
      if (ratedPost.myRating === -1) isDownrated = true;
    }
    else if (ratedPost && ratedPost.rating !== 0) {
      if (ratedPost.rating === 1) isUprated = true;
      if (ratedPost.rating === -1) isDownrated = true;
    }
  }

  /**
   * Checks if the content item is a rated comment in the user's rated items
   */

  const checkRatedComment = () => {
    const ratedComment = user.ratings.comments.find(comment => comment.comment_id === content.id);
    if (ratedComment && ratedComment.rating !== 0) {
      if (ratedComment.rating === 1) isUprated = true;
      if (ratedComment.rating === -1) isDownrated = true;
    }
  }

  /**
   * Checks if the content item is a saved post in the user's saved items
   */

  const checkSavedPost = () => {
    const savedPost = user.saved.posts.find(postSaved => postSaved.post_id === content.id);
    if (savedPost) isSaved = true;
  }

  /**
   * Checks if the content item is a saved comment in the user's saved items
   */

  const checkSavedComment = () => {
    const savedComment = user.saved.comments.find(commentSaved => commentSaved.comment_id === content.id);
    if (savedComment) isSaved = true;
  }

  /**
   * Called when the user clicks on the username of a content item, redirects to that content
   */

  const goToItem = () => {
    if (type === 'post') {
      history.push(`/posts/${content.id}`);
    }
    if (type === 'comment') {
      history.push(`/posts/${content.post_id}#comment-${content.id}`)
    }
  }

  if (user && user.ratings) {
    if (type === 'post') {
      checkRatedPost();
      if (user.saved.posts.length) checkSavedPost();
    }
    else if (type === 'comment') {
      checkRatedComment();
      if (user.saved.comments.length) checkSavedComment();
    }
  }

  if (awaitingItem) {
    return (
      <Loading />
    )
  }

  return (
    <div
      className={isList ? `ContentItem post` : `ContentItem ${type}`}
      id={`${type}-${content.id}`}>
      <div className="ContentItem-User">
        <span onClick={goToItem}>{owner ? owner.username : null}</span>
      </div>
      <div className="ContentItem-Content">
        <p>{content.body}</p>
      </div>
      <Options
        ratingColor={ratingColor}
        content={content}
        setContent={setContent}
        isUprated={isUprated}
        isDownrated={isDownrated}
        isSaved={isSaved}
        showComment={showComment}
        allowDelete={allowDelete}
        type={type}
        token={token}
        user={user}
      />
    </div>
  )
}

export default ContentItem;