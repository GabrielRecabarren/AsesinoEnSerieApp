import React, { useEffect, useRef } from 'react';
import socketIOClient from 'socket.io-client';
import { Platform } from 'react-native';

// Constantes para identificar la plataforma
const ANDROID = 'android';
const IOS = 'ios';

// Función para determinar si la plataforma es iOS
const isIOS = () => Platform.OS === 'ios';

// URL del servidor de socket
const SOCKET_DEV = 'http://localhost:3000';

// Contexto del socket
export const SocketContext = React.createContext({ socket: null });

// Configuración de la conexión
const connectionConfig = {
  jsonp: false,
  reconnection: true,
  reconnectionDelay: 100,
  reconnectionAttempts: 100000,
  autoConnect:false,
  transports: ['websocket'],
  // Parámetros opcionales
  query: {
    source: 'auction:mobile',
    platform: isIOS() ? IOS : ANDROID,
  },
};

// Proveedor del socket
export const SocketProvider = ({ children }) => {
  const env = SOCKET_DEV;
  const socket = useRef(socketIOClient(env, connectionConfig));

  useEffect(() => {
    // Manejador de eventos de conexión
    socket.current.on('connect', () => {console.log("Me conecté io")});

    // Manejador de eventos de desconexión
    socket.current.on('disconnect', msg => {
      console.log('SocketIO: Desconexión', msg);
      // Reconectar el socket
      socket.current = socketIOClient(env, connectionConfig);
    });

    // Limpiar el socket al desmontar
    return () => {
      if (socket && socket.current) {
        socket.current.removeAllListeners();
        socket.current.close();
      }
    };
  }, [env]);

  // Proporcionar el contexto del socket a los componentes hijos
  return (
    <SocketContext.Provider value={{ socket: socket.current }}>
      {children}
    </SocketContext.Provider>
  );
};
