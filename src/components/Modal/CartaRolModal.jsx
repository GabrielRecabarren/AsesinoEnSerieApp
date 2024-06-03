import React, { useState, useEffect } from "react";
import { Button, Modal, View, StyleSheet, Image, Text } from "react-native";
import images from "../../img/roles/rolesImgs";
import textosPorRol from "../../../api/rolTexts";

const CartaRolModal = ({ userRol, visible }) => {
  const [modalVisible, setModalVisible] = useState(visible);

  
  useEffect(() => {
    setModalVisible(visible);
  }, [visible]);

  const imgUrl = images[userRol];




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
        <View style={styles.modalContainer}>
          <Text style={styles.rememberText}>
            *Recuerda que para hablar como rol puedes usar el Switch al lado del boton "ENVIAR"
          </Text>
          <Image
            source={imgUrl}
            style={styles.cardImage}
          />
          <Text style={styles.rememberText}>
            {textosPorRol[userRol].recordatorio}
          </Text>
          <Button
            title="Cerrar"
            onPress={() => setModalVisible(!modalVisible)}
          />

        </View>
      </Modal>

      <Button
        title="Consejos Rol"
        onPress={() => setModalVisible(true)}
        color={"purple"}
      />
    </View>
  );
};

export default CartaRolModal;

const styles = StyleSheet.create({
  modalContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  cardImage: {
    width: 200,
    height: 300,
    resizeMode: "contain",
  },
  rememberText: {
    color: 'yellow', // Hace que el texto sea amarillo
    fontSize: 18, // Ajusta el tamaño de la fuente según sea necesario
    fontWeight: 'bold', // Hace que el texto sea más gordo
  },
});
