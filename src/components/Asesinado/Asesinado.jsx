import { useState } from 'react';
import { View, Text, StyleSheet, Pressable } from 'react-native';
import AsesinatoFormulario from '../CartaDespedida/FormularioCarta';
import CartaDespedidaLibre from '../CartaDespedida/CartaDespedidaLibre';
import CuadroAyuda from '../CuadoAyuda/CuadroAyuda';
import { textosAyuda } from '../../../api/ayudaText';

const AsesinadoCartel = ({ navigation }) => {
  const [versionCarta, setVersionCarta] = useState(false);
  return (
    <View style={styles.cartelContainer}>
      <Text style={styles.texto}>Asesinado</Text>
      <CuadroAyuda
        text={textosAyuda.cartaDespedida} custom={versionCarta} />
      {
        versionCarta ?
          <CartaDespedidaLibre navigation={navigation} /> :
          <AsesinatoFormulario navigation={navigation} />
      }
      <Pressable
        onPress={() => setVersionCarta(!versionCarta)}
        style={styles.tipoCarta}>
        <Text style={{ fontSize: 15 }}>Cambiar a Carta Libre</Text>
        <Text style={{ fontSize: 8 }}>Para jugadores Avanzados</Text>

      </Pressable>
    </View>
  );
};

const styles = StyleSheet.create({
  cartelContainer: {
    flex: 1,
    backgroundColor: 'purple',
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },
  texto: {
    color: 'yellow',
    fontSize: 44,
    fontWeight: 'bold',
  },
  tipoCarta: {
    backgroundColor: "orange",
    margin: 15,
    padding: 7,
    borderRadius: 5,
  }
});

export default AsesinadoCartel;
