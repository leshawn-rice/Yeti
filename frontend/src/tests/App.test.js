// External Dependencies
import { render, screen } from '@testing-library/react';
import { Provider } from 'react-redux';
import { PersistGate } from "redux-persist/integration/react";
// Internal Dependencies
import { store, persistedStore } from '../redux/store';
// Component
import App from '../components/App';

test('renders learn react link', () => {
  render(
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistedStore}>
        <App />
      </PersistGate>
    </Provider>);
  const linkElement = screen.getByText(/Yeti/i);
  expect(linkElement).toBeInTheDocument();
});
