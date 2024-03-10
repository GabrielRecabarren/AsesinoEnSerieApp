import React, { useEffect } from "react";
import { View, StyleSheet,  ImageBackground, Button } from "react-native";

import { SignInForm } from "../components/SignInForm/SignInForm";
import AsyncStorage from "@react-native-async-storage/async-storage";

const HomeScreen = ({ navigation }) => {

  useEffect(() => {
    const recuperarEstadoAutenticacion = async () => {
      try {
        const usuarioAutenticado = await AsyncStorage.getItem('usuarioAutenticado');
        // Realiza la lógica correspondiente para redirigir a la página de inicio de sesión o a la página principal según el estado de autenticación recuperado.
          usuarioAutenticado ? console.log("Autenticado") : console.log("No hay Autenticado");
      } catch (error) {
        console.error('Error al recuperar el estado de autenticación:', error);
      }
    };
  
    recuperarEstadoAutenticacion();
  }, []);
  
  return (
  
    <ImageBackground
      source={require('../img/fondo.png')}
      style={styles.imageBackground}
    >
      
      <View style={styles.container}>
        <SignInForm navigation={navigation} />
      </View>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  imageBackground: {
    flex: 1,
    resizeMode: "cover", 
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
    
  },

});

export default HomeScreen;
