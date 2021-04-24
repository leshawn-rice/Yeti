// External Dependencies
import { render, screen } from '@testing-library/react';
import { createStore, applyMiddleware, compose } from 'redux';
import { Provider } from 'react-redux';
import thunk from "redux-thunk";
// Internal Dependencies
import rootReducer from '../redux/rootReducer';
// Component
import App from '../components/App';

test('renders learn react link', () => {
  const store = createStore(
    rootReducer,
    compose(
      applyMiddleware(thunk)
    ));
  render(<Provider store={store}><App /></Provider>);
  const linkElement = screen.getByText(/Yeti/i);
  expect(linkElement).toBeInTheDocument();
});
