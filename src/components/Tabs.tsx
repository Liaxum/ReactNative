import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";

import Home from "@/views/Home";
import Categories from "@/views/Categories";
import Icon from "react-native-vector-icons/FontAwesome";

export default function Tabs() {
  const Tab = createBottomTabNavigator();
  return (
    <Tab.Navigator>
      <Tab.Screen
        name="Home"
        component={Home}
        options={{
          headerShown: false,
          tabBarIcon: ({ color, size }) => (
            <Icon name="home" size={size} color={color} />
          ),
        }}
      />
      <Tab.Screen
        name="Categories"
        component={Categories}
        options={{
          headerShown: false,
          tabBarIcon: ({ color, size }) => (
            <Icon name="align-justify" size={size} color={color} />
          ),
        }}
      />
    </Tab.Navigator>
  );
}
