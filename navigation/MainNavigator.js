import React, { useEffect, useState, useRef } from 'react';
import { connect } from 'react-redux';
import { AppState, LogBox, StatusBar } from 'react-native';
import { createStackNavigator } from '@react-navigation/stack';
import WelcomeScreen from '../screens/WelcomeScreen';
import FirstIntercept from '../screens/FirstIntercept';
import BackgroundService from 'react-native-background-actions';

LogBox.ignoreAllLogs();

const Stack = createStackNavigator();

const sleep = (time) => new Promise((resolve) => setTimeout(() => resolve(), time));
const backgroundTask = async (taskArguments) => {
  const { delay } = taskArguments;
  await new Promise(async (resolve) => {
    for (let i = 0; BackgroundService.isRunning(); i++) {
      console.log("bg:", i);
      await sleep(delay);
    }
  })
}
const options = {
  taskName: 'BG Checker',
  taskTitle: 'BG Checker',
  taskDesc: 'ExampleTask description',
  taskIcon: {
    name: 'ic_launcher',
    type: 'mipmap',
  },
  color: '#ff00ff',
  linkingURI: 'yourSchemeHere://chat/jane', // See Deep Linking for more info
  parameters: {
    delay: 1000,
  },
};

function MainNavigator({ auth }) {
  const appState = useRef(AppState.currentState);
  const [appStateVisible, setAppStateVisible] = useState(appState.current);
  useEffect(() => {
    const subscription = AppState.addEventListener('change', nextAppState => {
      if (
        appState.current.match(/inactive|background/) &&
        nextAppState === 'active'
      ) {
        console.log('App has come to the foreground!');
      }

      appState.current = nextAppState;
      setAppStateVisible(appState.current);
      console.log('AppState', appState.current);
    });

    return () => {
      subscription.remove();
    };
  }, []);

  useEffect(() => {
    if (appStateVisible == 'background') {
      BackgroundService.start(backgroundTask, options);
    } else {
      BackgroundService.stop();
    }
  }, [appStateVisible])
  //console.log("Auth:", auth.auth);
  let bgcolor = '#417cca';
  return (
    <>
      <StatusBar
        backgroundColor="#417cca"
        barStyle="dark-content"
        hidden={true}
      />
      <Stack.Navigator>
        {auth.auth === null ? (
          <>
            <Stack.Screen
              name="WelcomeScreen"
              component={WelcomeScreen}
              options={{ headerShown: false }}
            />
          </>
        ) : (
          <>
            <Stack.Screen
              name="Welcome"
              component={FirstIntercept}
              options={{ headerShown: false }}
            />
          </>
        )}
      </Stack.Navigator>
    </>
  );
}
const mapStateToProps = ({ auth }) => ({
  auth,
});

export default connect(mapStateToProps, null)(MainNavigator);
