import React, { useState } from 'react';
import {
	Animated,
	Dimensions,
	Image,
	Platform,
	StyleSheet,
	Text,
	TouchableOpacity,
	View
} from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

// Plus...
import plus from './plus.png';

// Font Awesome Icons...
import FontAwesome5 from '@expo/vector-icons/FontAwesome5';
import { useRef } from 'react';
import { useNavigation } from '@react-navigation/native';
import { colors } from '../../theme';
import { useSession } from '../../hook/useSession';
import { ActionSheet, LoginPopup } from '../../components';

const Tab = createBottomTabNavigator();

const activeColor = colors.active;
const inactiveColor = colors.whitesmoke;

const TabsContainer = ({ tabs }) => {
	const tabOffsetValue = useRef(new Animated.Value(0)).current;
	const navigation = useNavigation();
	const { isAuth } = useSession();
	const [isLoginPopup, setLoginPopup] = useState();

	const onCreatePress = () => {
		if (!isAuth) {
			setLoginPopup(true);
			return;
		}
		navigation.navigate('PostEditor', posterOption);
	};

	const onLoginPopupClose = () => {
		setLoginPopup(false);
	};

	return (
		<>
			<Tab.Navigator screenOptions={options}>
				{tabs.map((item, index) => {
					// index = index -1
					if (index === 2) {
						return (
							<Tab.Screen
								name={'ActionButton'}
								key={item.name}
								component={EmptyScreen}
								options={{
									tabBarLabel: '',
									headerShown: false,
									tabBarIcon: ({ focused }) => (
										<TouchableOpacity
											onPress={onCreatePress}
											style={{}}
										>
											<View
												style={{
													position: 'absolute',
													width: 70,
													height: 35,
													backgroundColor:
														colors.secoundry,
													bottom: 42,
													alignSelf: 'center',
													borderBottomEndRadius: 50,
													borderBottomStartRadius: 50
													// borderTopRightRadius: 100
												}}
											/>
											<View
												style={{
													width: 55,
													height: 55,
													backgroundColor:
														activeColor,
													borderRadius: 27.5,
													justifyContent: 'center',
													alignItems: 'center',
													marginBottom: 50,
													elevation: 3
												}}
											>
												<Image
													source={plus}
													style={{
														width: 22,
														height: 22,
														tintColor: 'white'
													}}
												/>
											</View>
										</TouchableOpacity>
									)
								}}
							></Tab.Screen>
						);
					}
					return (
						<Tab.Screen
							name={item.name}
							key={item.name}
							component={item.component}
							options={{
								tabBarLabel: '',
								tabBarIcon: ({ focused }) => (
									<View>
										<FontAwesome5
											name={item.icon}
											size={20}
											color={
												focused
													? activeColor
													: inactiveColor
											}
										></FontAwesome5>
									</View>
								)
							}}
							listeners={({ navigation, route }) => ({
								// Onpress Update....
								tabPress: (e) => {
									Animated.spring(tabOffsetValue, {
										toValue: getWidth() * index,
										useNativeDriver: true
									}).start();
								}
							})}
						></Tab.Screen>
					);
				})}
			</Tab.Navigator>

			<Animated.View
				style={{
					width: getWidth() - 20,
					height: 2,
					backgroundColor: activeColor,
					position: 'absolute',
					bottom: Platform.OS === 'android' ? 49 : 79,
					marginHorizontal: 10,
					// Horizontal Padding = 20...
					// left: 50,
					borderRadius: 20,
					transform: [{ translateX: tabOffsetValue }]
				}}
			></Animated.View>
			<LoginPopup isVisible={isLoginPopup} onClose={onLoginPopupClose} />
		</>
	);
};

function getWidth() {
	let width = Dimensions.get('window').width;
	width = width;
	return width / 5;
}

export default TabsContainer;

const EmptyScreen = () => {
	return (
		<View
			style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}
		></View>
	);
};

const styles = StyleSheet.create({
	container: {
		// backgroundColor: 'green',
		// overflow: 'hidden',
		// Shadow...
		shadowColor: '#000',
		shadowOpacity: 0.06,
		shadowOffset: {
			width: 10,
			height: 10
		},
		paddingHorizontal: 20
	}
});

