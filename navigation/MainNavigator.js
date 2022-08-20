import React from 'react';
import {connect} from 'react-redux';
import {LogBox, StatusBar} from 'react-native';
import {createStackNavigator} from '@react-navigation/stack';
import WelcomeScreen from '../screens/WelcomeScreen';
import FirstIntercept from '../screens/FirstIntercept';

LogBox.ignoreAllLogs();

const Stack = createStackNavigator();

function MainNavigator({auth}) {
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
              options={{headerShown: false}}
            />
          </>
        ) : (
          <>
            <Stack.Screen
              name="Welcome"
              component={FirstIntercept}
              options={{headerShown: false}}
            />
          </>
        )}
      </Stack.Navigator>
    </>
  );
}
const mapStateToProps = ({auth}) => ({
  auth,
});

export default connect(mapStateToProps, null)(MainNavigator);
