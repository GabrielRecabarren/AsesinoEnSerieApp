import { useContext, useEffect, useState } from "react";
import {
  ImageBackground,
  Picker,
  StyleSheet,
  View,
  Text,
  Button,
  ScrollView,
} from "react-native";
import { UserContext } from "../context/UserContext";
import { asignarUserRoleEnPartida } from "../../api/api";
import { GameContext } from "../context/GameContext";
import textosPorRol from "../../api/rolTexts";

const RolScreen = ({ navigation }) => {

  const { userToken, userId, userRol, elegirRol } = useContext(UserContext);
  const { gameId } = useContext(GameContext);

  const [rolElegido, setRolElegido] = useState("DEFAULT");

  const updateSelectedValue = (value) => {
    setRolElegido(value);
  };

  const irAlJuego = async () => {
    if (rolElegido === "DEFAULT") {
      alert("Debes elegir tu rol");
    } else {
      try {
        console.log(userId, gameId, rolElegido, "holas");
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
          style={{ backgroundColor: 'purple', color: 'yellow' }}
          itemStyle={{ color: "yellow" }}
        >
          <Picker.Item label="Elige tu rol" value="DEFAULT" />
          <Picker.Item label="MÉDICO" value="MEDICO" />
          <Picker.Item label="DETECTIVE" value="DETECTIVE" />
          <Picker.Item label="FISCAL" value="FISCAL" />
          <Picker.Item label="MANIACO" value="MANIACO" />
          <Picker.Item label="PERIODISTA" value="PERIODISTA" />
          <Picker.Item label="VÍCTIMA" value="VICTIMA" />
          <Picker.Item label="CÓMPLICE" value="COMPLICE" />
          <Picker.Item label="ASESINO" value="ASESINO" />
        </Picker>
        

          <ScrollView style={styles.leyenda}>
            <Text
              style={{
                color: "yellow",
                fontSize: 18,
                fontWeight: 'bold',
                margin: 10
              }}>
              {textosPorRol[rolElegido].instrucciones}
            </Text>
          </ScrollView>
          <ImageBackground
        style={{
          width: 330,
          height: 200,
          resizeMode: 'cover'
        }}
        source={rolElegido =="DEFAULT" ? "" : require(`../img/roles/${rolElegido}.png`)}
        >
        </ImageBackground>
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

  },
  button: {
    width: "80%",
  },
});

export default RolScreen;
