import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import Home from './Home';
import Map from './Map';
import JWTComponent from './JWT/JWTComponent';

const Tab = createBottomTabNavigator();

const TabNavigator = () => (
  <Tab.Navigator>
    <Tab.Screen name='Home' component={Home} />
    <Tab.Screen name='Map' component={Map} />
    <Tab.Screen name='JWTComponent' component={JWTComponent} />
  </Tab.Navigator>
);

export default TabNavigator;
