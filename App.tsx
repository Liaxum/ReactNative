import React, { JSXElementConstructor } from "react";
import "react-native-gesture-handler";

import { createStackNavigator } from "@react-navigation/stack";
import { NavigationContainer } from "@react-navigation/native";

import Login from "@/views/Login";
import Details from "@/views/Details";
import Tabs from "@/components/Tabs";
import supabase from "src/supabase";

export default function App({ navigate }: any) {
  const Stack = createStackNavigator();
  let isLoggedIn = false;

  supabase.auth.getSession().then(({ data, error }: any) => {
    isLoggedIn = data.session && !error;
  });

  return (
    <NavigationContainer>
      {isLoggedIn ? (
        <Stack.Navigator>
          <Stack.Screen
            name="Tabs"
            component={Tabs}
            options={{ headerShown: false }}
          />
          <Stack.Screen name="Details" component={Details} />
        </Stack.Navigator>
      ) : (
        <Stack.Navigator>
          <Stack.Screen
            name="Login"
            component={Login}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="Tabs"
            component={Tabs}
            options={{ headerShown: false }}
          />
        </Stack.Navigator>
      )}
    </NavigationContainer>
  );
}
