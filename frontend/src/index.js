// External Dependencies
import React from 'react';
import ReactDOM from 'react-dom';
import { createStore, applyMiddleware, compose } from 'redux';
import { Provider } from 'react-redux';
import thunk from "redux-thunk";
// Internal Dependencies
import rootReducer from './redux/rootReducer';
// Components
import App from './components/App';
// Styles
import './styles/index.css';

const store = createStore(
  rootReducer,
  compose(
    applyMiddleware(thunk)
  ));

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('root')
);
