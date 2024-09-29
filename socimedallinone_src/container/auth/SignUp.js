import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React, {useState} from 'react';
import {BaseAuth} from './components';
import {Button, Input} from '../../components';
import {useNavigation, useRoute} from '@react-navigation/native';
import api from '../../service/api';
import { local } from '../../store';
import { useSession } from '../../hook/useSession';

const SignUp = () => {
  const {number = ''} = useRoute().params || {};
  const [name, setName] = useState('');
  const [mail, setMail] = useState("")
  const navigation = useNavigation();
  const {setUser, setAuth, setGuestMode} = useSession();
  const [isLoading, setLoadiing] = useState(false)
  

  // const [number, setNumber] = useState()

  const onTermsAndCondPress = () => {
    navigation.push('PolicyAndConditions');
  };

  const onPrivacyPolicyPress = () => {
    navigation.push('PolicyAndConditions', {isPrivacyPolicy: true});
  };

  const onLoginPress = () => {
    navigation.pop()
  };

  const onSignUpPress = async () => {
    setLoadiing(true)
    const reqData = {
      email: mail,
      password: "socialmedia123",
      name: name,
      mobile: number,
      designation: "",
      state: "",
      district: "",
      tehsil: "",
      avatar: ""

    }

    const {data, status} = await api.auth.signUp(reqData)
    await local.push(local.keys.SESSION, data);
    setUser(data);
    setAuth(true);
    setLoadiing(false)

  }



  return (
    <BaseAuth isSignUp>
      <View style={styles.container}>
        <Input
          icon={'user-alt'}
          containerStyle={styles.marginContainer}
          placeholder={'Enter full name*'}
          value={name}
          onChangeText={setName}
        />
        <Input
          icon={'phone-alt'}
          containerStyle={styles.marginContainer}
          placeholder={'Enter mobile number*'}
          value={number}
        />
        <Input
          icon={'at'}
          containerStyle={styles.marginContainer}
          placeholder={'Enter mail address'}
          value={mail}
          onChangeText={setMail}
        />
        <View style={styles.marginContainer}>
          <View style={[{flexDirection: 'row'}]}>
            <Text style={styles.note}>By signing up, you're agree to our </Text>
            <PressableText onPress={onTermsAndCondPress}>
              Terms & Conditions
            </PressableText>
            <Text>{' and'}</Text>
          </View>
          <PressableText onPress={onPrivacyPolicyPress}>
            Privacy Policy
          </PressableText>
        </View>
        <Button onPress={onSignUpPress} isLoading={isLoading} containerStyle={styles.marginContainer} title={'Sign up'} />
        <View style={[styles.marginContainer, {flexDirection: 'row'}]}>
          <Text style={styles.note}>Joined us before? </Text>
          <PressableText onPress={onLoginPress}>Login</PressableText>
        </View>
      </View>
    </BaseAuth>
  );
};

const PressableText = ({children, onPress}) => {
  return (
    <TouchableOpacity style={styles.pressableTextContainer} onPress={onPress}>
      <Text style={styles.highLight}>{children}</Text>
    </TouchableOpacity>
  );
};

export default SignUp;

const styles = StyleSheet.create({
  marginContainer: {
    marginVertical: 10,
  },
  container: {
    paddingTop: 15,
  },
  note: {
    fontSize: 12,
  },
  highLight: {
    color: '#8D3DAF',
    textDecorationLine: 'underline',
    lineHeight: 18,
    fontSize: 12,
    textAlignVertical: 'bottom',
  },
  pressableTextContainer: {
    // alignSelf: 'center'
    // backgroundColor: 'red',
    // flex: 1,
    // justifyContent: 'flex-end',
    // paddingBottom: 5,
  },
});
