import React, { useState, useContext } from "react";
import {
  Button,
  Modal,
  Text,
  View,
  StyleSheet,
  Pressable,
} from "react-native";
import { PlayerAvatar } from "../PlayerAvatar/PlayerAvatar";
import { GameContext } from "../../context/GameContext";
import { UserContext } from "../../context/UserContext";
import { SocketContext } from "../../context/socketProvider";
import textosPorRol from "../../../api/rolTexts";
const AccionModal = () => {
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedPlayer, setSelectedPlayer] = useState(null); // Cambiado a objeto en lugar de arreglo
  const { gamePlayers, gameId } = useContext(GameContext);
  const { userRol, userId } = useContext(UserContext);
  const socketContext = useContext(SocketContext); // Obtener el contexto del socket
  const socket = socketContext.socket; // Obtener el socket del contexto

  //Manejamos Boton de  acciones en función del rol del usuario
  const handleRolAction = async () => {
    if (userRol && selectedPlayer) {
      const actionData = { 
        userRol,
        emisor: userId,
        destinatario: selectedPlayer.id,
        gameId
      }
      console.log(actionData);
      socket.emit("action-rol", actionData, (callback) => {
        console.log("Mensaje enviado correctamente.", callback);
      });
      setModalVisible(false);
      alert("Ahora muestra tu Carta Rol, para ejecutar tu acción");
    } else {
      console.log("Rol no reconocido o jugador no seleccionado");
    }
  };

  //Cerrar el modal
  const handleCloseModal = () => {
    setSelectedPlayer(null); // Cambiado a null cuando se cierra el modal
    setModalVisible(!modalVisible);
  }

  return (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          setModalVisible(!modalVisible);
        }}
      >
        <Pressable style={{ flex: 1 }} onPress={() => setModalVisible(!modalVisible)}>
          <View
            style={{
              flex: 1,
              justifyContent: "center",
              alignItems: "center",
              backgroundColor: "rgba(0, 0, 0, 0.5)",
            }}
          >
            <View style={{ backgroundColor: "white", padding: 20 }}>
            <Text>{textosPorRol[userRol].pregunta}</Text>
              <View style={styles.playerContainer}>
                {selectedPlayer === null ? (
                  gamePlayers
                  .filter(jugador => jugador.id !== userId)
                  .map((jugador, index) => (
                    <Pressable
                      key={index}
                      onPressOut={() => setSelectedPlayer(jugador)}
                      style={({ pressed }) => [
                        {
                          backgroundColor: pressed
                            ? "rgb(210, 230, 255)"
                            : "white",
                        },
                        styles.wrapperCustom,
                      ]}
                    >
                      <PlayerAvatar namePlayer={jugador.username} />
                    </Pressable>
                  ))
                ) : (
                  <>
                    <PlayerAvatar namePlayer={selectedPlayer.username} />
                    <Button
                      title={textosPorRol[userRol].accion}
                      onPress={handleRolAction}
                      color="red"
                    />
                  </>
                )}
              </View>
              <Button
                title="Mejor por ahora no ...."
                onPress={handleCloseModal}
                color={"purple"}
                
              />
            </View>
          </View>
        </Pressable>
      </Modal>

      <Button
        title="Acción Rol"
        onPress={() => setModalVisible(true)}
        color={"#ff4500"}
        
      />
    </View>
  );
};

export default AccionModal;

const styles = StyleSheet.create({
  playerContainer: {
    display: "flex",
    flexWrap: "wrap",
    flexDirection: "row",
    gap: 5,
  },
  wrapperCustom: {
    borderRadius: 8,
    padding: 6,
  },
});
