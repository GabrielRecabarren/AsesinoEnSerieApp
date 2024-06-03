import React, { useState, useContext } from "react";
import { Button, Modal, Text, View, StyleSheet, Pressable, Alert } from 'react-native';
import { PlayerAvatar } from "../PlayerAvatar/PlayerAvatar";
import { GameContext } from "../../context/GameContext";
import { UserContext } from "../../context/UserContext";
import { SocketContext } from "../../context/socketProvider";

const IncreparModal = () => {
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedPlayer, setSelectedPlayer] = useState(null);
  const { gamePlayers, gameId } = useContext(GameContext);
  const { userRol, userId } = useContext(UserContext);
  const socketContext = useContext(SocketContext); // Obtener el contexto del socket
  const socket = socketContext.socket; // Obtener el socket del contexto

  //Manejamos Increpar
  const handleIncrepar = () => {
    //Lógica para increpar al jugador seleccionado
    const increparData = {
      gameId,
      userId,
      selectedPlayer

    }
    socket.emit("increpar", increparData, (callback) =>{
      console.log(callback);
    });
    
    setModalVisible(!modalVisible);
    Alert.alert(
      "Increpando!",
      'La persona increpada podrá defenderse. Puedes escucharla y arrepentirte o confirmar el juicio.',
      [

        {
          text: '¡CONFIRMO!',
          onPress: () => Alert.alert('CONFIRMADO'),
          style: 'default',
        },
        {
          text: '...ME RETRACTO',
          onPress: () => Alert.alert('RETRACTADO'),
          style: 'destructive',
        },
      ],
    )
  }
  //Manejamos Cancelar
  const handleCancelar = () => {
    setSelectedPlayer(null);    
    setModalVisible(!modalVisible)
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
        <Pressable
          style={{ flex: 1 }}
          onPress={() => setModalVisible(!modalVisible)}
        >
          <View
            style={{
              flex: 1,
              justifyContent: "center",
              alignItems: "center",
              backgroundColor: "rgba(0, 0, 0, 0.5)",
            }}
          >
            <View style={{ backgroundColor: 'darkgoldenrod'
, padding: 20 }}>
              <Text>Elige a quién vas a increpar</Text>
              <View style={styles.playerContainer}>
              {selectedPlayer === null ? (
                  gamePlayers
                  .filter(jugador => jugador.id !== userId)
                  .map((jugador, index) =>(
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
                      title="Increpar"
                      onPress={() => handleIncrepar(userRol)}
                      color="#F44336"
                    />
                  </>
                )}
              </View>
              <Button
                title="Cambié de opinion...."
                onPress={() => handleCancelar()}
                color={"crimson"}
              />
            </View>
          </View>
        </Pressable>
      </Modal>

      <Button
        title="Increpar"
        onPress={() => setModalVisible(true)}
        color={"gold"}
      />
    </View>
  );
};

export default IncreparModal;

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
