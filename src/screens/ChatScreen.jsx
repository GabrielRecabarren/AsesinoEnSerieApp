import React from 'react';
import { StyleSheet, Text, View, ImageBackground } from 'react-native';
import { Chat } from '../components/Chat/Chat';
import BotonAccion from '../components/BotonAccion/BotonAccion';

const ChatScreen = () => {
  return (
    <ImageBackground
      source={require("../img/fondo.png")}
      style={styles.imageBackground}
    >
      <View style={styles.botonesContainer}>
        <BotonAccion style={styles.tips} title={"Consejos Rol📕"} />
        <BotonAccion style={styles.perfil} title={"👤	"} />
      </View>
      <View style={styles.botonesAcciones}>
        <BotonAccion style={styles.matar} title={"🔪"} />
        <BotonAccion style={styles.perfil} title={"📣	"} />
      </View>
      <Chat />
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  imageBackground: {
    flex: 1,
    resizeMode: 'cover',
    justifyContent: 'center',
    alignItems: 'center',
  },
  botonesContainer: {
    position: 'absolute',
    top: 0,
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
    padding: 20,
    zIndex: 1, // Asegura que esté por encima de otros elementos
  },
  botonesAcciones: {
    
    position: 'absolute',
    top: "45%",
    right:0,
    justifyContent: 'space-around',
    alignItems:'center',
    gap:10,
    width: '15%',
    
    zIndex: 1, // Asegura que esté por encima de otros elementos
  },
  matar: {
    backgroundColor:"red"
    
  },
  tips: {
    // Puedes ajustar los estilos específicos del botón si es necesario
  },
});

export default ChatScreen;
