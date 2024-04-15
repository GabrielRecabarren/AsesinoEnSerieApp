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

const ChatScreen = ({ navigation }) => {
  const [loaderVisible, setLoaderVisible] = useState(false);
  const { elegirRol, userId } = useContext(UserContext);
  const [asesinados, setAsesinados] = useState([]);
  const [asesinado, setAsesinado] = useState(false);
  
  const { gamePlayers, gameId } = useContext(GameContext);
  const socketContext = useContext(SocketContext); // Obtener el contexto del socket
  const socket = socketContext.socket; // Obtener el socket del contexto

  //UseEffect para escuchar las acciones del rol
  useEffect(() => {
    console.log(gamePlayers, "GamePlayers");
    if (socket) {
      socket.on("action-rol", (accion, userId, destinatario, gameId) => {
        handleRolAction(destinatario, gameId);
      });

      socket.on("asesinato", ()=>{
        alert("Moriste");
        setLoaderVisible(false);
        setAsesinados(prevAsesinados => [...prevAsesinados, userId]); 
        setAsesinado(userId);
      }
      );
    };
  }, [socket]);
  useEffect(() => {
    console.log(asesinados, "asesinados actualizados");
  }, [asesinados]);
  

  //Manejamos el action rol
  const handleRolAction = () => {
    setLoaderVisible(true);

//     const message = { 
//       text: "Esta ocurriendo un asesinato", 
//       sender: "EVENTO", 
//       isReceiver: false, 
//       speakingAsRole: false,
//       role: "DEFAULT"  }; // Objeto de mensaje completo 
// //Enviamos el mensaje de evento
//     socket.emit('chat-message', message,gameId,  (res) => {
      
//       if (res.success) {
//         alert("Ok")
//       } else {
//         console.warn("Error al enviar el mensaje:", res.error);
//       }
//     });
  }



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
        <View style={styles.botonesContainer}>
          <BotonAccion style={styles.tips} title={"Consejos Rol📕"} />

          <BotonAccion
            style={styles.perfil}
            title={" 👤	"}
            action={() => navigation.navigate("Profile")}
          />
        </View>
        <View style={styles.chatContainer}>
          {asesinado ? <AsesinadoCartel navigation={navigation} /> : <Chat />  }
          <Loader visible={loaderVisible} style={{ zIndex: 10 }} />
          <View style={styles.botonesAcciones}>
            <AccionModal />

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

  tips: {
    // Puedes ajustar los estilos específicos del botón si es necesario
  },
});

export default ChatScreen;
