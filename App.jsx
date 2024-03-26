import React from "react";
import HomeScreen from "./src/screens/HomeScreen.jsx";
import LoginScreen from "./src/screens/LoginScreen.jsx";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { StartScreen } from "./src/screens/StartScreen.jsx";
import { CreateScreen } from "./src/screens/CreateScreen.jsx";
import { LoadScreen } from "./src/screens/LoadScreen.jsx";
import ChatScreen from "./src/screens/ChatScreen.jsx";
import { UserProvider } from "./src/context/UserContext.js";
import { GameContextProvider } from "./src/context/GameContext.js";
import InvitarScreen from "./src/screens/InvitarScreen.jsx";
import { PlayersContextProvider } from "./src/context/PlayersContext.js";
import { SocketProvider } from "./src/context/socketProvider.js";
import RolScreen from "./src/screens/RolScreen.jsx";
import { ProfileScreen } from "./src/screens/ProfileScreen.jsx";
// Creo un Stack para navegación
const Stack = createNativeStackNavigator();

export default function App() {
  return (
    // Navigation Container debe cubrir todo.
    <SocketProvider>
      <NavigationContainer>
        <UserProvider>
          <GameContextProvider>
            <PlayersContextProvider>
              <Stack.Navigator initialRouteName="Home" screenOptions={{
          headerShown: false, // Ocultar la barra de navegación en todas las pantallas
        }}>
                <Stack.Screen
                  name="Home"
                  component={HomeScreen}
                  
                />
                <Stack.Screen name="Login" component={LoginScreen} />
                <Stack.Screen name="Start" component={StartScreen} />
                <Stack.Screen name="Create" component={CreateScreen} />
                <Stack.Screen name="Load" component={LoadScreen} />
                <Stack.Screen name="Chat" component={ChatScreen} />
                <Stack.Screen name="Invitar" component={InvitarScreen} />
                <Stack.Screen name="Rol" component={RolScreen}/> 
                <Stack.Screen name="Profile" component={ProfileScreen}/> 
              </Stack.Navigator>
            </PlayersContextProvider>
          </GameContextProvider>
        </UserProvider>
      </NavigationContainer>
    </SocketProvider>
  );
}
