import { useContext, useEffect, useState } from "react";
import {
  ImageBackground,
  Image,
  StyleSheet,
  View,
  Text,
  Button,
  ScrollView,
} from "react-native";
import { Picker } from "@react-native-picker/picker";
import { UserContext } from "../context/UserContext";
import { asignarUserRoleEnPartida } from "../../api/api";
import { GameContext } from "../context/GameContext";
import textosPorRol from "../../api/rolTexts";
import images from "../img/roles/rolesImgs";

const RolScreen = ({ navigation }) => {

  const { userToken, userId, elegirRol } = useContext(UserContext);
  const { gameId } = useContext(GameContext);
  const [rolElegido, setRolElegido] = useState("DEFAULT");
  const [imageUri, setImageUri] = useState("../img/roles/DEFAULT.png");



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
        <View style={{justifyContent:'center',alignItems:'center', width:'100%', height:'50%'}}>

        <Image 
          style={{
            flex: 1,
            width: 330,
            height: 200,
          }}
          resizeMode="contain"
          source={ images[rolElegido] }
          />
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
    height: 600,
    borderWidth: 3,
    justifyContent:'center',

  },
  leyenda: {
    flex: 1,

  },
  button: {
    width: "80%",
  },
});

export default RolScreen;
