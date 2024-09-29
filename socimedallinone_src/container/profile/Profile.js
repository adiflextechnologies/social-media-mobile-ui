import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React, {useState} from 'react';
import {AppHeader, Button, Container, Input} from '../../components';
import {useSession} from '../../hook/useSession';
import {useNavigation} from '@react-navigation/native';
import FontAwesome5 from '@expo/vector-icons/FontAwesome5';
import api from '../../service/api';
import {Image} from 'expo-image';
import {colors} from '../../theme';

const Profile = () => {
  const {user, isAuth, logoutUser, setGuestMode} = useSession();
  const navigation = useNavigation();
  const [name, setName] = useState(user.name);
  const [number, setNumber] = useState(user.phone);
  const [mail, setMail] = useState(user.email);
  const [profileImg, setProfileImg] = useState(user.image_url);
  const [isLoading, setLoading] = useState(false);

  const renderHeader = () => {
    return <AppHeader title={'Edit Profile'} navigation={navigation} isBack />;
  };

  const onChangeProfile = async () => {};

  const onProfileUpdate = async () => {
    setLoading(true);

    try {
      const reqData = {};

      const {data, status} = await api.auth.update(reqData);
    } catch (error) {}
    setLoading(false);
  };

  return (
    <Container
      containerStyle={styles.container}
      style={styles.container}
      renderHeader={renderHeader}>
      <View style={styles.imgContainer}>
        <Image
          source={{uri: profileImg}}
          style={styles.userImg}
          resizeMode="contain"
        />
        <TouchableOpacity
          onPress={onChangeProfile}
          style={styles.uploadContainer}>
          <FontAwesome5 name={'upload'} size={20} color={'white'} />
        </TouchableOpacity>
      </View>
      <View>
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
      </View>
      <View style={{flex: 1}} />
      <View>
        <Button
          onPress={onProfileUpdate}
          isLoading={isLoading}
          containerStyle={styles.marginContainer}
          title={'Update'}
        />
      </View>
    </Container>
  );
};

export default Profile;

const styles = StyleSheet.create({
  uploadContainer: {
    position: 'absolute',
    bottom: 30,
    alignSelf: 'center',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'rgba(0,0,0,0.5)',
    width: 40,
    height: 40,
    borderRadius: 20,
    // paddingStart: 5,
  },
  container: {
    flex: 1,
  },
  imgContainer: {
    paddingVertical: 50,
    alignItems: 'center',
  },
  userImg: {
    width: 120,
    height: 120,
    borderRadius: 60,
  },
  marginContainer: {
    marginVertical: 10,
  },
});
