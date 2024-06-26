import React from 'react';
import { Pressable, Text, StyleSheet } from 'react-native';

const BotonAccion = ({ title, action }) => {
  return (
    <Pressable
      style={({ pressed }) => [
        styles.boton,
        {
          backgroundColor: pressed ? 'rgba(0, 0, 0, 0.5)' : 'rgba(206, 42, 226, 0.25)',
        },
      ]}
      onPress={action}
    >
      <Text style={styles.textoBoton}>Alo</Text>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  boton: {
    paddingVertical: 20,
    paddingHorizontal: 20,
    borderRadius: 20,
    elevation: 3,
    justifyContent: 'center',
    alignItems: 'center',
    maxHeight:40 ,
    marginVertical: 20,
  },
  textoBoton: {
    color: 'black',
    fontWeight: 'bold',
    textTransform: 'uppercase',
    fontSize: 13,
  },
});

export default BotonAccion;
