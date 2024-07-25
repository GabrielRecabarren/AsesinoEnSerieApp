import React, { useContext, useEffect, useState } from "react";
import { StyleSheet, Text, View, ImageBackground, Button, Alert, Pressable } from "react-native";
import Chat from "../components/Chat/Chat";
import AccionModal from "../components/Modal/RolActionModal";
import { UserContext } from "../context/UserContext";
import { GameContext } from "../context/GameContext";
import { SocketContext } from "../context/socketProvider";
import Loader from "../components/Loader/Loader";
import Header from "../components/Header/Header";
import CartaRolModal from "../components/Modal/CartaRolModal";
import IncreparModal from "../components/Modal/IncreparModal";
import Increpar from "../components/Loader/Increpar";
import { Icon } from "@rneui/themed";

const ChatScreen = ({ navigation }) => {
  const [loaderVisible, setLoaderVisible] = useState(false);
  const [increparVisible, setIncreparVisible] = useState(false);
  const [increpado, setIncrepado] = useState(false);
  const [rolActionData, setRolActionData] = useState(null);
  const { elegirRol, userId, userRol, userToken } = useContext(UserContext);
  const [asesinados, setAsesinados] = useState([]);


  const { gameId, usuarioAsesinado, calcularAsesinados, gameData } = useContext(GameContext);
  const { socket } = useContext(SocketContext); // Obtener el contexto del socket

  useEffect(() => {
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
        alert("Has sido asesinado.");
        setLoaderVisible(false);
        setAsesinados(prevAsesinados => [...prevAsesinados, userId]);
        usuarioAsesinado(gameId, userId, false, userToken);
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
        usuarioAsesinado(gameId, userId, false, userToken);
        navigation.navigate("Despedida")
      });
      socket.on("DETECTIVE-exitoso", () => {
        console.log("DETECTIVE-exitoso");
      });
      socket.on('increpar', (increparData) => {
        console.log("Increpar recibido en el cliente.", increparData)
        setIncreparVisible(true);
      });

      socket.on('increpado', () => {
        console.log("INCREPADO")
        setAsesinados(prevAsesinados => [...prevAsesinados, userId]);
        usuarioAsesinado(gameId, userId, false, userToken);
        setIncrepado(true);
        navigation.navigate("Despedida")

      })

    };
  }, [socket]);

 
  


  //Manejamos el action rol
  const handleRolAction = () => {
    setLoaderVisible(true);
  }

  const handleCloseModal = () => {
    setLoaderVisible(false);
    setIncreparVisible(false)
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
        <View style={styles.overlay} />
        <Header navigation={navigation} />

        <View style={styles.botonesContainer}>
                  <View> 
                    <Pressable 
                    onPress={()=>calcularAsesinados(gameData)}
                    >

                    <Text style={{
                      color:'yellow',
                      marginBottom:15
                      }}>
                      {asesinados.length}
                    </Text>
                    </Pressable>
                  </View>

        </View>
        <View style={styles.chatContainer}>
          <Chat  />
          <Loader
            visible={loaderVisible}
            actionData={rolActionData}
            style={{ zIndex: 10 }}
            onCloseModal={handleCloseModal}
          />
          <Increpar
            visible={increparVisible}
            onCloseModal={handleCloseModal}
          />
          <View style={styles.botonesAcciones}>
            <IncreparModal />
            <AccionModal />
            <CartaRolModal userRol={userRol} visible={increpado} />

            <View style={{flexDirection:'column', marginLeft:30, marginRight:20}}>

            <Icon
              name={"logout"}
              color={"purple"}
              size={20}
              onPress={handleExitGame} />
            <Text style={{ color: 'purple', marginBottom: 14 }}>SALIR</Text>
              </View>


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
  overlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(25, 25, 45, 0.9)', 
  },
  chatContainer: {
    flex: 1,


    alignItems: "center",
  },
  botonesContainer: {
    flexDirection: "row",
    justifyContent: "space-around",

    width: "100%",
    padding: 10,
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
