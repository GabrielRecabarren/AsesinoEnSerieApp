import React from 'react';
import { Pressable, Text, StyleSheet } from 'react-native';

const BotonAccion = ({ title }) => {
  return (
    <Pressable
      style={({ pressed }) => [
        styles.boton,
        {
          backgroundColor: pressed ? 'rgba(0, 0, 0, 0.5)' : 'rgba(206, 42, 226, 0.25)',
        },
      ]}
      onPress={() => console.log('Hola')}
    >
      <Text style={styles.textoBoton}>{title}</Text>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  boton: {
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 20,
    elevation: 3,
    justifyContent: 'center',
    alignItems: 'center',
  },
  textoBoton: {
    color: 'white',
    fontWeight: 'bold',
    textTransform: 'uppercase',
  },
});

export default BotonAccion;
