import React, { useState } from "react";
import { View, Text, TextInput, Button, StyleSheet } from "react-native";
import validator from "validator";

//Formulario de Inicio de Sesión a la App.
const LoginForm = () => {
  //Estados para manejo de validación del Login.
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");

  // Manejo del botón apretado para Login
  const handleLogin = () => {
    console.log("Login");
    //Reiniciamos mensajes de Error
    setEmailError("");
    setPasswordError("");

    //Validación email
    if (!validator.isEmail(email)) {
      setEmailError("Correo electrónico no válido");
      return; //Salimos del programa si no es válido.
    }
    //Validación contraseña
  };
  return (
    <View style={styles.container}>
      <Text style={styles.text}>Inicia Sesión</Text>
      <TextInput
        placeholder="email@contacto.<3"
        placeholderTextColor="white"
        style={styles.input}
      />
      <TextInput
        placeholder="password"
        placeholderTextColor="white"
        style={styles.input}
        secureTextEntry
      />
      
      <Button
        title="Iniciar sesión"
        onPress={() => {
          handleLogin();
        }}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "space-evenly",
  },
  text: {
    fontSize: 30,
    color: "red",
  },
  input: {
    borderWidth: 3,
    borderColor: "black",
    fontSize: 18,
    
    color: "yellow",
    width: 200,
    margin: 10,
    padding: 10,
  },
});

export default LoginForm;
