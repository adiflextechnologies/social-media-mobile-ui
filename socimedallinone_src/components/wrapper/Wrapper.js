import {Pressable, StyleSheet, Text, View} from 'react-native';
import React, {useState} from 'react';
import {useNavigation} from '@react-navigation/native';
import api from '../../service/api';
import {useSession} from '../../hook/useSession';
import LoginPopup from '../login/LoginPopup';

const Wrapper = ({children, isDetails, isVideo = false, data, label}) => {
  const navigation = useNavigation();
  const {isAuth} = useSession();
  const [isLoginPopup, setLoginPopup] = useState();

  const onLoginPopupClose = () => {
    setLoginPopup(false);
  };

  const onPress = async () => {
    if (isDetails) {
      navigation.push('SingleDetails', {data, isImgById: true, label});
    } else {
      if (!isAuth) {
        setLoginPopup(true);
        return;
      }

      // const result = await api.home.getReels();
      // console.log('onPress ===> ', result);

      // if (isVideo) {
      navigation.push('Editor', {
        data,
        isImgById: true,
        label,
        isVideoEditor: isVideo,
      });
      // return;
      // }
      // navigation.navigate("PostEditor", { data });
    }
  };

  return (
    <>
      <Pressable onPress={onPress}>{children}</Pressable>
      {isLoginPopup ? (
        <LoginPopup isVisible={isLoginPopup} onClose={onLoginPopupClose} />
      ) : null}
    </>
  );
};

export default Wrapper;

const styles = StyleSheet.create({});

//9033488004 - Manish Bapu

//
