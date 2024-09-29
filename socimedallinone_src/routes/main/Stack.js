import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import MainTabs from './Tabs';
import {
  Details,
  PolicyAndConditions,
  Profile,
  Editor,
  SingleDetails,
} from '../../container';
import {AppHeader} from '../../components';
import DeleteAccount from '../../container/auth/DeleteAccount';

const Stack = createStackNavigator();

const AppStackContainer = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}>
      <Stack.Screen name="Tabs" component={MainTabs} />
      <Stack.Screen name="SingleDetails" component={SingleDetails} />
      <Stack.Screen name="Details" component={Details} />
      <Stack.Screen name="Editor" component={Editor} />
      <Stack.Screen name="Profile" component={Profile} />
      <Stack.Screen name="DeleteAccount" component={DeleteAccount} />
      <Stack.Screen
        name="PolicyAndConditions"
        component={PolicyAndConditions}
      />
    </Stack.Navigator>
  );
};

export default AppStackContainer;
