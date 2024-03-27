import React, { useState } from 'react';
import { Button, Modal, Text, View } from 'react-native';

const InfoModal = () => {
  const [modalVisible, setModalVisible] = useState(false);

  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          setModalVisible(!modalVisible);
        }}
      >
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: 'rgba(0, 0, 0, 0.5)' }}>
          <View style={{ backgroundColor: 'white', padding: 20 }}>
            <Text>Modal</Text>
            <Button
              title="Cerrar modal"
              onPress={() => setModalVisible(!modalVisible)}
            />
          </View>
        </View>
      </Modal>

      <Button
        title="Abrir modal"
        onPress={() => setModalVisible(true)}
      />
    </View>
  );
};

export default InfoModal;
