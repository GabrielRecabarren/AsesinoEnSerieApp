import React from 'react';
import { StyleSheet, Text, View, ImageBackground } from 'react-native';
import Chat from '../components/Chat/Chat';
import BotonAccion from '../components/BotonAccion/BotonAccion';

const ChatScreen = () => {
  return (
    <View style={styles.container}>
      <ImageBackground
        source={require("../img/fondo.png")}
        style={styles.imageBackground}
      >
        <View style={styles.botonesContainer}>
          <BotonAccion style={styles.tips} title={"Consejos Rol📕"} />
          <BotonAccion style={styles.perfil} title={"👤	"} action={() => console.log("Holanda")}/>
        </View>
        <Chat  />
        <View style={styles.botonesAcciones}>
          <BotonAccion style={styles.matar} title={"🔪"} />
          <BotonAccion style={styles.perfil} title={"📣	"} />
        </View>
      </ImageBackground>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: '100%',
  },
  imageBackground: {
    flex: 1,
    resizeMode: 'cover',
    justifyContent: 'flex-start',
    
  },
  botonesContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    
    width: '100%',
    padding: 20,
    zIndex: 1,
    
  },
  botonesAcciones: {
    alignItems: 'center',
    
    gap: 10,
    width: '15%',
    zIndex: 1,
  },
  matar: {
    backgroundColor: "red",
  },
  tips: {
    // Puedes ajustar los estilos específicos del botón si es necesario
  },
});

export default ChatScreen;
