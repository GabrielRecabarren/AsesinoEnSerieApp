import React, { useContext } from "react";
import { View, ImageBackground, StyleSheet, Pressable } from "react-native";
import { Card } from "../components/Card/Card";
import { CompraAsesino } from "../components/CompraAsesino/CompraAsesino";
import { crearPartida } from "../../api/api";
import { UserContext } from "../context/UserContext";
import { GameContext } from "../context/GameContext";
import BotonAccion from "../components/BotonAccion/BotonAccion";

import InfoModal from "../components/Modal/Modal";

export const StartScreen = ({ navigation }) => {
  //Traemos el contexto
  const { userData } = useContext(UserContext);
  const { create } = useContext(GameContext);

  //Creamos partida
  const handlingCrearPartida = async () => {
    const token = userData.data.token; //Obtenemos el token
    console.log(token);
    const userId = userData.data.user.id; //Obtenemos el userId.
    console.log(`Fuckin token: ${token}, and the mdfukin userId: ${userId}`);

    try {
      console.log("Creando partida");
      const gameData = {
        userId: userId,
        datosPartida: {
          state: "En Curso",
        },
      };
      console.log(`Datos Enviados: ${JSON.stringify(gameData)}`);
      console.log(`Creando Partida...`);
      const newGame = await crearPartida(gameData, token);
      console.log(`Partida Creada`);
      await create(newGame);
      console.log(`Partida Guardada: ${JSON.stringify(newGame)}`);

      navigation.navigate("Create");
    } catch (error) {
      console.log(`Error creando la partida: ${error}`);
    }
  };

  const handlingStart = (option) => {
    switch (option) {
      case 1:
        navigation.navigate("Create");

        break;
      case 2:
        navigation.navigate("Load");
        break;
    }
  };
  return (
    <ImageBackground
      source={require("../img/fondo.png")}
      style={styles.imageBackground}
    >
      <InfoModal/>
      <View style={styles.container}>
        <Pressable style={{ flex: 1 }} onPress={() => handlingCrearPartida()}>
          <Card text={"CREAR PARTIDA"} />
        </Pressable>
        <Pressable style={{ flex: 1 }} onPress={() => handlingStart(2)}>
          <Card text={"PARTIDA GUARDADA"} />
        </Pressable>
      </View>

      <CompraAsesino />
      <View style={styles.profileContainer}>
        <BotonAccion style={styles.perfil} title={"👤"} action={() => navigation.navigate("Profile")} />
      </View>
      
    </ImageBackground>
  );
};
const styles = StyleSheet.create({
  imageBackground: {
    flex: 1,
  },
  profileContainer: {
    position: "absolute", // Ajusta el posicionamiento
    top: 0, // Alinea el contenedor en la parte superior
    right: 0, // Alinea el contenedor en el lado derecho
    padding: 10, // Añade espacio alrededor del botón de perfil
    zIndex:1
  },
  container: {
    flex: 1,
    flexDirection: "column",
    justifyContent: "space-between",
    borderRadius: 20,
    margin: 50,
    backgroundColor: "rgba(31, 38, 135, 0.37)",
    padding: 40,
    height: 500,
    borderWidth: 3,
    borderColor: "rgba(32, 25, 255, 0.18)",
    zIndex: 0,
  },
});
export default StartScreen;
