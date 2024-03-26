import { useContext, useEffect, useState } from "react";
import {
  ImageBackground,
  Picker,
  StyleSheet,
  View,
  Text,
  Button,
} from "react-native";
import { UserContext } from "../context/UserContext";

const RolScreen = ({ navigation }) => {
  const { elegirRol } = useContext(UserContext);

  //Estado para guardar el rol elegido.
  const [rolElegido, setRolElegido] = useState("DEFAULT");

  useEffect(() => {
    // Configurar opciones de navegación para ocultar el header
    navigation.setOptions({
      header: () => null,
    });
  }, []);

  const updateSelectedValue = (value) => {
    console.log(value);
    setRolElegido(value);

  };

  //Manejamos el boton:
  const irAlJuego = () => {
    if (rolElegido === "DEFAULT") {
      alert("Debes elegir tu rol");
    } else {
      elegirRol(rolElegido);
      navigation.navigate("Chat");
    }
  };
  return (
    <ImageBackground
      source={require("../img/fondo.png")}
      style={styles.imageBackground}
    >
      <View style={styles.container}>
        <Picker
          selectedValue={rolElegido}
          onValueChange={(itemValue) => updateSelectedValue(itemValue)}
        >
          <Picker.Item label="Elige tu rol" value="undefined" />
          <Picker.Item label="DOCTOR" value="DOCTOR" />
          <Picker.Item label="DETECTIVE" value="DETECTIVE" />
          <Picker.Item label="FISCAL" value="FISCAL" />
          <Picker.Item label="MANIACO" value="MANIACO" />
          <Picker.Item label="PERIODISTA" value="PERIODISTA" />
          <Picker.Item label="COMPLICE" value="COMPLICE" />
          <Picker.Item label="ASESINO" value="ASESINO" />
        </Picker>
        <View style={styles.leyenda}>
          <Text>Aquí iría la descripción del rol elegido: {rolElegido}</Text>
        </View>
        <Button onPress={irAlJuego} title="Vamos al Juego!">
          Comencemos!
        </Button>
      </View>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  imageBackground: {
    flex: 1,
    resizeMode: "cover",
    justifyContent: "center",
  },
  container: {
    margin: 20,
    backgroundColor: "rgba(31, 38, 135, 0.37)",
    borderRadius: 20,
    padding: 20,
    height: 450,
    borderWidth: 3,
  },
  leyenda: {
    flex: 1,
    backgroundColor: "green",
  },
  button: {
    width: "80%",
  },
});
export default RolScreen;
