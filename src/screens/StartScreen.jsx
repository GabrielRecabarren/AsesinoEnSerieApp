import React, { useContext } from "react";
import { View, ImageBackground, StyleSheet, Pressable } from "react-native";
import { Card } from "../components/Card/Card";
import { CompraAsesino } from "../components/CompraAsesino/CompraAsesino";
import { crearPartida } from "../../api/api";
import { UserContext } from "../context/UserContext";
import { GameContext } from "../context/GameContext";
import Header from "../components/Header/Header";


export const StartScreen = ({ navigation }) => {
  //Traemos el contexto
  const { userData, userRol } = useContext(UserContext);
  const { create } = useContext(GameContext);


  //Creamos partida
  const handlingCrearPartida = async () => {
    const token = userData.data.token; //Obtenemos el token
    const userId = userData.data.user.id; //Obtenemos el userId.

    try {
      console.log("Creando partida");
      const gameData = {
        userId: userId,
        datosPartida: {
          state: "En Curso",
        },
      };
      
      const newGame = await crearPartida(gameData, token);
      await create(newGame);

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
      <Header navigation={navigation}/>
      <View style={styles.container}>
        <Pressable style={{ flex: 1 }} onPress={() => handlingCrearPartida()}>
          <Card text={"CREAR PARTIDA"} />
        </Pressable>
        <Pressable style={{ flex: 1 }} onPress={() => handlingStart(2)}>
          <Card text={"PARTIDA GUARDADA"} />
        </Pressable>
      </View>

      <CompraAsesino />
      
      
    </ImageBackground>
  );
};
const styles = StyleSheet.create({
  imageBackground: {
    flex: 1,
  },
  container: {
    flex: 1,
    flexDirection: "column",
    justifyContent: "space-between",
    alignItems: "center",
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
