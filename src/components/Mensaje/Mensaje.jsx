import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { PlayerAvatar } from '../PlayerAvatar/PlayerAvatar';

export const Mensaje = ({ mensaje }) => {
  console.log( "*sender dentro de Mensaje")
  const isReceiver = mensaje.isReceiver;
  return (
    <View style={[styles.container, isReceiver ? styles.receiverContainer : styles.senderContainer]}>
      {isReceiver ? (
        <>
          <PlayerAvatar namePlayer={mensaje.sender}></PlayerAvatar>
          <View style={[styles.messageContainer, styles.receiverMessageContainer]}>
            <Text style={[styles.text, styles.receiverText]}>{mensaje.text}</Text>
          </View>
        </>
      ) : (
        <>
          <View style={[styles.messageContainer, styles.senderMessageContainer]}>
            <Text style={[styles.text, styles.senderText]}>{mensaje.text}</Text>
          </View>
          <PlayerAvatar namePlayer={mensaje.sender}></PlayerAvatar>
        </>
      )}
      <Text style={[styles.senderName, !isReceiver ? styles.receiverText : styles.senderText]}>{mensaje.username}</Text>
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
    backgroundColor:'green'
  },
  receiverContainer: {
    justifyContent: 'flex-start',
    backgroundColor: 'purple'
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
    color: 'red',
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

