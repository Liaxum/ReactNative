import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";

import Home from "@/views/Home";
import Categories from "@/views/Categories";


export default function Tabs() {
  const Tab = createBottomTabNavigator();
  return (
    <Tab.Navigator>
      <Tab.Screen name="Home" component={Home} options={{headerShown: false}} />
      <Tab.Screen name="Categories" component={Categories} options={{headerShown: false}} />
    </Tab.Navigator>
  );
}