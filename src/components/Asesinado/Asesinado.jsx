import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import AsesinatoFormulario from '../CartaDespedida/FormularioCarta';

const AsesinadoCartel = ({navigation}) => {
  return (
    <View style={styles.cartelContainer}>
      <Text style={styles.texto}>Asesinado</Text>
      <AsesinatoFormulario navigation={navigation}/>
    </View>
  );
};

const styles = StyleSheet.create({
  cartelContainer: {
    backgroundColor: 'purple',
    padding: 20,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },
  texto: {
    color: 'yellow',
    fontSize: 24,
    fontWeight: 'bold',
  },
});

export default AsesinadoCartel;
