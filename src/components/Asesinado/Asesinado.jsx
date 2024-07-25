import { useState } from 'react';
import { View, Text, StyleSheet, Pressable } from 'react-native';
import AsesinatoFormulario from '../CartaDespedida/FormularioCarta';
import CartaDespedidaLibre from '../CartaDespedida/CartaDespedidaLibre';
import CuadroAyuda from '../CuadoAyuda/CuadroAyuda';
import { textosAyuda } from '../../../api/ayudaText';
import { Icon } from '@rneui/themed';

const AsesinadoCartel = ({ navigation }) => {
  const [versionCarta, setVersionCarta] = useState(false);
  return (
    <View style={styles.cartelContainer}>
      <Text style={styles.texto}>Asesinado
        <Icon
          
          color="red"
          name={"highlight-off"}
          size={35}

        />
      </Text>
      <CuadroAyuda
        text={textosAyuda.cartaDespedida} custom={versionCarta} />
        <Text style={{color:'yellow', marginTop:45, padding:10}}>*Si has sido increpado/a utiliza el formulario Carta Libre (Boton al final de la pantalla)</Text>
      {
        versionCarta ?
          <CartaDespedidaLibre navigation={navigation} /> :
          <AsesinatoFormulario navigation={navigation} />
      }
      <Pressable
        onPress={() => setVersionCarta(!versionCarta)}
        style={styles.tipoCarta}>
        <Text style={{ fontSize: 16 }}>{!versionCarta ? "Cambiar a Carta Libre" : "Cambiar a Carta Básica"} </Text>
        <Text style={{ fontSize: 12 }}>{!versionCarta ? "Para jugadores Avanzados." : "Para todo jugador."}</Text>

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
    paddingBottom: 15
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
