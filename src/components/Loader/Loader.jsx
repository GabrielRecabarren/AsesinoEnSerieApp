import React, { useRef, useEffect, useContext } from 'react';
import { View, Text, StyleSheet, Animated, Easing, Button } from 'react-native';
import { SocketContext } from '../../context/socketProvider';
import { UserContext } from '../../context/UserContext';
import { GameContext } from '../../context/GameContext';


const Loader = ({ visible }) => {
  const socketContext = useContext(SocketContext); // Obtener el contexto del socket
  const socket = socketContext.socket; // Obtener el socket del contexto
  const { userId } = useContext(UserContext);
  const { gameId } = useContext(GameContext);
  const rotation = useRef(new Animated.Value(0)).current;

  

  

  if (!visible) {
    return null; // Retorna null para ocultar el componente si visible es falso
  }
  //La victima confirma si está siendo asesinada.
  const confirmarMuerte = (y_n) => {
    if(y_n===true){
      socket.emit("confirmar-muerte", y_n, userId, gameId, ()=>{
        console.log("Muerte confirmada", userId);
        alert("Has sido asesinado");        
      });
    };
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
      <View >
        <Button title='Confirmar' style={{ zIndex: 2 }} onPress={()=>confirmarMuerte(true)}></Button>
        <Button title='No' color={"red"} style={{ zIndex: 2 }} onPress={() => confirmarMuerte(false)}></Button>

      </View>
    </View>

  );
};

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    top: '50%',
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
    top: -30, // Ajusta la posición vertical según sea necesario
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
});

export default Loader;
