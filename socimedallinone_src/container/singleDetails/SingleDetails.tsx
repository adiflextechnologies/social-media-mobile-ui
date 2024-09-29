import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {createMaterialTopTabNavigator} from '@react-navigation/material-top-tabs';
import {PostersReels} from './components';
import {AppHeader, Container} from '../../components';
import {useNavigation, useRoute} from '@react-navigation/native';
import {colors} from '../../theme';
import {Animated, TouchableOpacity} from 'react-native';

const SingleDetailTab = createMaterialTopTabNavigator();

const SingleDetails = () => {
  const navigation = useNavigation();
  const {data, label, extraIndex, isImgById} = useRoute<any>().params;

  const renderHeader = () => {
    // return null;
    return (
      <AppHeader
        isTabs={false}
        title={data.title}
        navigation={navigation}
        isBack
      />
    );
  };

  return (
    <Container
      containerStyle={{}}
      isLoading={false}
      style={styles.contatiner}
      renderHeader={renderHeader}>
      <SingleDetailTab.Navigator
        screenOptions={{
          tabBarStyle: styles.tabBar,
          tabBarLabelStyle: styles.tabBarLabel,
        }}
        tabBar={props => <TabBar {...props} />}>
        <SingleDetailTab.Screen
          initialParams={{id: data.videos_id}}
          name="Poster"
          component={PostersReels}
        />
        <SingleDetailTab.Screen
          initialParams={{id: data.videos_id, isReels: true}}
          name="Reels"
          component={PostersReels}
        />
      </SingleDetailTab.Navigator>
    </Container>
  );
};

const TabBar = ({state, descriptors, navigation, position}: any) => {
  return (
    <View style={styles.tabBar}>
      {/* <View style={styles.backContainer}>
        <MaterialCommunityIcons
          onPress={navigation.goBack}
          color={colors.white}
          name="arrow-left"
          size={20}
        />
      </View> */}
      {state.routes.map(
        (route: {key: string | number; name: any; params: any}, index: any) => {
          const {options} = descriptors[route.key];
          const label =
            options.tabBarLabel !== undefined
              ? options.tabBarLabel
              : options.title !== undefined
              ? options.title
              : route.name;

          const isFocused = state.index === index;

          const onPress = () => {
            const event = navigation.emit({
              type: 'tabPress',
              target: route.key,
              canPreventDefault: true,
            });

            if (!isFocused && !event.defaultPrevented) {
              navigation.navigate(route.name, route.params);
            }
          };

          const onLongPress = () => {
            navigation.emit({
              type: 'tabLongPress',
              target: route.key,
            });
          };

          const inputRange = state.routes.map((_: any, i: any) => i);
          const opacity = position.interpolate({
            inputRange,
            outputRange: inputRange.map((i: any) => (i === index ? 1 : 0.5)),
          });

          return (
            <TouchableOpacity
              accessibilityRole="button"
              accessibilityState={isFocused ? {selected: true} : {}}
              accessibilityLabel={options.tabBarAccessibilityLabel}
              key={label}
              onPress={onPress}
              onLongPress={onLongPress}
              style={styles.tabBarItem}>
              <Animated.Text style={[{opacity}, styles.tabBarLabel]}>
                {label}
              </Animated.Text>
            </TouchableOpacity>
          );
        },
      )}
    </View>
  );
};

export default SingleDetails;

const styles = StyleSheet.create({
  contatiner: {
    paddingHorizontal: 0,
  },
  tabBarItem: {
    backgroundColor: colors.accent,
    paddingBottom: 15,
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  tabBarLabel: {
    color: colors.white,
    fontSize: 14,
    paddingTop: 0,
  },
  tabBar: {
    backgroundColor: colors.accent,
    flexDirection: 'row',
  },
  backContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingStart: 10,
  },
});
