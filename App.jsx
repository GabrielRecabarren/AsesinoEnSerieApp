import React from "react";
import HomeScreen from "./src/screens/HomeScreen.jsx";
import LoginScreen from "./src/screens/LoginScreen.jsx";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { StartScreen } from "./src/screens/StartScreen.jsx";
import { CreateScreen } from "./src/screens/CreateScreen.jsx";
import { LoadScreen } from "./src/screens/LoadScreen.jsx";

//Creo un Stack para navegación
const Stack = createNativeStackNavigator();

export default function App() {
  return (
    //Navigation Container debe cubrir todo.
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Home" >
        <Stack.Screen
          name="Home"
          component={HomeScreen}
          options={{ title: "Bienvenid@" }}
        />
        <Stack.Screen name="Login" component={LoginScreen} />
        <Stack.Screen name="Start" component={StartScreen} />
        <Stack.Screen name="Create" component={CreateScreen} />
        <Stack.Screen name="Load" component={LoadScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
