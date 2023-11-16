import { PlayerAvatar } from '../PlayerAvatar/PlayerAvatar';
import { View, Text, StyleSheet } from 'react-native';

export const Mensaje = ({ mensaje, active }) => {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>{mensaje}</Text>
      <PlayerAvatar namePlayer={"Roberto"} rol={"Asesino"} rolActive={active} />
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
  },
});
