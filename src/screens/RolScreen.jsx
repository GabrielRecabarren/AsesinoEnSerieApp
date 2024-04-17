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
import { asignarUserRoleEnPartida } from "../../api/api";
import { GameContext } from "../context/GameContext";


const RolScreen = ({ navigation }) => {

  const { userToken, userId, userRol, elegirRol } = useContext(UserContext);
  const { gameId } =useContext(GameContext); 

  const [rolElegido, setRolElegido] = useState("DEFAULT");

  const updateSelectedValue = (value) => {
    setRolElegido(value);
  };

  const irAlJuego = async () => {
    if (rolElegido === "DEFAULT") {
      alert("Debes elegir tu rol");
    } else {
      try {
        console.log(userId, gameId, rolElegido,"holas");
        await asignarUserRoleEnPartida(userId, gameId, rolElegido, userToken);
        elegirRol(rolElegido);
       
        navigation.navigate("Chat");
      } catch (error) {
        console.error(error);
        alert("Error al asignar el rol. Inténtalo de nuevo.");
      }
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
