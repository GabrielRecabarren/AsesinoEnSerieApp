import React, { useContext } from "react";
import { StyleSheet, Text, View, ImageBackground } from "react-native";
import Chat from "../components/Chat/Chat";
import BotonAccion from "../components/BotonAccion/BotonAccion";
import { UserContext } from "../context/UserContext";
import { consultarUserRoleEnPartida } from "../../api/api";
import { GameContext } from "../context/GameContext";

const ChatScreen = ({ navigation }) => {
  const { elegirRol, userToken, userId, userRol } = useContext(UserContext);
  const { gameId } = useContext(GameContext);
  //Manejamos Boton de  acciones en función del rol del usuario
  const handleRolAction = async (userRol) => {
    console.log(userRol);
    // const await consultarUserRoleEnPartida( userId, gameId, userToken )

    switch (userRol) {
      case "ASESINO":
        console.log("Asesino");
        break;
      case "PERIODISTA":
        console.log("Periodista");
        break;
      default:
        console.log("Rol no reconocido");
        break;
    }
  };
  // Manjeamos boton para salir de la partida
  const handleExitGame = () => {
    elegirRol("DEFAULT");
    alert("Saliendo del juego");
    navigation.navigate("Start");
  };
  return (
    <View style={styles.container}>
      <ImageBackground
        source={require("../img/fondo.png")}
        style={styles.imageBackground}
      >
        <View style={styles.botonesContainer}>
          <BotonAccion style={styles.tips} title={"Consejos Rol📕"} />
          <BotonAccion
            style={styles.perfil}
            title={"👤	"}
            action={() => navigation.navigate("Profile")}
          />
        </View>
        <View style={styles.chatContainer}>
          <Chat />
          <View style={styles.botonesAcciones}>
            <BotonAccion
              style={styles.matar}
              title={"🔪"}
              action={() => handleRolAction(userRol)}
            />
            <BotonAccion style={styles.perfil} title={"📣	"} />
            <BotonAccion
              style={styles.perfil}
              title={"Salir de la partida."}
              action={handleExitGame}
            />
          </View>
        </View>
      </ImageBackground>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: "100%",
    justifyContent: "center",
  },
  imageBackground: {
    flex: 1,
    resizeMode: "cover",
    justifyContent: "center",
  },
  chatContainer: {
    flex: 1,
    alignItems: "center", // Centrar contenido horizontalmente
  },
  botonesContainer: {
    flexDirection: "row",
    justifyContent: "space-around",

    width: "100%",
    padding: 20,
    zIndex: 1,
  },
  botonesAcciones: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",

    gap: 10,
    width: "15%",
    zIndex: 1,
  },
  matar: {
    backgroundColor: "red",
  },
  tips: {
    // Puedes ajustar los estilos específicos del botón si es necesario
  },
});

export default ChatScreen;
