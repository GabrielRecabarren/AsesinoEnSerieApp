import React, { useContext, useEffect, useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TextInput,Switch, KeyboardAvoidingView, Platform, Button } from 'react-native';
import { io } from 'socket.io-client';
import { Mensaje } from '../Mensaje/Mensaje';
import { Evento } from '../Evento/Evento';
import BotonAccion from '../BotonAccion/BotonAccion';
import { invitarUsuariosALaPartida } from '../../../api/api';
import { UserContext } from '../../context/UserContext';
import { GameContext } from '../../context/GameContext';
// ... (importaciones y estilos)
const socketEndpoint = "http://localhost:3000";

const Chat = () => {
  const { gameId } = useContext(GameContext);
  const [socket, setSocket] = useState(null);
  const [messages, setMessages] = useState([]);
  const [inputMessage, setInputMessage] = useState('');
  const [invitedUserIds, setInvitedUserIds] = useState('');
  const [speakingAsRole, setSpeakingAsRole] = useState(false); // Cambiado a speakingAsRole
  const { userToken } = useContext(UserContext);

  //Estados socket.io
  const [hasConnection, setConnection] = useState(false);
  const [time, setTime] = useState(null);

  useEffect(function didMount() {
    console.log("Aqui deberia ir montando el socket")
    const newSocket = io(socketEndpoint);
    console.log(`Ahora deberiamos tener socket ${newSocket} ${socket}`)

    newSocket.on('connection', () => setConnection(true));
    newSocket.on("close", () => setConnection(false));

    newSocket.on("time-msg", (data) => {
      setTime(new Date(data.time).toString());
      

      newSocket.on("time-msg", (data) => {
        setTime(new Date(data.time).toString());
      });
      newSocket.on("chat-message", (msg) => {
        console.log(`Mensaje de chat recibido: ${msg}`);
        setMessages((prevMessages) => [...prevMessages, msg]);
      });
      setSocket(newSocket);

    });

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

        socket.emit('chat-message', message);
        setMessages((prevMessages) => [...prevMessages, message]);
        setInputMessage('');
      } else {
        console.warn("No se puede enviar un mensaje vacío");
      }
    } else {
      console.error("Error: El socket no está disponible");
    }
  };
  

  const handleInvitePlayers = async(gameId) => {
    console.log("Invitando players");
    const usersToInvite = invitedUserIds.split(',').map(id => parseInt(id.trim()));
    console.log(usersToInvite);
    const token = userToken;
    await invitarUsuariosALaPartida(usersToInvite,gameId, token);
  };

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
    >
      <View style={styles.container}>
        {!hasConnection && (
          <>
            <Text style={styles.paragraph}>
              Connecting to {socketEndpoint}...
            </Text>
            <Text style={styles.footnote}>
              Make sure the backend is started and reachable
            </Text>
          </>
        )}

        {hasConnection && (
          <>
            <Text style={[styles.paragraph, { fontWeight: "bold" }]}>
              Server time
            </Text>
            <Text style={styles.paragraph}>{time}</Text>
          </>
        )}
      </View>

      <View style={styles.chatBox}>
        <ScrollView>
          {/* Mapear cada mensaje para renderizarlos individualmente */}
          {messages.map((message, index) => (
            <Mensaje key={index} mensaje={message} />
          ))}
        </ScrollView>
        <View style={styles.inputContainer}>
      <TextInput
        style={styles.input}
        value={inputMessage}
        onChangeText={(text) => setInputMessage(text)}
        placeholder={`Escribe tu mensaje como ${speakingAsRole === 'user' ? 'Usuario' : 'Rol'}...`}
        onEndEditing={handleSendMessage}
      />
      <Button title="Enviar" onPress={handleSendMessage} />
      <Switch
  value={speakingAsRole} // Cambiado a speakingAsRole
  onValueChange={() => setSpeakingAsRole(!speakingAsRole)} // Cambiado a speakingAsRole
/>

    </View>
        <View style={styles.inputContainer}>
          <TextInput
            style={styles.input}
            value={invitedUserIds}
            onChangeText={(text) => setInvitedUserIds(text)}
            placeholder="IDs de usuarios a invitar (separados por comas)"
          />
          <Button title="Invitar Jugadores" onPress={()=>handleInvitePlayers(gameId)} />
        </View>
      </View>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    position: "absolute",
    height: "100%",
    width: "100%"
  }, paragraph: {
    fontSize: 26,
    color: "white"

  },
  footnote: {
    fontSize: 34,
    fontStyle: "italic",
    color: "white"
  },

  inputContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    color:'white',

    marginVertical: 10,
  },
  input: {
    flex: 1,
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    borderRadius: 5,
    paddingLeft: 10,
    color:'white'

  },
  chatBox: {
    flex: 1,
    width: '100%',  // Ajuste del ancho al máximo
    backgroundColor: 'rgba(0, 0, 0, 0.7)',
    borderRadius: 10,
    borderWidth: 1,
    borderColor: 'white',
    padding: 10,
    color:'white'
  },
});

export default Chat;
