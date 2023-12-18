import React from "react";
import { View, StyleSheet, ImageBackground, Button } from "react-native";

import { SignInForm } from "../components/SignInForm/SignInForm";

const HomeScreen = ({navigation}) => {
  return (
    <ImageBackground
      source={require('../img/fondo.png')}
      style={styles.imageBackground}
    >
      <View style={styles.container}>
        <SignInForm navigation={navigation} />
        <Button title="Atajo" onPress={()=>navigation.navigate("Start")}/>
      </View>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  imageBackground: {
    flex: 1,
    resizeMode: "cover", // Ajusta según tus preferencias: 'cover' o 'contain'
    justifyContent: "center",
  },
  container: {
    margin: 20,
    backgroundColor: "rgba(31, 38, 135, 0.37)",
    borderRadius: 20,
    padding: 20,
    height: 450,
    borderWidth: 3,
    borderColor: "rgba(322, 25, 255, 0.18)",
    shadowColor: "rgba(31, 38, 135, 0.37)",
    shadowOffset: {
      width: 4,
      height: 8,
    },
    shadowOpacity: 0.5,
    shadowRadius: 32,
  },
  
});

export default HomeScreen;
