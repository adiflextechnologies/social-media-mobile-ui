import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {AppHeader, Container} from '../../components';

const MyPosts = () => {
  const renderHeader = () => {
    return <AppHeader title={'My Posts'} />;
  };

  return (
    <Container
      renderHeader={renderHeader}
      style={
        {
          // flex: 1,
        }
      }>
      <View
        style={{
          // flex: 1,
          // marginTop: 300,
          height: '100%',
          alignItems: 'center',
          justifyContent: 'center',
        }}>
        <Text>No Post found</Text>
      </View>
    </Container>
  );
};

export default MyPosts;

const styles = StyleSheet.create({});
