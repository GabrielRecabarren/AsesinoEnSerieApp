import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { PlayerAvatar } from '../PlayerAvatar/PlayerAvatar';

export const Mensaje = ({ mensaje, speakingAsRol }) => {
  return (
    <View style={styles.container}>
      <View style={styles.messageContainer}>
        <Text style={styles.text}>{mensaje.text}</Text>
      </View>
      <Text style={styles.senderName}>{mensaje.username}</Text>
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

