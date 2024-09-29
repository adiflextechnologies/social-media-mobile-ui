import * as React from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {Home, MyPosts, Premium, Settings} from '../../container';
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';
import {TouchableOpacity, View} from 'react-native';
import {AppHeader} from '../../components';
import TabsContainer from '../tabs/tabs';

const Tab = createBottomTabNavigator();

const tabs = [
  {
    name: 'Home',
    component: Home,
    icon: 'home',
  },
  {
    name: 'Premium',
    component: Premium,
    icon: 'crown',
  },
  {
    name: 'Home2',
    component: Home,
    icon: 'home',
  },

  {
    name: 'MyPosts',
    component: MyPosts,
    icon: 'photo-video',
  },
  {
    name: 'Settings',
    component: Settings,
    icon: 'user-alt',
  },
];

const MainTabs = () => {
  return <TabsContainer tabs={tabs} />;
};

export default MainTabs;
