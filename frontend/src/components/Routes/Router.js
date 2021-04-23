import { Switch, Route } from 'react-router-dom';
import Home from './Home';
import Login from './Login';
import Register from './Register';
// import NewPostForm from './components/Forms/NewPostForm';
// import EditPostForm from './components/Forms/EditPostForm';
// import Post from './components/Post/Post';

const Router = () => {
  return (
    <Switch>
      <Route exact path="/">
        <Home />
      </Route>
      <Route exact path="/login">
        <Login />
      </Route>
      <Route exact path="/register">
        <Register />
      </Route>
      {/* <Route exact path="/new">
        <NewPostForm />
      </Route>
      <Route exact path="/posts/:id/edit">
        <EditPostForm />
      </Route>
      <Route exact path="/posts/:id">
        <Post />
      </Route> */}
    </Switch>
  );
}

export default Router;