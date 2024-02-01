import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { PlayerAvatar } from '../PlayerAvatar/PlayerAvatar';

export const Mensaje = ({ mensaje, active }) => {
  // Verificar si 'name' está definido antes de intentar acceder a él
  const playerName = active?.name || 'Usuario';

  return (
    <View style={styles.container}>
      <Text style={styles.text}>{mensaje}</Text>
      <PlayerAvatar namePlayer={playerName} rol={"Asesino"} rolActive={active} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    alignItems: 'center',
    gap: 25,
  },
  text: {
    flex: 1,
    flexWrap: 'wrap',
    maxWidth: '70%', // Ajusta el ancho máximo según tu preferencia
    color: 'white',
  },
});
