//React
import React from 'react';
import {NavigationContainer} from '@react-navigation/native';

//Redux
import {Provider} from 'react-redux';
import {PersistGate} from 'redux-persist/es/integration/react';
import {configureStore} from './redux/configureStore';

//Navigation
import MainNavigator from './navigation/MainNavigator';
import ErrorBoundary from 'react-native-error-boundary';

const {store, persistor} = configureStore();

function App() {
  return (
    <Provider store={store}>
      <PersistGate persistor={persistor}>
        <ErrorBoundary>
          <NavigationContainer>
            <MainNavigator />
          </NavigationContainer>
        </ErrorBoundary>
      </PersistGate>
    </Provider>
  );
}

export default App;
