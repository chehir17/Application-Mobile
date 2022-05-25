import React from 'react';
import { CryptoDetail,
   LoginScreen,
   StartScreen,
   ResetPasswordScreen,
   Notif,
   ActionRetard,
   Settings,
   ModifierStatut,
  } from "./screens"; //// zid l login hnee
  import { PriceAlert,
   } from "./components"; //// zid l login hnee
import { createStackNavigator } from "@react-navigation/stack";
import { NavigationContainer } from '@react-navigation/native';
import Tabs from "./navigation/tabs";

const Stack = createStackNavigator();

const App = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={{
          headerShown: false,
        }}
        initialRouteName="StartScreen"
      >
      <Stack.Screen
       name="StartScreen" 
       component={StartScreen} 
       />
         <Stack.Screen
          name="LoginScreen"
          component={LoginScreen}
        />
          <Stack.Screen
            name="ResetPasswordScreen"
            component={ResetPasswordScreen}
          />
        <Stack.Screen
          name="Home"
          component={Tabs}
        />
        <Stack.Screen
          name="CryptoDetail"
          component={CryptoDetail}
        />
        <Stack.Screen
          name="Notifications"
          component={Notif}
        />
         <Stack.Screen
          name="ActionRetard"
          component={ActionRetard}
        />
         <Stack.Screen
          name="Settings"
          component={Settings}
        />
         <Stack.Screen
          name="ModifierStatut"
          component={ModifierStatut}
        />
          <Stack.Screen
          name="PriceAlert"
          component={PriceAlert}
        />
      </Stack.Navigator>
    </NavigationContainer>
  )
}

export default App;