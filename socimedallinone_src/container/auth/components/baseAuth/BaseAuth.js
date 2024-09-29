import {
  Keyboard,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  TouchableWithoutFeedback,
  useWindowDimensions,
  View,
} from 'react-native';
import React from 'react';
import AppIcon from '../../../../../assets/logo.png';
import LoginImg from '../../../../../assets/splash.png';
import SignUpImg from '../../../../assets/signup.png';
import {useNavigation} from '@react-navigation/native';
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';
import {colors} from '../../../../theme';
import {SafeAreaView} from 'react-native-safe-area-context';
import {Image} from 'expo-image';
import {StatusBar} from 'expo-status-bar';

const ASPECT_RATIO = 0.45;

const BaseAuth = ({isSignUp = false, children}) => {
  const navigation = useNavigation();
  const {height, width} = useWindowDimensions();

  return (
    <KeyboardAvoidingView
      keyboardVerticalOffset={-150}
      behavior={'padding'}
      style={[styles.container]}>
      <View style={styles.container}>
        <StatusBar style="auto" />
        <View>
          <Image
            source={isSignUp ? SignUpImg : LoginImg}
            style={styles.backgroundImg(height, ASPECT_RATIO)}
            resizeMode={'cover'}
          />
          {isSignUp ? (
            <View style={styles.backContainer}>
              <TouchableOpacity onPress={navigation.goBack}>
                <MaterialCommunityIcons
                  color={colors.white}
                  name="arrow-left"
                  size={26}
                />
              </TouchableOpacity>
            </View>
          ) : null}
        </View>

        <View
          style={{
            flex: 1,
            bottom: 0,
            position: 'absolute',
          }}>
          <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
            <View style={styles.subContainer(height, width, 1 - ASPECT_RATIO)}>
              <View style={styles.loginTopContainer}>
                <Text style={styles.login}>
                  {isSignUp ? (
                    'Create an account'
                  ) : (
                    <>
                      Welcome to{'  '}
                      <Text style={{color: colors.active}}>
                        {process.env.EXPO_PUBLIC_APP_NAME}
                      </Text>
                    </>
                  )}
                </Text>
              </View>
              <View style={{paddingHorizontal: 5}}>{children}</View>
            </View>
          </TouchableWithoutFeedback>
        </View>
      </View>
    </KeyboardAvoidingView>
  );
};

export default BaseAuth;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  backContainer: {
    position: 'absolute',
    top: 15,
    left: 15,
  },
  backgroundImg: (height, ratio) => ({
    height: height,
  }),
  subContainer: (height, width, ratio) => ({
    backgroundColor: colors.secoundry,
    height: height * ratio,
    width: width,
    elevation: 3,
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    alignSelf: 'center',
    paddingHorizontal: 25,
    paddingBottom: 25,
  }),
  appIcon: {
    height: 50,
    width: 50,
  },
  login: {
    fontSize: 22,
    color: colors.white,
    fontWeight: '600',
    paddingEnd: 10,
    paddingStart: 10,
  },
  loginTopContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingTop: 25,
    paddingBottom: 10,
  },
});
