import React, { useContext, useEffect, useState } from "react";
import { StyleSheet, Text, View, ImageBackground } from "react-native";
import Chat from "../components/Chat/Chat";
import BotonAccion from "../components/BotonAccion/BotonAccion";
import AccionModal from "../components/Modal/RolActionModal";
import { UserContext } from "../context/UserContext";
import { GameContext } from "../context/GameContext";
import { SocketContext } from "../context/socketProvider";
import Loader from "../components/Loader/Loader";
import AsesinadoCartel from "../components/Asesinado/Asesinado";
import Header from "../components/Header/Header";
import CartaRolModal from "../components/Modal/CartaRolModal";

const ChatScreen = ({ navigation }) => {
  const [loaderVisible, setLoaderVisible] = useState(false);
  const [rolAction, setRolAction] = useState(null);
  const { elegirRol, userId, userRol } = useContext(UserContext);
  const [asesinados, setAsesinados] = useState([]);

  
  const { gamePlayers, gameId, asesinado, usuarioAsesinado } = useContext(GameContext);
  const socketContext = useContext(SocketContext); // Obtener el contexto del socket
  const socket = socketContext.socket; // Obtener el socket del contexto

  useEffect(() => {
    socket.connect();
    //Intentando enviar datos del usuario para mensajes especificos:
    socket.emit("canal-privado", userId);
    socket.emit("join-game", gameId, userId);
  })
  //UseEffect para escuchar las acciones del rol
  useEffect(() => {
    console.log(gamePlayers, "GamePlayers");
    if (socket) {
      socket.on("action-rol", (actionData) => {
        console.log(actionData, "actionData recibido")
        handleRolAction(actionData);
      });

      socket.on("asesinato", () => {
        alert("Moriste");
        setLoaderVisible(false);
        setAsesinados(prevAsesinados => [...prevAsesinados, userId]);
        usuarioAsesinado();
        navigation.navigate("")
      }
      );
    };
  }, [socket]);
  useEffect(() => {
    console.log(asesinados, "asesinados actualizados");
  }, [asesinados]);


  //Manejamos el action rol
  const handleRolAction = (actionData) => {
    const {userRol} = actionData;
    console.log(userRol, actionData, "handlerolAction");
    setLoaderVisible(true);
    setRolAction(userRol);

  }
  const handleCloseModal = () => {

    setLoaderVisible(false);
  };



  // Manjeamos boton para salir de la partida
  const handleExitGame = () => {
    elegirRol("DEFAULT");
    socket.disconnect();
    alert("Saliendo del juego");
    navigation.navigate("Start");
  };
  return (
    <View style={styles.container}>
      <ImageBackground
        source={require("../img/fondo.png")}
        style={styles.imageBackground}
      >
        <Header navigation={navigation} />

        <View style={styles.botonesContainer}>
          <BotonAccion style={styles.tips} title={"Consejos Rol📕"} />


        </View>
        <View style={styles.chatContainer}>
          {asesinado ? <AsesinadoCartel navigation={navigation} /> : <Chat />}
          <Loader visible={loaderVisible} rolAction={rolAction} style={{ zIndex: 10 }} onCloseModal={handleCloseModal} />
          <View style={styles.botonesAcciones}>
            <AccionModal />
            <CartaRolModal userRol={userRol} />

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
    justifyContent: "space-between",

    gap: 15,
    width: 300,
    zIndex: 1,
  },


});

export default ChatScreen;
