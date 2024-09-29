import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import Login from './Login';
import SignUp from './SignUp';
import PolicyAndConditions from '../legalDoc'

const Stack = createStackNavigator();

const AuthContainer = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}
      initialRouteName="Login">
      <Stack.Screen name="Login" component={Login} />
      <Stack.Screen name="SignUp" component={SignUp} />
      <Stack.Screen name="PolicyAndConditions" component={PolicyAndConditions} />
    </Stack.Navigator>
  );
};

export default AuthContainer;
