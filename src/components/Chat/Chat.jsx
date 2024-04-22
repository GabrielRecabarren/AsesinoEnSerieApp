import React, { useContext, useEffect, useRef, useState } from 'react';
import { View, ScrollView, TextInput, Button, SafeAreaView, StatusBar, StyleSheet, Switch } from 'react-native';
import { SocketContext } from '../../context/socketProvider';
import { Mensaje } from '../Mensaje/Mensaje';
import { UserContext } from '../../context/UserContext';
import { GameContext } from '../../context/GameContext';
import { crearMensajeEnPartida, obtenerMensajesPorPartida, eliminarMensajePorId } from '../../../api/api';

const Chat = () => {
  const scrollViewRef = useRef(null);
  const socketContext = useContext(SocketContext); // Obtener el contexto del socket
  const socket = socketContext.socket; // Obtener el socket del contexto
  const { userData, userRol, userToken, userId } = useContext(UserContext);
  const { gameId } = useContext(GameContext);
  const username = userData.data.user.username;
  const role = userRol;
  const [messages, setMessages] = useState([]);
  const [inputMessage, setInputMessage] = useState('');
  const [speakingAsRole, setSpeakingAsRole] = useState(false);



  useEffect(() => {
    // Cargar mensajes al montar el componente
    cargarMensajes();
  }, []);

  useEffect(() => {
    if (socket) {

      // Manejar eventos de socket      
      socket.on('chat-message', (msg) => {

        if (msg.sender != username) {
          const modifiedMessage = { ...msg, isReceiver: true };

          console.log(modifiedMessage);
          setMessages((prevMessages) => [...prevMessages, modifiedMessage]);

        }

      });
    }
    return () => {
      // Limpiar los listeners si es necesario
      if (socket) {
        socket.removeAllListeners('chat-message');
      }
    };
  }, [socket]);

  useEffect(() => {
    if (messages.length > 0) {
      scrollViewRef.current.scrollToEnd({ animated: true });
    }
  }, [messages]);

  const cargarMensajes = async () => {
    try {
      const mensajes = await obtenerMensajesPorPartida(gameId, userToken); // Obtener mensajes de la partida
      console.log(mensajes);
  
      // Modificar las propiedades de los mensajes antes de establecerlos en el estado local
      const mensajesModificados = mensajes.map(mensaje => {
        // Verificar si el sender del mensaje es igual al username del estado del componente
        const isReceiver = mensaje.sender != username;
  
        // Devolver el mensaje modificado
        return {
          ...mensaje,
          isReceiver: isReceiver
        };
      });
  
      // Actualizar los mensajes en el estado local
      setMessages(mensajesModificados);
    } catch (error) {
      console.error('Error al cargar mensajes:', error);
    }
  };
  

  // Manejador para enviar mensajes
  const handleSendMessage = async () => {
    if (inputMessage.trim() !== '') {
      try {
        
        // Enviar el mensaje a través del socket
        const message = {
          text: inputMessage,
          sender: username,
          isReceiver: false,
          speakingAsRole,
          userId,
          gameId,
          role,
          
        };
        // Crear el mensaje en la base de datos
        const nuevoMensaje = await crearMensajeEnPartida(message, userToken);
        
        console.log(nuevoMensaje,"nuevoMensaje");//Emitir al socket
        socket.emit('chat-message', message, gameId, (res) => {
          if (res.success) {
            setInputMessage("");
          } else {
            console.warn("Error al enviar el mensaje:", res.error);
          }
        });

        // Actualizar los mensajes en el estado local
        setMessages((prevMessages) => [...prevMessages, message]);
      } catch (error) {
        console.error("Error al enviar el mensaje:", error);
      }
    } else {
      console.warn("No se puede enviar un mensaje vacío");
    }
  };

  //Manejador de envio con tecla handleOnEnterPress
  const handleOnEnterPress = e => {
    if (e.nativeEvent.key == 'Enter') {
      handleSendMessage();

    }
  }



  return (
    <SafeAreaView style={styles.container}>
      <StatusBar />
      <View style={styles.container}>
        <ScrollView style={styles.chatBox} ref={scrollViewRef}>
          {messages.map((message, index) => (
            <Mensaje key={index} mensaje={message} />
          ))}
        </ScrollView>

        <View style={styles.inputContainer}>
          <TextInput
            style={styles.input}
            onChangeText={(text) => setInputMessage(text)}
            value={inputMessage}
            placeholder={`Escribe como ${speakingAsRole ? role : username}...`}
            onKeyPress={handleOnEnterPress}
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
    width: '100%',
    height: '60%',
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 10,
    paddingHorizontal: 10,
  },
  input: {
    flex: 1,
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    borderRadius: 5,
    paddingLeft: 10,
    paddingRight: 10,
    color: 'white',
    marginRight: 10,
  },
});

export default Chat;
