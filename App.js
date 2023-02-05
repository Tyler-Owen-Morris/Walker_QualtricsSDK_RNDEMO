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

//Analytics
import {createClient, AnalyticsProvider} from '@segment/analytics-react-native';

//Font Awesome setup
import {library} from '@fortawesome/fontawesome-svg-core';
//import {fab} from '@fortawesome/free-brands-svg-icons';
import {
  faIdCard,
  faCamera,
  faPrint,
  faThermometer,
  faPhone,
  faCross,
  faTimes,
  faPlus,
  faMinus,
  faCircle,
  faTimesCircle,
  faUndo,
  faMinusCircle,
  faPlay,
  faPlayCircle,
  faArrowRight,
  faQuestionCircle,
  faPlusCircle,
  faArrowCircleRight,
  faArrowCircleLeft,
  faSpinner,
} from '@fortawesome/free-solid-svg-icons';

library.add(
  faIdCard,
  faCamera,
  faPrint,
  faThermometer,
  faPhone,
  faCross,
  faTimes,
  faPlus,
  faMinus,
  faMinusCircle,
  faCircle,
  faTimesCircle,
  faUndo,
  faPlay,
  faPlayCircle,
  faArrowRight,
  faQuestionCircle,
  faPlusCircle,
  faArrowCircleRight,
  faArrowCircleLeft,
  faSpinner,
);
const {store, persistor} = configureStore();

const segmentClient = createClient({
  writeKey: 'cdnZuncPQB0GQ7BMgKzz7zErgcZsuw7l',
  trackAppLifecycleEvents: true,
  collectDeviceId: true,
});

function App() {
  return (
    <Provider store={store}>
      <AnalyticsProvider client={segmentClient}>
        <PersistGate persistor={persistor}>
          <ErrorBoundary>
            <NavigationContainer>
              <MainNavigator />
            </NavigationContainer>
          </ErrorBoundary>
        </PersistGate>
      </AnalyticsProvider>
    </Provider>
  );
}

export default App;
