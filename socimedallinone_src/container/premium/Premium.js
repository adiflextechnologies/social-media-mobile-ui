import {FlatList, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React from 'react';
import {AppHeader, Container, Icon} from '../../components';
import {createMaterialTopTabNavigator} from '@react-navigation/material-top-tabs';
import {test} from './mock';
import {useRoute} from '@react-navigation/native';
import {colors} from '../../theme';

const Tab = createMaterialTopTabNavigator();

const Premium = () => {
  const renderHeader = () => {
    return <AppHeader title={'Subscription'} />;
  };

  return (
    <Container>
      <View style={styles.infoContainer}>
        <Icon size={50} name={'construct'} family="Ionicons" />
        <Text style={styles.info}>This feature is under development</Text>
        <Text style={styles.info}>For more info contact us!</Text>
      </View>
    </Container>
  );

  return (
    <Container style={styles.parentContainer}>
      {renderHeader()}
      <Tab.Navigator
        screenOptions={{
          tabBarScrollEnabled: true,
          tabBarActiveTintColor: colors.active,
          tabBarStyle: {
            backgroundColor: colors.accent,
          },
          tabBarInactiveTintColor: colors.white,
          tabBarIndicatorStyle: {
            backgroundColor: colors.active,
          },
        }}>
        {test.pkg.map((item, index) => {
          return (
            <Tab.Screen
              name={item.id}
              key={item.id}
              options={{
                tabBarLabel: item.name,
                tabBarLabelStyle: {
                  textTransform: 'none',
                  fontSize: 14,
                },
              }}
              initialParams={item}
              component={SubscriptionScreen}
            />
          );
        })}
      </Tab.Navigator>
    </Container>
  );
};

const SubscriptionScreen = () => {
  const data = useRoute().params;

  const renderItem = ({item, index}) => {
    return (
      <View
        style={{
          padding: 10,
          backgroundColor: '#fff',
          margin: 10,
          minWidth: 150,
          borderRadius: 10,
          alignItems: 'center',
          alignSelf: 'baseline',
          // flex: 1
        }}>
        <Text
          style={{
            color: '#000',
            fontSize: 16,
            marginVertical: 3,
          }}>
          {item.name}
        </Text>
        <Text
          style={{
            color: '#000',
            fontSize: 16,
            marginVertical: 3,
          }}>
          {item.day}
        </Text>
        <Text
          style={{
            color: '#000',
            fontSize: 16,
            marginVertical: 3,
          }}>
          {'Month'}
        </Text>
        <Text
          style={{
            color: '#000',
            fontSize: 16,
            marginVertical: 3,
          }}>
          {`₹ ${item.price}`}
        </Text>
        <Text
          style={{
            color: '#000',
            fontSize: 16,
            marginVertical: 3,
            textDecorationLine: 'line-through',
          }}>
          {`₹ ${item.mrp}`}
        </Text>
        <Text
          style={{
            color: '#000',
            fontSize: 16,
            marginVertical: 3,
          }}>
          {` Save ₹ ${item.discount}`}
        </Text>
        <TouchableOpacity
          style={{
            backgroundColor: colors.active,
            paddingVertical: 10,
            borderRadius: 15,
            alignItems: 'center',
            paddingHorizontal: 20,
            marginTop: 20,
          }}>
          <Text
            style={{
              fontSize: 20,
              color: '#fff',
              fontWeight: '500',
            }}>
            {'Buy'}
          </Text>
        </TouchableOpacity>
      </View>
    );
  };

  return (
    <View style={styles.container}>
      <FlatList
        data={data.package_data}
        horizontal
        keyExtractor={item => item.plan_id}
        renderItem={renderItem}
      />
    </View>
  );
};

export default Premium;

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.secoundry,
    flex: 1,
  },
  parentContainer: {
    paddingHorizontal: 0,
  },
  infoContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  info: {
    fontSize: 18,
    color: colors.white,
  },
});
