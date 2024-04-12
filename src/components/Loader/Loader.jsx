import React, { useRef, useEffect, useContext } from 'react';
import { View, StyleSheet, Animated, Easing, Button } from 'react-native';
import { SocketContext } from '../../context/socketProvider';


const Loader = ({ visible }) => {
  const socketContext = useContext(SocketContext); // Obtener el contexto del socket
  const socket = socketContext.socket; // Obtener el socket del contexto
  const rotation = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    if (visible) {
      Animated.loop(
        Animated.timing(rotation, {
          toValue: 1,
          duration: 1200,
          easing: Easing.linear,
          useNativeDriver: true,
        })
      ).start();
    }
  }, [visible]);

  const rotateInterpolate = rotation.interpolate({
    inputRange: [0, 1],
    outputRange: ['0deg', '360deg'],
  });

  if (!visible) {
    return null; // Retorna null para ocultar el componente si visible es falso
  }
  const confirmarMuerte = () => {
    let y_n = true;
    socket.emit("confirmar-muerte", y_n,()=>{
      alert("Has sido asesinado");
      
    })
  }

  return (
    <View style={styles.container}>
      <Animated.View
        style={[
          styles.circle,
          styles.circle1,
          { transform: [{ rotate: rotateInterpolate }] },
        ]}
      />
      <View style={[styles.circle, styles.circle2]} />
      <View style={[styles.circle, styles.circle3]} />
      <View style={[styles.circle, styles.circle4]} />
      <View style={styles.border} />
      <View>
        <Button title='confirmar' style={{ zIndex: 2 }} onPress={confirmarMuerte}></Button>

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
    height: 96,
    width: 96,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#9b59b6',
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
