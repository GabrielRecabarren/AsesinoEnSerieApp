import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet, Modal } from 'react-native';

const CreateGameModal = ({ visible, setVisible, onCreateGame }) => {
  const [gameName, setGameName] = useState("");

  const handleCreateGame = () => {
    if (gameName.trim() === "") {
      alert("Por favor ingresa un nombre para la partida.");
      return;
    }
    onCreateGame(gameName);
    setGameName(""); // Limpiar el campo después de crear la partida
    setVisible(false); // Cerrar el modal
  };

  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={visible}
      onRequestClose={() => setVisible(false)}
    >
      <View style={styles.modalView}>
        <Text style={styles.modalText}>Ingrese el nombre de la partida</Text>
        <TextInput
          style={styles.modalInput}
          placeholder="Nombre de la partida"
          value={gameName}
          onChangeText={setGameName}
          placeholderTextColor='purple'
        />
        <View style={styles.modalButtons}>
          <Button title="Confirmar" color='green' onPress={handleCreateGame} />
          <Button title="Cancelar" color='red' onPress={() => setVisible(false)} />
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modalView: {
    flex: 0,
    
    justifyContent: 'center',
    alignItems: 'center',
    margin: 20,
    backgroundColor: 'rgba(23, 41, 168, 0.7)',
    borderRadius: 20,
    padding: 35,
  },
  modalText: {
    marginBottom: 15,
    textAlign: 'center',
    fontSize: 20,
    color:'yellow'
  },
  modalInput: {
    height: 40,
    borderColor: 'purple',
    borderWidth: 1,
    marginBottom: 15,
    paddingHorizontal: 10,
    width: '100%',
    color:'yellow',
    fontWeight:'900'
  },
  modalButtons: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    width: '100%',
  },
});

export default CreateGameModal;
