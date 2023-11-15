import React from "react";
import { View, Text, StyleSheet, Image } from "react-native";

export const PlayerAvatar = ({ namePlayer, image }) => {
  return (
    <View style={styles.bubble}>
      <Image
        style={styles.userAvatar}
        source={{
          uri: 'https://e7.pngegg.com/pngimages/134/173/png-clipart-internet-forum-avatar-avatar-english-face.png'
        }}
      />
      <Text
        numberOfLines={2}
        style={{ color: "yellow", fontWeight: "600", fontSize: 7, margin:2 }}
      >
        {namePlayer}
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
    backgroundColor: "rgba(256, 15, 61, 0.6)",
    borderRadius: 10,
    borderWidth: 1,
    borderColor: "rgba(255, 255, 255, 0.18)",
    shadowColor: "rgba(31, 38, 135, 0.37)",
    shadowOffset: {
      width: 0,
      height: 8,
    },

    shadowRadius: 32,
    shadowOpacity: 1,
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
