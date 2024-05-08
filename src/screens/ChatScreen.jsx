import React, { useContext, useEffect, useState } from "react";
import { StyleSheet, Text, View, ImageBackground, Button, Alert } from "react-native";
import Chat from "../components/Chat/Chat";
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
  const [rolActionData, setRolActionData] = useState(null);
  const { elegirRol, userId, userRol } = useContext(UserContext);
  const [asesinados, setAsesinados] = useState([]);


  const {  gameId, asesinado, usuarioAsesinado } = useContext(GameContext);
  const { socket } = useContext(SocketContext); // Obtener el contexto del socket

  useEffect(() => {
    console.log("socket");
    socket.connect();
    //Intentando enviar datos del usuario para mensajes especificos:
    socket.emit("canal-privado", userId);
    socket.emit("join-game", gameId, userId);
  })
  //UseEffect para escuchar las acciones del rol
  useEffect(() => {
    if (socket) {
      socket.on("action-rol", (actionData) => {
        console.log(actionData, "actionData recibido");
        setRolActionData(actionData);
        handleRolAction(actionData);
      });

      socket.on("ASESINO-exitoso", () => {
        alert("Moriste");
        setLoaderVisible(false);
        setAsesinados(prevAsesinados => [...prevAsesinados, userId]);
        usuarioAsesinado();
        navigation.navigate("Despedida");

      }
      );
      socket.on("MEDICO-exitoso", () => {
        console.log("Medico-exitoso");
      });
      socket.on("PERIODISTA-exitoso", () => {
        console.log("PERIODISTA-exitoso");
      });
      socket.on("FISCAL-exitoso", () => {
        console.log("FISCAL-exitoso");
      });
      socket.on("MANIACO-exitoso", () => {
        console.log("MANIACO-exitoso");
        alert("Moriste");
        setLoaderVisible(false);
        setAsesinados(prevAsesinados => [...prevAsesinados, userId]);
        usuarioAsesinado();
        navigation.navigate("")
      });
      socket.on("DETECTIVE-exitoso", () => {
        console.log("DETECTIVE-exitoso");
      });
    };
  }, [socket]);



  //Manejamos el action rol
  const handleRolAction = () => {
    setLoaderVisible(true);
  }

  const handleCloseModal = () => {
    setLoaderVisible(false);
  };



  // Manjeamos boton para salir de la partida
  const handleExitGame = () => {
    elegirRol("DEFAULT");
    socket.disconnect();
    Alert.alert("Saliendo del juego");
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
          <CartaRolModal userRol={userRol} />


        </View>
        <View style={styles.chatContainer}>
          <Chat isAsesinado={asesinado} />
          <Loader visible={loaderVisible} actionData={rolActionData} style={{ zIndex: 10 }} onCloseModal={handleCloseModal} />
          <View style={styles.botonesAcciones}>
            <AccionModal />
            <Button
              title={"Salir de la partida."}
              onPress={handleExitGame} />

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


    alignItems: "center",
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

    gap: 10,
    width: 400,
    height: 80,
    zIndex: 1,
  },
  perfil: {
    backgroundColor: "blue"
  }

});

export default ChatScreen;
