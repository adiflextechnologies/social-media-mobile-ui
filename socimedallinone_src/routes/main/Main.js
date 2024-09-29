import {ActivityIndicator, Image, StyleSheet, Text, View} from 'react-native';
import React, {useEffect, useState} from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {Auth, Home} from '../../container';
import AppStackContainer from './Stack';
import {useSession} from '../../hook/useSession';
import {StatusBar} from 'expo-status-bar';
import {colors} from '../../theme';
import {useDispatch} from 'react-redux';
import {actions, local} from '../../store';

const RouteContainer = () => {
  const {isAuth, isGuestMode, setAuth, setGuestMode, setUser} = useSession();
  const [isLoading, setIsLoading] = useState(true);
  const dispatch = useDispatch();

  useEffect(() => {
    // Define an asynchronous function inside the effect
    const getLocalUser = async () => {
      const data = await local.pull(local.keys.SESSION);
      if (data) {
        setUser(data);
        dispatch(actions.user.setUserProfile(data));
        dispatch(actions.user.setAuthenticated(data.user_id));
        setAuth(true);
        setGuestMode(false);
      }
      setIsLoading(false);
    };

    // Call the function immediately
    getLocalUser();
    return () => {};
  }, []); // Add dependencies here if any

  if (isLoading) {
    return (
      <View
        style={{
          flex: 1,
          alignItems: 'center',
          // justifyContent: 'center'
        }}>
        <View
          style={{
            // marginVertical: height / 2 - 200,
            flex: 1,
            justifyContent: 'center',
            alignItems: 'center',
          }}>
          <Image
            source={require('../../../assets/logo.png')}
            style={{
              height: 100,
              width: 100,
            }}
            resizeMode={'contain'}
          />
          <Text
            style={{
              fontSize: 18,
            }}>
            ''
          </Text>
        </View>
        <ActivityIndicator size={'large'} />
        <View
          style={{
            paddingVertical: 10,
          }}>
          <Text>Please wait...</Text>
        </View>
      </View>
    );
  }

  return (
    <NavigationContainer>
      <StatusBar style="light" backgroundColor={colors.accent} />
      {isAuth || isGuestMode ? <AppStackContainer /> : <Auth />}
    </NavigationContainer>
  );
};

export default RouteContainer;

const styles = StyleSheet.create({});
