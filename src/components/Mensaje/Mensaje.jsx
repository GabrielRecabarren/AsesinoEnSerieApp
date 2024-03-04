import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { PlayerAvatar } from '../PlayerAvatar/PlayerAvatar';

export const Mensaje = ({ mensaje, isSender }) => {
  return (
    <View style={[styles.container, isSender ? styles.senderContainer : styles.receiverContainer]}>
      {!isSender && <PlayerAvatar namePlayer="Nombre del Remitente" rol={"Rol del Remitente"} />} {/* Si no eres el remitente, muestra el avatar del remitente */}
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
    flexDirection: 'row-reverse', // Invertir el orden de los elementos en el contenedor del remitente
    alignItems: 'flex-end', // Alinear los elementos del remitente en la parte inferior
  },
  receiverContainer: {
    flexDirection: 'row', // Mantener el orden de los elementos en el contenedor del receptor
    alignItems: 'flex-start', // Alinear los elementos del receptor en la parte superior
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
