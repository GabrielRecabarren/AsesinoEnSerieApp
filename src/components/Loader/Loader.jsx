import React, { useRef, useEffect, useContext } from 'react';
import { View, Text, StyleSheet, Animated, Easing, Button } from 'react-native';
import { SocketContext } from '../../context/socketProvider';
import { UserContext } from '../../context/UserContext';
import { GameContext } from '../../context/GameContext';
import textosPorRol from '../../../api/rolTexts';

const Loader = ({ visible, onCloseModal, actionData }) => {
  const socketContext = useContext(SocketContext); // Obtener el contexto del socket
  const socket = socketContext.socket; // Obtener el socket del contexto
  const { userId } = useContext(UserContext);
  const { gameId } = useContext(GameContext);





  if (!visible) {
    return null; // Retorna null para ocultar el componente si visible es falso
  }
  //La victima confirma si está siendo asesinada.
  const confirmarAccion = () => {
    if (y_n === true) {
      socket.emit("confirmar-muerte", userId, gameId, () => {
        console.log("Muerte confirmada", userId);
        alert("Has sido asesinado");
      });
    };
    if (y_n === false) {
      onCloseModal();
    }
  }

  return (
    <View style={styles.bigContainer}>
      <View style={styles.container}>
        <View style={styles.warningContainer}>
          <Text style={styles.warningText}>{textosPorRol[actionData.userRol].preguntaDestino}</Text>
        </View>
        <View style={styles.rememberContainer}>
          <Text style={styles.rememberText}>{textosPorRol[actionData.userRol].recordatorioDestino}</Text>
        </View>

        <Button title='CONFIRMAR' style={{ zIndex: 2 }} onPress={() => confirmarAccion(true)} />
        <Button title='RECHAZAR' color={"red"} style={{ zIndex: 2 }} onPress={() => confirmarAccion(false)} />
      </View>
    </View>

  );
};

const styles = StyleSheet.create({
  bigContainer: {
    position: 'absolute',
    width: 300,
    height: 450,
    backgroundColor: 'rgba( 162, 40, 176, 0.3 )',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 50,
  },
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 48,
    width: 250,
    height: 300,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'rgba( 164, 40, 176, 0.5 )',
  },
  warningContainer: {
    position: 'absolute',
    top: -20, // Ajusta la posición vertical según sea necesario
    backgroundColor: 'yellow',
    padding: 10,
    borderRadius: 5,
    zIndex: 1,
    alignItems: 'center',
  justifyContent: 'center',
  },
  warningText: {
    color: 'red',
    fontWeight: 'bold',
    fontSize: 36,
  },
  rememberText: {
    color: 'yellow',
    fontSize: 24,
  },
  rememberContainer: {
    alignItems: 'center',
  justifyContent: 'center',
  backgroundColor: 'rgba( 162, 40, 176, 0.3 )',
  padding: 10,
  textAlign: 'center',
  }
});

export default Loader;
