import {
  ActivityIndicator,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useState} from 'react';
import {BaseAuth} from './components';
import {useSession} from '../../hook/useSession';
// import messaging from '@react-native-firebase/messaging';
// import Toast from 'react-native-toast-message';
import {local} from '../../store';
import api from '../../service/api';
import {useNavigation} from '@react-navigation/native';
import {Button, Input} from '../../components';
import Toast from 'react-native-root-toast';
import {colors} from '../../theme';
import {useDispatch} from 'react-redux';
import {actions} from '../../store';

const ENTER_VALID_NUMBER = 'Please enter valid mobile number';
const OTP_SENT_MSG = 'We have sent you an SMS with code\nto number';
const INVALID_OTP = 'Invalid OTP';

const Login = () => {
  const [number, setNumber] = useState('');
  const [isLoading, setLoading] = useState(false);
  const [otp, setOTP] = useState('');
  const [isOTPSection, setOTPSection] = useState(false);
  const [isSignup, setSignup] = useState(false);
  const [data, setData] = useState();
  const {setUser, setAuth, setGuestMode} = useSession();
  const navigation = useNavigation();
  const dispatch = useDispatch();

  const getOTPPress = async () => {
    setLoading(true);
    // var value = "+91 99 16 489165";

    let num = number.replace('.', '');

    num = num.replace(/\D/g, '').slice(-10);

    if (num.length != 10) {
      showToast(ENTER_VALID_NUMBER, true);
      return;
    }

    if (isNaN(num)) {
      showToast(ENTER_VALID_NUMBER, true);
      return;
    }

    // return
    let fcmToken = 'kjsfohdowhondafbjkdsfnasljodsoahodijfo';

    const {data, status} = await api.auth.sendOtp({
      mobile_no: num,
      device_token: fcmToken,
    });

    if (status === 200) {
      if (data.status === 'error') {
        showToast(data.message, true);
        if (data.otp === '') {
          return;
        }

        if (data.otp) {
          setSignup(true);
        }
        // return;
      } else {
        showToast(data.message);
      }

      setData(data);
      if (__DEV__) {
        setOTP(data.otp);
      }
      setLoading(false);
      setOTPSection(true);
    }
  };

  const onEditNumberPress = () => {
    setData(null);
    setLoading(false);
    setOTPSection(false);
    setSignup(false);
  };

  const onSkipPress = () => {
    setGuestMode(true);
  };

  const onTermsAndCondPress = () => {
    navigation.push('PolicyAndConditions');
  };

  const showToast = (msg = '', isError) => {
    Toast.show(msg, {
      backgroundColor: isError ? 'red' : 'green',
      textColor: 'white',
    });
    setLoading(false);
  };

  const verifyOtp = async () => {
    if (data.otp === otp) {
      if (isSignup) {
        navigation.navigate('SignUp', {number});
        return;
      }
      await local.push(local.keys.SESSION, data);
      dispatch(actions.user.setUserProfile(data));
      dispatch(actions.user.setAuthenticated(data.user_id));
      setUser(data);
      setAuth(true);
    } else {
      showToast(INVALID_OTP, true);
    }
  };

  return (
    <BaseAuth>
      <View style={styles.topContainer}>
        <Text style={styles.sublogin}>
          {isOTPSection ? `${OTP_SENT_MSG} ${number}` : 'Login to your account'}
        </Text>
      </View>

      <View style={styles.inputContainer}>
        <Input
          placeholder={isOTPSection ? 'Enter OTP' : 'Enter Mobile'}
          keyboardType="number-pad"
          value={isOTPSection ? otp : number}
          onChangeText={isOTPSection ? setOTP : setNumber}
          onIconPress={onEditNumberPress}
          icon={isOTPSection ? 'arrow-left' : 'phone-alt'}
        />
      </View>
      <View style={styles.otpContainer}>
        <Button
          onPress={isOTPSection ? verifyOtp : getOTPPress}
          isLoading={isLoading}
          title={isOTPSection ? 'Verify OTP' : 'Send OTP'}
        />
      </View>
      <View style={styles.bottomContainer}>
        <TouchableOpacity onPress={onTermsAndCondPress}>
          <Text style={styles.termsConditions}>Terms and Conditions</Text>
        </TouchableOpacity>
        <View style={styles.skipContainer}>
          <TouchableOpacity onPress={onSkipPress}>
            <Text style={{fontSize: 18, color: colors.white}}>Skip</Text>
          </TouchableOpacity>
        </View>
      </View>
    </BaseAuth>
  );
};

export default Login;

const styles = StyleSheet.create({
  otpContainer: {
    marginTop: 50,
    // alignSelf: 'center',
    // flex: 1
    // width: '100%',
  },
  otpButton: {
    backgroundColor: colors.active,
    paddingVertical: 10,
    borderRadius: 15,
    alignItems: 'center',
  },
  otp: {
    fontSize: 20,
    color: '#fff',
    fontWeight: '500',
  },
  bottomContainer: {
    marginTop: 50,
    alignSelf: 'center',
    width: '85%',
  },
  termsConditions: {
    textAlign: 'center',
    textDecorationLine: 'underline',
    color: colors.white,
    opacity: 0.6,
    fontWeight: '500',
  },
  skipContainer: {
    alignItems: 'center',
    marginTop: 50,
  },
  btnContainer: {
    marginVertical: 50,
    alignItems: 'center',
  },
  login: {
    fontSize: 22,
    color: colors.white,
    fontWeight: '600',
    paddingEnd: 10,
    paddingStart: 10,
  },
  sublogin: {
    color: colors.white,
    fontWeight: '600',
    opacity: 0.5,
    fontSize: 16,
    textAlign: 'center',
  },
  loginContainer: {
    alignItems: 'center',
    paddingTop: 100,
  },
  inputContainer: {
    // width: '100%',
    // alignSelf: 'center',
    marginTop: 50,
    // backgroundColor: '#F5F5F5',
    // paddingHorizontal: 15,
    // borderRadius: 15,
    // flexDirection: 'row',
    // alignItems: 'center',
  },
  input: {
    paddingStart: 15,
    fontSize: 18,
    color: colors.white,
  },
  topContainer: {
    alignSelf: 'center',
    paddingTop: 5,
  },
});
