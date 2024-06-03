import React, { useContext } from 'react';
import { View, Text, StyleSheet, Button } from 'react-native';
import { SocketContext } from '../../context/socketProvider';
import { UserContext } from '../../context/UserContext';
import { GameContext } from '../../context/GameContext';

const Increpar = ({ visible, onCloseModal }) => {
  const socketContext = useContext(SocketContext); // Obtener el contexto del socket
  const socket = socketContext.socket; // Obtener el socket del contexto
  const { userId } = useContext(UserContext);
  const { gameId } = useContext(GameContext);

  if (!visible) {
    return null; // Retorna null para ocultar el componente si visible es falso
  }

  const confirmarAccion = (confirmado) => {
    // Lógica para confirmar la acción
    console.log(`Acción ${confirmado ? 'confirmada' : 'rechazada'}`);
    const increparData = {userId, gameId}
    if(confirmado){
      socket.emit('increpar-confirmado', increparData)
    }
    // Aquí podrías enviar un evento al servidor o realizar alguna otra acción
    onCloseModal(); // Cerrar el modal
  };

  return (
    <View style={styles.bigContainer}>
      <View style={styles.container}>
        <View style={styles.warningContainer}>
          <Text style={styles.warningText}>¿Estás siendo increpad@?🤨</Text>
        </View>
        <View style={styles.rememberContainer}>
          <Text style={styles.rememberText}>Recuerda que deben ser al menos 3 jugador@s para increparte👀. Puedes defenderte y si logras convencer a 2/3 de los que te acusan, puedes rechazar el juicio❌. De lo contrario, debes mostrar tu carta rol🔍.</Text>
        </View>

        <View style={styles.buttonsContainer}>
          <Button
            title='MOSTRAR ROL'
            onPress={() => confirmarAccion(true)}
            color={'chartreuse'}

          />
          <View style={styles.spacer} />
          <Button
            title='RECHAZAR JUICIO'
            color={"red"}
            onPress={() => confirmarAccion(false)}
          />
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  bigContainer: {
    position: 'absolute',
    top: 50,
    width: 400,
    height: 500,
    backgroundColor: 'rgba(162, 40, 176, 0.3)',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 50,
  },
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 48,
    width: 380,
    height: 300,
    backgroundColor: 'rgba(164, 40, 176, 0.5)',
  },
  warningContainer: {
    position: 'absolute',
    top: -30, // Ajusta la posición vertical según sea necesario
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
    fontSize: 33,
  },
  rememberContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'rgba(162, 40, 176, 0.3)',
    padding: 20,
    textAlign: 'center',
    marginTop: 20,
  },
  rememberText: {
    color: 'yellow',
    fontSize: 20,
    paddingTop: 25
  },
  buttonsContainer: {
    flex: 0,
    flexDirection: 'row',
    gap: 10,
    justifyContent: 'center',
    alignItems: 'stretch',
  }
});

export default Increpar;
