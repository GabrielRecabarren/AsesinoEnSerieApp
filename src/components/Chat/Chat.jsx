import React, { useContext, useEffect, useRef, useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TextInput, Switch, KeyboardAvoidingView, Platform, Button, SafeAreaView, StatusBar } from 'react-native';
import { io } from 'socket.io-client';
import { Mensaje } from '../Mensaje/Mensaje';
import { UserContext } from '../../context/UserContext';
import { GameContext } from '../../context/GameContext';

const socketEndpoint = "http://localhost:3000";

const Chat = () => {
  const scrollViewRef = useRef(null); // Referencia para la ScrollView
  const { userData } = useContext(UserContext); // Asumiendo que tienes información del usuario actual disponible en el contexto
  const [socket, setSocket] = useState(null);
  const [messages, setMessages] = useState([]);
  const [inputMessage, setInputMessage] = useState('');
  const [speakingAsRole, setSpeakingAsRole] = useState(false);

  useEffect(function didMount() {
    const newSocket = io(socketEndpoint);
  
    newSocket.on('connect', () => console.log("Connected to server"));
    newSocket.on("disconnect", () => console.log("Disconnected from server"));
  
    newSocket.on("chat-message", (msg) => {
      console.log("Mensaje recibido:", msg); // Agregado para verificar la recepción de mensajes
      setMessages((prevMessages) => [...prevMessages, msg]);
      setInputMessage("")
    });
  
    setSocket(newSocket);
  
    return function didUnmount() {
      newSocket.disconnect();
      newSocket.removeAllListeners();
    };
  }, []);
  

  const handleSendMessage = () => {
    if (socket) {
      if (inputMessage.trim() !== '') {
        const prefix = speakingAsRole ? 'Rol' : 'Usuario';
        const message = `${prefix}: ${inputMessage}`;

        socket.emit('chat-message', message, (response) => {
          console.log(response);
          // Manejar la confirmación de que el mensaje fue enviado correctamente
          if (response.success) {
            // Actualizar el estado de los mensajes solo después de que el mensaje haya sido enviado correctamente
            setMessages((messages) => [...messages, message]);
            setInputMessage('');
          } else {
            console.warn("Error al enviar el mensaje:", response.error);
          }
        });
      } else {
        console.warn("No se puede enviar un mensaje vacío");
      }
    } else {
      console.error("Error: El socket no está disponible");
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar />
      <View style={styles.container}>
        <ScrollView style={styles.chatBox}
          ref={scrollViewRef}
          onContentSizeChange={() => scrollViewRef.current.scrollToEnd({ animated: true })}
        >
          {messages.map((message, index) => (
            <Mensaje key={index} mensaje={message} isSender={message.senderId === userData.id} />
          ))}
        </ScrollView>


        <View style={styles.inputContainer}>
          <TextInput
            style={styles.input}
            value={inputMessage}
            onChangeText={(text) => setInputMessage(text)}
            placeholder={`Escribe tu mensaje como ${speakingAsRole ? 'Rol' : 'Usuario'}...`}
            onSubmitEditing={handleSendMessage}
          />
          <Button title="Enviar" onPress={handleSendMessage} />
          <Switch
            value={speakingAsRole}
            onValueChange={() => setSpeakingAsRole(!speakingAsRole)}
          />
        </View>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  chatBox: {
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    width:"500px",
  },
  inputContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginVertical: 10,
    paddingHorizontal: 10,
    width: '100%',
  },
  input: {
    flex: 1,
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    borderRadius: 5,
    paddingLeft: 10,
    color: 'white',
  },
});

export default Chat;
