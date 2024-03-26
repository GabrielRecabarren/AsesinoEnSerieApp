import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { PlayerAvatar } from '../PlayerAvatar/PlayerAvatar';

export const Mensaje = ({ mensaje }) => {
  const { text, sender, isReceiver, speakingAsRole, role } = mensaje;

  return (
    <View style={[styles.container, isReceiver ? styles.receiverContainer : styles.senderContainer]}>
      {isReceiver ? (
        <>
          <PlayerAvatar namePlayer={sender} />
          <View style={[styles.messageContainer, styles.receiverMessageContainer]}>
            <Text style={[styles.text, styles.receiverText]}>{text}</Text>
          </View>
        </>
      ) : (
        <>
          <View style={[styles.messageContainer, styles.senderMessageContainer]}>
            <Text style={[styles.text, styles.senderText]}>{text}</Text>
          </View>
          <PlayerAvatar namePlayer={speakingAsRole ? role : sender} />
        </>
      )}
      <Text style={[styles.senderName, !isReceiver ? styles.receiverText : styles.senderText]}>{sender}</Text>
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

