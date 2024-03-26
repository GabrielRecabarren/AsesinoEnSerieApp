import React, { useContext } from "react";
import { UserContext } from "../context/UserContext";
import { Card } from "../components/Card/Card";
import { View, Text, StyleSheet, ImageBackground, ScrollView } from "react-native";

export const ProfileScreen = () => {
  const { userData } = useContext(UserContext);
  const userInfo = userData.data.user;

  // Función para renderizar las propiedades del objeto dentro del infoContainer
  const renderUserInfo = () => {
    return Object.keys(userInfo).map((propiedad, index) => (
      <Card key={index} text={propiedad} valor={userInfo[propiedad]} />
    ));
  };

  return (
    <ImageBackground
      source={require("../img/fondoPlano.jpeg")}
      style={styles.imageBackground}
    >
      <View style={styles.container}>
        <Text style={styles.title}>Perfil de Usuario</Text>
        <ScrollView contentContainerStyle={styles.scrollViewContent}>
          <View style={styles.infoContainer}>{renderUserInfo()}</View>
        </ScrollView>
      </View>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  imageBackground: {
    flex: 1,
  },
  container: {
    flex: 1,
    flexDirection: "column",
    justifyContent: "space-between",
    borderRadius: 20,
    margin: 50,
    backgroundColor: "rgba(31, 38, 135, 0.37)",
    padding: 40,
    height: 500,
    borderWidth: 3,
    borderColor: "rgba(32, 25, 255, 0.18)",
    zIndex: 0,
  },

  title: {
    fontSize: 36,
    color: "#fff",
  },
  infoContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
    alignItems: "flex-start", // Alinea los elementos al principio del contenedor
  },
  scrollViewContent: {
    flexGrow: 1,
    paddingVertical: 10, // Espacio vertical adicional dentro del ScrollView
  },
});

