import React, { useContext, useEffect, useRef, useState } from 'react';
import { View, ScrollView, TextInput, Button, SafeAreaView, StatusBar, StyleSheet, Switch } from 'react-native';
import { SocketContext } from '../../context/socketProvider';
import { Mensaje } from '../Mensaje/Mensaje';
import { UserContext } from '../../context/UserContext';

const Chat = () => {
  const scrollViewRef = useRef(null);
  const socketContext = useContext(SocketContext); // Obtener el contexto del socket
  const socket = socketContext.socket; // Obtener el socket del contexto
  const {userData} = useContext(UserContext);
  const username = userData.data.user.username;
  const [messages, setMessages] = useState([]);
  const [inputMessage, setInputMessage] = useState('');
  const [speakingAsRole, setSpeakingAsRole] = useState(false);
  
  useEffect(() => {
    if (socket) {
      // Manejar eventos de socket
      socket.on('chat-message', (msg) => {
        

        if(msg.sender!=username){
          const message = { text: msg.text, sender: msg.sender, isReceiver:true}; // Objeto de mensaje completo que incluye el texto y el remitente
          console.log(message);
          setMessages((prevMessages) => [...prevMessages, message]);

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
    console.log(username, "username*");
    if (messages.length > 0) {
      scrollViewRef.current.scrollToEnd({ animated: true });
    }
  }, [messages]);

 
// Manejador para enviar mensajes
const handleSendMessage = () => {
  if (socket) {
    
    if (inputMessage.trim() !== '') {
      const message = { text: inputMessage, sender: username, isReceiver: false }; // Objeto de mensaje completo que incluye el texto y el remitente

      socket.emit('chat-message', { text: message.text, sender:username }, (res) => {
        
        if (res.success) {
          setMessages((prevMessages) => [...prevMessages, message]);
          setInputMessage("");
        } else {
          console.warn("Error al enviar el mensaje:", res.error);
        }
      });
    } else {
      console.warn("No se puede enviar un mensaje vacío");
    }
  } else {
    console.error("Error: El socket no está disponible");
  }
};

//Manejador de envio con tecla handleOnEnterPress
  const  handleOnEnterPress= e=>{
    if(e.nativeEvent.key == 'Enter'){
       handleSendMessage(); 

  }
 }



  return (
    <SafeAreaView style={styles.container}>
      <StatusBar />
      <View style={styles.container}>
        <ScrollView style={styles.chatBox} ref={scrollViewRef}>
          {messages.map((message, index) => (
            <Mensaje key={index} mensaje={message} speakingAsRole={speakingAsRole} />
          ))}
        </ScrollView>

        <View style={styles.inputContainer}>
          <TextInput
            style={styles.input}
            onChangeText={(text) => setInputMessage(text)}
            value={inputMessage}
            placeholder={`Escribe como ${speakingAsRole ? 'Rol' : username}...`}
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
