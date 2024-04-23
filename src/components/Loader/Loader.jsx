import React, { useRef, useEffect, useContext } from 'react';
import { View, Text, StyleSheet, Animated, Easing, Button } from 'react-native';
import { SocketContext } from '../../context/socketProvider';
import { UserContext } from '../../context/UserContext';
import { GameContext } from '../../context/GameContext';


const Loader = ({ visible, onCloseModal }) => {
  const socketContext = useContext(SocketContext); // Obtener el contexto del socket
  const socket = socketContext.socket; // Obtener el socket del contexto
  const { userId } = useContext(UserContext);
  const { gameId } = useContext(GameContext);

  

  

  if (!visible) {
    return null; // Retorna null para ocultar el componente si visible es falso
  }
  //La victima confirma si está siendo asesinada.
  const confirmarAccion = () => {
    if(y_n===true){
      socket.emit("confirmar-muerte", userId, gameId, ()=>{
        console.log("Muerte confirmada", userId);
        alert("Has sido asesinado");        
      });
    };
    if(y_n===false){
      onCloseModal();
    }
  }

  return (
    <View style={styles.container}>
       <View style={styles.warningContainer}>
        <Text style={styles.warningText}>¿Te están asesinando?</Text>
      </View>
      <View
        style={[
          styles.circle,
          styles.circle1
        ]}
      />
      <View style={[styles.circle, styles.circle2]} />
      <View style={[styles.circle, styles.circle3]} />
      <View style={[styles.circle, styles.circle4]} />
      <View style={styles.border} />
      <Text style={styles.rememberText} >*Recuerda que si el Asesino NO está con su cómplice, NO PUEDE MATARTE.</Text>
      <View >
        <Button title='Confirmar' style={{ zIndex: 2 }} onPress={()=>confirmarAccion(true)}></Button>
        <Button title='No' color={"red"} style={{ zIndex: 2 }} onPress={() => confirmarAccion(false)}></Button>

      </View>
    </View>

  );
};

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    top: '40%',
    left: '50%',
    transform: [{ translateX: -48 }, { translateY: -48 }],
    borderRadius: 48,
    height: 196,
    width: 196,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#9b59b6',
  },
  warningContainer: {
    position: 'absolute',
    top: -20, // Ajusta la posición vertical según sea necesario
    backgroundColor: 'yellow',
    padding: 10,
    borderRadius: 5,
    zIndex: 1, // Asegura que el cartel esté encima de los círculos
  },
  warningText: {
    color: 'red',
    fontWeight: 'bold',
    fontSize: 16,
  },
  circle: {
    position: 'absolute',
    borderRadius: 48,
    height: 96,
    width: 96,
    backgroundColor: '#9b59b6',
  },
  circle1: {
    opacity: 0.7,
  },
  circle2: {
    opacity: 0.5,
  },
  circle3: {
    opacity: 0.3,
  },
  circle4: {
    opacity: 0.1,
  },
  border: {
    position: 'absolute',
    top: 10,
    left: 10,
    right: 10,
    bottom: 10,
    backgroundColor: '#fff',
    borderWidth: 5,
    borderColor: '#ffffff',
    borderRadius: 48,
  },
  rememberText: {
    color: 'blue', // Hace que el texto sea amarillo
    fontSize: 18, // Ajusta el tamaño de la fuente según sea necesario
    fontWeight: 'bold', // Hace que el texto sea más gordo
  }
});

export default Loader;
