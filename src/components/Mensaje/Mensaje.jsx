import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { PlayerAvatar } from '../PlayerAvatar/PlayerAvatar';

export const Mensaje = ({ mensaje, isSender }) => {
  return (
    <View style={[styles.container, isSender ? styles.senderContainer : styles.receiverContainer]}>
      <Text style={[styles.text, isSender ? styles.senderText : styles.receiverText]}>{mensaje}</Text>
      {isSender && <PlayerAvatar namePlayer="Tu Nombre" rol={"Tu Rol"} />} {/* Si eres el remitente, muestra tu avatar */}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  senderContainer: {
    justifyContent: 'flex-end',
  },
  receiverContainer: {
    justifyContent: 'flex-start',
  },
  text: {
    flex: 1,
    flexWrap: 'wrap',
    maxWidth: '70%',
    padding: 10,
    borderRadius: 10,
    color: 'white',
  },
  senderText: {
    backgroundColor: '#DCF8C5', // Color de fondo para mensajes enviados
  },
  receiverText: {
    backgroundColor: '#E5E5EA', // Color de fondo para mensajes recibidos
  },
});
