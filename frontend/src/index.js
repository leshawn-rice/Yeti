import React from 'react';
import ReactDOM from 'react-dom';
import { createStore, applyMiddleware, compose } from 'redux';
import { Provider } from 'react-redux';
import thunk from "redux-thunk";
import rootReducer from './redux/rootReducer';
import App from './components/App';
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
