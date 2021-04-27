import { Switch, Route } from 'react-router-dom';
import Home from './Home';
import Login from './Auth/Login';
import Signup from './Auth/Signup';
import Logout from './Auth/Logout';
import Settings from './Settings';
import ConfirmEmail from './ConfirmEmail';

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
      <Route exact path="/log-out">
        <Logout />
      </Route>
      <Route exact path="/settings">
        <Settings />
      </Route>
      <Route exact path="/confirm/:token">
        <ConfirmEmail />
      </Route>
    </Switch>
  );
}

export default Router;