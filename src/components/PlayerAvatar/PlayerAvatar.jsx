import React from "react";
import { View, Text, StyleSheet, Image } from "react-native";

export const PlayerAvatar = ({ namePlayer,rol,rolActive, image }) => {
  return (
    <View style={styles.bubble}>
      <Image
        style={styles.userAvatar}
        source={{
          uri: image
        }}
      />
      <Text
        numberOfLines={2}
        style={{ color: "yellow", fontWeight: "600", fontSize: 7, margin:2 }}
      >
        {/* Si viene con el rol activo, habla com rol, sino con el nombre de jugador */}
        {rolActive ? rol : namePlayer}
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  bubble: {
    width: 60,
    height: 60,
    borderRadius: 20,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(226, 15, 61, 0.6)",
    borderRadius: 10,
    borderWidth: 1,
    borderColor: "rgba(255, 255, 255, 0.18)",
    
    elevation: 8,
  },
  userAvatar: {
    width: 35,
    height: 35,
    borderRadius:25,
    margin:2,
    backgroundColor:"black"
  },
});
