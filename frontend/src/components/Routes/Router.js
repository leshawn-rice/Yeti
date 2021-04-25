import { Switch, Route } from 'react-router-dom';
import Home from './Home';
import Login from './Auth/Login';
import Signup from './Auth/Signup';

const Router = () => {
  return (
    <Switch>
      <Route exact path="/">
        <Home />
      </Route>
      <Route exact path="/login">
        <Login />
      </Route>
      <Route exact path="/sign-up">
        <Signup />
      </Route>
    </Switch>
  );
}

export default Router;