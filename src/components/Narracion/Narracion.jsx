import React, { useEffect, useState } from "react";
import { StyleSheet, View, Text, ScrollView } from "react-native";

export const Narracion = ({ text }) => {
  return (
    <View style={styles.container}>
      <ScrollView>
        <Text style={styles.text}>{text}</Text>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    height: "25%",
    width: "90%",
    margin: 20,
    padding: 5,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(255, 255, 255, 0.25)",
    borderRadius: 10,
    borderWidth: 1,
    borderColor: "rgba(255, 255, 255, 0.18)",
    
    elevation: 8,
  },
  text: {
    color: "white",
    fontStyle: "italic",
    fontSize: 22,
  },
});
