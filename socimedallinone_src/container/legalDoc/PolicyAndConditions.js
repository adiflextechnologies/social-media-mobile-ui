import {StyleSheet} from 'react-native';
import React from 'react';
import {useNavigation, useRoute} from '@react-navigation/native';
import WebView from 'react-native-webview';
import {AppHeader, Container} from '../../components';
const TAC = 'https://socialmediaallinone.com/terms-conditions.html';
const PRIVACY_POLICY = 'https://socialmediaallinone.com/privacy-policy.html';

const PolicyAndConditions = () => {
  const {isPrivacyPolicy = false} = useRoute().params || {};
  const navigation = useNavigation();
  // const {height} = useWindowDimensions();

  const renderHeader = () => {
    return (
      <AppHeader
        title={isPrivacyPolicy ? 'Privacy Policy' : 'Terms and Conditions'}
        navigation={navigation}
        isBack
      />
    );
  };

  return (
    <Container
      renderHeader={renderHeader}
      containerStyle={styles.container}
      style={styles.container}>
      <WebView source={{uri: isPrivacyPolicy ? PRIVACY_POLICY : TAC}} />
    </Container>
  );
};

export default PolicyAndConditions;

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fff',
    flex: 1,
  },
});
