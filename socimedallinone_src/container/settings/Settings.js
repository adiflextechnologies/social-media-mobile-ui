import {
  Linking,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useMemo} from 'react';
import {Container} from '../../components';
import FontAwesome5 from '@expo/vector-icons/FontAwesome5';
import {useSession} from '../../hook/useSession';
import {useNavigation} from '@react-navigation/native';
import {colors} from '../../theme';
import {Image} from 'expo-image';
//

const getMenuData = () => {
  const data = [
    {
      icon: 'share-alt',
      title: 'Share',
      onPress: () => {},
    },
    {
      icon: 'star',
      title: 'Rate Us',
      onPress: () => {},
    },
    {
      icon: 'play-circle',
      title: 'How to use',
      onPress: async () => {
        await Linking.openURL('https://youtu.be/GiMrDBMOoZ4');
      },
    },
    {
      icon: 'file-contract',
      title: 'Terms & Condition',
      onPress: navigation => {
        navigation.push('PolicyAndConditions', {isPrivacyPolicy: false});
      },
    },
    {
      icon: 'trash-alt',
      title: 'Delete Account',
      onPress: navigation => {
        navigation.push('DeleteAccount');
      },
    },

    {
      icon: 'file-signature',
      title: 'Privacy Policy',
      onPress: navigation => {
        navigation.push('PolicyAndConditions', {isPrivacyPolicy: true});
      },
    },
    {
      icon: 'whatsapp-square',
      title: 'Whatsapp',
      onPress: () => {
        const whatsappNo = '918879055055';
        Linking.openURL(
          `whatsapp://send?phone=${whatsappNo}&text=Hi, I contacted you Through your App.`,
        );
      },
    },
  ];

  return data;
};

const Logout = {
  icon: 'sign-out-alt',
  title: 'Logout',
  isLast: true,
  onPress: () => {},
};

const Login = {
  icon: 'sign-in-alt',
  title: 'Login',
  isLast: true,
  onPress: () => {},
};

const Settings = () => {
  const {user, isAuth, logoutUser, setGuestMode} = useSession();
  const navigation = useNavigation();

  const onLogin = () => {
    setGuestMode(false);
  };

  const onLogout = () => {
    logoutUser();
  };

  const menu = getMenuData();
  if (isAuth) {
    Logout.onPress = onLogout;
    menu.push(Logout);
  } else {
    Login.onPress = onLogin;
    menu.push(Login);
  }
  // return data
  // }, [isAuth])

  const renderRow = (item, index) => {
    if (item.title === 'Delete Account' && !isAuth) {
      return null;
    }
    return (
      <View key={index} style={styles.row(item.isLast)}>
        <View style={{width: 50}}>
          <FontAwesome5 name={item.icon} color={colors.white} size={22} />
        </View>
        <TouchableOpacity onPress={() => item.onPress(navigation)}>
          <Text
            style={{
              color: colors.white,
              fontSize: 18,
            }}>
            {item.title}
          </Text>
        </TouchableOpacity>
      </View>
    );
  };

  const onEditProfile = () => {
    navigation.push('Profile');
  };

  const renderSubSection = () => {
    return (
      <User
        onEditProfile={onEditProfile}
        onLogin={onLogin}
        isAuth={isAuth}
        user={user}
      />
    );
  };

  return (
    <Container>
      <View
        style={{
          height: '100%',
        }}>
        <View style={styles.subContainer(0.9)}>{renderSubSection()}</View>
        <View style={styles.subContainer(1.1)}>
          <ScrollView>{menu.map(renderRow)}</ScrollView>
        </View>
      </View>
    </Container>
  );
};

export default Settings;

const User = ({user, isAuth, onEditProfile, onLogin}) => {
  return (
    <View
      style={{
        alignItems: 'center',
        justifyContent: 'center',
        flex: 1,
      }}>
      <View>
        <Image
          source={
            isAuth ? {uri: user.image_url} : require('../../assets/icon.png')
          }
          style={{
            height: 200,
            width: 200,
            borderRadius: 100,
          }}
        />
        <TouchableOpacity
          onPress={isAuth ? onEditProfile : onLogin}
          style={{
            position: 'absolute',
            bottom: -10,
            alignSelf: 'center',
            alignItems: 'center',
            justifyContent: 'center',
            backgroundColor: 'rgba(255,255,255,0.3)',
            width: 50,
            height: 50,
            borderRadius: 35,
            paddingStart: 5,
          }}>
          <FontAwesome5
            name={isAuth ? 'user-edit' : 'sign-in-alt'}
            size={25}
            color={colors.white}
          />
        </TouchableOpacity>
      </View>

      <View style={{paddingVertical: 10, alignItems: 'center'}}>
        <Text
          style={{
            fontSize: 20,
            color: colors.white,
            fontWeight: '500',
          }}>
          {isAuth ? user.name : ''}
        </Text>
        <Text
          style={{
            fontSize: 16,
            color: colors.white,
            fontWeight: '400',
            opacity: 0.6,
          }}>
          {isAuth ? user.email : 'Please login to use all feature'}
        </Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  subContainer: flex => ({
    flex: flex,
    backgroundColor: colors.secoundry,
  }),
  row: (isLast = false) => ({
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.secoundry,
    borderBottomWidth: isLast ? 0 : 1,
    borderBottomColor: colors.whitesmoke,
    paddingBottom: 12,
    paddingTop: 12,
  }),
});
