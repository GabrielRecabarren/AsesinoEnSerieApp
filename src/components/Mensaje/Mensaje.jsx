import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { PlayerAvatar } from '../PlayerAvatar/PlayerAvatar';

export const Mensaje = ({ mensaje, isSender }) => {
  return (
    <View style={[styles.container, isSender ? styles.senderContainer : styles.receiverContainer]}>
      {isSender && <PlayerAvatar namePlayer="Tu Nombre" rol={"Tu Rol"} style={styles.avatar} />}
      <View style={[styles.messageContainer, isSender ? styles.senderMessageContainer : styles.receiverMessageContainer]}>
        <Text style={[styles.text, isSender ? styles.senderText : styles.receiverText]}>{mensaje.text}</Text>
      </View>
      {!isSender && <PlayerAvatar namePlayer="Nombre del Remitente" rol={"Rol del Remitente"} style={styles.avatar} />}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginBottom: 10,
  },
  senderContainer: {
    justifyContent: 'flex-end',
  },
  receiverContainer: {
    justifyContent: 'flex-start',
  },
  messageContainer: {
    maxWidth: '70%',
    borderRadius: 10,
    padding: 10,
    marginBottom: 5,
  },
  senderMessageContainer: {
    backgroundColor: '#DCF8C5',
    borderTopRightRadius: 0,
  },
  receiverMessageContainer: {
    backgroundColor: '#E5E5EA',
    borderTopLeftRadius: 0,
  },
  text: {
    color: 'white',
  },
  senderText: {
    textAlign: 'right',
  },
  receiverText: {
    textAlign: 'left',
  },
  avatar: {
    marginHorizontal: 5,
  },
});

