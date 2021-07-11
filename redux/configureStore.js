import AsyncStorage from '@react-native-community/async-storage';
import { persistStore, persistReducer } from 'redux-persist';
import { createStore, combineReducers, applyMiddleware } from 'redux';

import thunk from 'redux-thunk';

// Reducers
import * as reducers from './reducers';

const config = {
  key: 'root',
  keyPrefix: '', // the redux-persist default is `persist:` which doesn't work with some file systems
  storage: AsyncStorage,
};

const persistedReducer = persistReducer(config, combineReducers(reducers));

// Create Store
export const configureStore = () => {
  const store = createStore(persistedReducer, applyMiddleware(thunk));
  const persistor = persistStore(store);
  return { store, persistor };
};
