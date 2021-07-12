import React from 'react';
import { connect } from 'react-redux';
import { StatusBar } from 'react-native';
import { createStackNavigator } from '@react-navigation/stack';
import WelcomeScreen from '../screens/WelcomeScreen';
import FirstIntercept from '../screens/FirstIntercept';

console.disableYellowBox = true;

const Stack = createStackNavigator();

function MainNavigator({ auth }) {
  console.log("Auth:", auth.auth);
  return (
    <>
      <StatusBar barStyle="dark-content" hidden={true} />
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
