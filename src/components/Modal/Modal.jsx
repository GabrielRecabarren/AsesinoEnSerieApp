import React, { useState, useContext } from "react";
import { Button, Modal, Text, View, StyleSheet, Pressable, TouchableWithoutFeedback } from "react-native";
import { PlayerAvatar } from "../PlayerAvatar/PlayerAvatar";
import { GameContext } from "../../context/GameContext";

const AccionModal = () => {
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedPlayer, setSelectedPlayer] = useState([]);
  const { gamePlayers } = useContext(GameContext);

  //Manejamos Boton de  acciones en función del rol del usuario
  const handleRolAction = async (userRol) => {
    switch (userRol) {
      case "ASESINO":
        socket.emit("action-rol", "asesinar");

        break;
      case "COMPLICE":
        console.log("Cómplice");
        break;
      case "DETECTIVE":
        console.log("Detective");
        break;
      case "MANIACO":
        console.log("Maniaco");
        break;
      case "DOCTOR":
        console.log("Doctor");
        break;
      case "PERIODISTA":
        console.log("Periodista");
        break;
      default:
        console.log("Rol no reconocido");
        break;
    }
  };
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
        <TouchableWithoutFeedback onPress={() => setModalVisible(!modalVisible)}>

        <View
          style={{
            flex: 1,
            justifyContent: "center",
            alignItems: "center",
            backgroundColor: "rgba(0, 0, 0, 0.5)",
          }}
        >
          <View style={{ backgroundColor: "white", padding: 20 }}>
            <Text>Elige a quién vas a asesinar</Text>
            <View style={styles.playerContainer}>
              {selectedPlayer.length===0 ? (
                gamePlayers.map((jugador, index) => (
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
                title="Matar"
                onPress={() => console.log("handleKill")}
                color="#F44336"
                />
                </>
              )}
            </View>
            <Button
              title="Mejor por ahora no ...."
              onPress={() => setModalVisible(!modalVisible)}
              color={"#ff4509"}
            />
          </View>
        </View>
      </TouchableWithoutFeedback>
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
    flexDirection: "row",
    gap: 2,
  },
  wrapperCustom: {
    borderRadius: 8,
    padding: 6,
  },
});