const options = {
	style: styles.container,
	tabBarShowLabel: false,
	headerShown: false,
	tabBarStyle: {
		backgroundColor: colors.accent
	}
};

const posterOption = {
	data: {
		index: 0,
		images: [
			{
				image_url:
					'https://img.freepik.com/free-vector/white-elegant-texture-wallpaper_23-2148417584.jpg?w=1800&t=st=1668806098~exp=1668806698~hmac=5bce5b1e31351c49417c0a2b0753bba6f8649055e2595edab6517d9af395adf1'
			}
		]
	}
};

{
	/* <Tab.Screen
name={'Home'}
component={HomeScreen}
options={{
  tabBarIcon: ({focused}) => (
    <View
      style={
        {
          // centring Tab Button...
          //   position: 'absolute',
          //   top: 20,
        }
      }>
      <FontAwesome5
        name="home"
        size={20}
        color={focused ? activeColor : inactiveColor}></FontAwesome5>
    </View>
  ),
}}
listeners={({navigation, route}) => ({
  // Onpress Update....
  tabPress: e => {
    Animated.spring(tabOffsetValue, {
      toValue: 0,
      useNativeDriver: true,
    }).start();
  },
})}></Tab.Screen>

<Tab.Screen
name={'Search'}
component={SearchScreen}
options={{
  tabBarIcon: ({focused}) => (
    <View
      style={
        {
          // centring Tab Button...
          //   position: 'absolute',
          //   top: 20,
        }
      }>
      <FontAwesome5
        name="search"
        size={20}
        color={focused ? activeColor : inactiveColor}></FontAwesome5>
    </View>
  ),
}}
listeners={({navigation, route}) => ({
  // Onpress Update....
  tabPress: e => {
    Animated.spring(tabOffsetValue, {
      toValue: getWidth(),
      useNativeDriver: true,
    }).start();
  },
})}></Tab.Screen>

{
// Extra Tab Screen For Action Button..
}

<Tab.Screen
name={'ActionButton'}
component={EmptyScreen}
options={{
  tabBarIcon: ({focused}) => (
    <TouchableOpacity>
      <View
        style={{
          width: 55,
          height: 55,
          backgroundColor: activeColor,
          borderRadius: 30,
          justifyContent: 'center',
          alignItems: 'center',
          marginBottom: Platform.OS == 'android' ? 50 : 30,
        }}>
        <Image
          source={plus}
          style={{
            width: 22,
            height: 22,
            tintColor: 'white',
          }}></Image>
      </View>
    </TouchableOpacity>
  ),
}}></Tab.Screen>

<Tab.Screen
name={'Notifications'}
component={NotificationScreen}
options={{
  tabBarIcon: ({focused}) => (
    <View
      style={
        {
          // centring Tab Button...
          //   position: 'absolute',
          //   top: 20,
        }
      }>
      <FontAwesome5
        name="bell"
        size={20}
        color={focused ? activeColor : inactiveColor}></FontAwesome5>
    </View>
  ),
}}
listeners={({navigation, route}) => ({
  // Onpress Update....
  tabPress: e => {
    Animated.spring(tabOffsetValue, {
      toValue: getWidth() * 3,
      useNativeDriver: true,
    }).start();
  },
})}></Tab.Screen>

<Tab.Screen
name={'Settings'}
component={SettingsScreen}
options={{
  tabBarIcon: ({focused}) => (
    <View
      style={
        {
          // centring Tab Button...
          //   position: 'absolute',
          //   top: 20,
        }
      }>
      <FontAwesome5
        name="user-alt"
        size={20}
        color={focused ? activeColor : inactiveColor}></FontAwesome5>
    </View>
  ),
}}
listeners={({navigation, route}) => ({
  // Onpress Update....
  tabPress: e => {
    Animated.spring(tabOffsetValue, {
      toValue: getWidth() * 4,
      useNativeDriver: true,
    }).start();
  },
})}></Tab.Screen> */
}
