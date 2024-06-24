import React, { useEffect, useRef, useState } from 'react';
import { Platform, Linking, Alert } from 'react-native';
import Constants from 'expo-constants';
import * as Notifications from 'expo-notifications';
import * as Permissions from 'expo-permissions';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import HomeScreen from './src/screens/HomeScreen.jsx';
import LoginScreen from './src/screens/LoginScreen.jsx';
import { StartScreen } from './src/screens/StartScreen.jsx';
import { CreateScreen } from './src/screens/CreateScreen.jsx';
import { LoadScreen } from './src/screens/LoadScreen.jsx';
import ChatScreen from './src/screens/ChatScreen.jsx';
import { UserProvider } from './src/context/UserContext.js';
import { GameContextProvider } from './src/context/GameContext.js';
import InvitarScreen from './src/screens/InvitarScreen.jsx';
import { PlayersContextProvider } from './src/context/PlayersContext.js';
import { SocketProvider } from './src/context/socketProvider.js';
import RolScreen from './src/screens/RolScreen.jsx';
import { ProfileScreen } from './src/screens/ProfileScreen.jsx';
import DespedidaScreen from './src/screens/DespedidaScreen.jsx';

const Stack = createNativeStackNavigator();

export default function App() {
  const [expoPushToken, setExpoPushToken] = useState('');
  const notificationListener = useRef();
  const responseListener = useRef();

  useEffect(() => {
    registerForPushNotificationsAsync().then(token => {
      if (token) {
        setExpoPushToken(token);
        console.log('Expo Push Token:', token);
      }
    });

    notificationListener.current = Notifications.addNotificationReceivedListener(notification => {
      console.log('Notification received:', notification);
    });

    responseListener.current = Notifications.addNotificationResponseReceivedListener(response => {
      console.log('Notification response:', response);
    });

    return () => {
      Notifications.removeNotificationSubscription(notificationListener.current);
      Notifications.removeNotificationSubscription(responseListener.current);
    };
  }, []);

  return (
    <SocketProvider>
      <NavigationContainer
        linking={{
          config: {},
          async getInitialURL() {
            const url = await Linking.getInitialURL();
            if (url != null) {
              return url;
            }
            const response = await Notifications.getLastNotificationResponseAsync();
            return response?.notification.request.content.data.url;
          },
          subscribe(listener) {
            const onReceiveURL = ({ url }) => listener(url);
            const eventListenerSubscription = Linking.addEventListener('url', onReceiveURL);
            const subscription = Notifications.addNotificationResponseReceivedListener(response => {
              const url = response.notification.request.content.data.url;
              listener(url);
            });
            return () => {
              eventListenerSubscription.remove();
              subscription.remove();
            };
          },
        }}
      >
        <UserProvider>
          <GameContextProvider>
            <PlayersContextProvider>
              <Stack.Navigator
                initialRouteName="Home"
                screenOptions={{ headerShown: false }}
              >
                <Stack.Screen name="Home" component={HomeScreen} />
                <Stack.Screen name="Login" component={LoginScreen} />
                <Stack.Screen name="Start" component={StartScreen} />
                <Stack.Screen name="Create" component={CreateScreen} />
                <Stack.Screen name="Load" component={LoadScreen} />
                <Stack.Screen name="Chat" component={ChatScreen} />
                <Stack.Screen name="Invitar" component={InvitarScreen} />
                <Stack.Screen name="Rol" component={RolScreen} />
                <Stack.Screen name="Profile" component={ProfileScreen} />
                <Stack.Screen name="Despedida" component={DespedidaScreen} />
              </Stack.Navigator>
            </PlayersContextProvider>
          </GameContextProvider>
        </UserProvider>
      </NavigationContainer>
    </SocketProvider>
  );
}

async function registerForPushNotificationsAsync() {
  let token;
  if (Constants.isDevice) {
    const { status: existingStatus } = await Permissions.getAsync(Permissions.NOTIFICATIONS);
    let finalStatus = existingStatus;
    if (existingStatus !== 'granted') {
      const { status } = await Permissions.askAsync(Permissions.NOTIFICATIONS);
      finalStatus = status;
    }
    if (finalStatus !== 'granted') {
      Alert.alert('Failed to get push token for push notification!');
      return;
    }
    token = (await Notifications.getExpoPushTokenAsync()).data;
    console.log('Token:', token);
  } else {
    Alert.alert('Must use physical device for Push Notifications');
  }

  if (Platform.OS === 'android') {
    Notifications.setNotificationChannelAsync('default', {
      name: 'default',
      importance: Notifications.AndroidImportance.MAX,
      vibrationPattern: [0, 250, 250, 250],
      lightColor: '#FF231F7C',
    });
  }

  return token;
}
