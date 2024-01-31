

import React, { useEffect, useState } from 'react';
import { View, StyleSheet, ScrollView, TextInput, KeyboardAvoidingView, Platform } from 'react-native';
import io from 'socket.io-client';
import { Mensaje } from '../Mensaje/Mensaje';
import { Evento } from '../Evento/Evento';
import BotonAccion from '../BotonAccion/BotonAccion';

const Chat = () => {
  const [socket, setSocket] = useState(null);
  const [messages, setMessages] = useState([]);
  const [inputMessage, setInputMessage] = useState('');

  useEffect(() => {
    console.log(`UE Chats`)
    // Conectar al servidor de Socket.io
    const socketConnection = io('192.168.1.87:3000');
  
    console.log(`hola`);
    socketConnection.on('connect', () => {
      console.log('Conectado al servidor de Socket.io');
    });
    
  
    socketConnection.on('disconnect', () => {
      console.log('Desconectado del servidor de Socket.io');
    });
  
    socketConnection.on('error', (error) => {
      console.error('Error de conexión con el servidor de Socket.io:', error);
    });
    socketConnection.on('chat message', (msg) => {
      // Recibir mensajes del servidor
      console.log('Mensaje recibido del servidor:', msg);
  
      setMessages((prevMessages) => [...prevMessages, msg]);
    });
  
    setSocket(socketConnection);
  
    console.log("Fin UE");
  
    return () => {
      // Desconectar al desmontar el componente
      socketConnection.disconnect();
    };
  
  }, []);
  

  const handleSendMessage = () => {
    // Enviar mensaje al servidor
    socket.emit('chat message', inputMessage);
  
    // Limpiar el cuadro de entrada después de enviar el mensaje
    setInputMessage('');
  };

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
    >
      <View style={styles.chatBox}>
        <View style={styles.upperArea}>
          <ScrollView>
            {/* Renderizar mensajes */}
            {messages.map((message, index) => (
              <Mensaje key={index} mensaje={message} />
            ))}
          </ScrollView>
        </View>
        <View style={styles.botonesContainer}>
          <BotonAccion style={styles.tips} title={'Rol'} />
          <BotonAccion style={styles.perfil} title={'Usuario'} />
        </View>
        <TextInput
          style={styles.lowerArea}
          value={inputMessage}
          onChangeText={(text) => setInputMessage(text)}
          placeholder="Escribe tu mensaje..."
          onEndEditing={handleSendMessage}
        />
      </View>
    </KeyboardAvoidingView>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
  },
  chatBox: {
    backgroundColor: 'rgba(0, 0, 0, 0.7)',
    width: '75%',
    height: '75%',
    borderRadius: 10,
    borderWidth: 1,
    borderColor: 'white',
    overflow: 'hidden', // Para asegurar que los bordes redondeados funcionen correctamente
  },
  botonesContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 20,
    zIndex: 1, // Asegura que esté por encima de otros elementos
  },
  upperArea: {
    flex: 3, // Ocupa 3/5 de la caja
    backgroundColor: 'rgba(255, 255, 255, 0.9)', // Blanco transparente
    margin: 10,
    borderRadius: 10,
    padding: 10,
  },
  lowerArea: {
    flex: 1, // Ocupa 1/5 de la caja
    backgroundColor: 'rgba(255, 255, 255, 0.7)', // Blanco transparente (ajustado para mayor visibilidad)
    margin: 10,
    borderRadius: 10,
    padding: 10,
    borderWidth: 1,
    borderColor: 'white', // Borde blanco para resaltar el área
  },
});


export default Chat;

