import React, { useState } from "react";
import { View, Text, TextInput, Button, StyleSheet } from "react-native";
import { loginUsuario } from "../../../api/api";

const LoginForm = ({ navigation }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");


  const guardarUsuarioEnSesion = async (usuario) => {
    try {
      await AsyncStorage.setItem('usuario', JSON.stringify(usuario));
    } catch (error) {
      console.error('Error al guardar usuario en la sesión:', error);
    }
  };
  const handleLogin = async () => {
    // Reiniciamos mensajes de Error
    setEmailError("");
    setPasswordError("");
    

    // Intentamos iniciar sesión
    try {
      const userData = { email, password };
      const loggedUser = await loginUsuario(userData);

      // Verificamos si la autenticación fue exitosa
      if (loggedUser) {
        console.log(`Inicio de sesión exitoso usuario : ${loggedUser.user.username}`);
        navigation.navigate("Start");
      } else {
        console.log("Inicio de sesión fallido");
      }
    } catch (error) {
      console.error("Error al intentar iniciar sesión:", error);
      // Puedes mostrar un mensaje de error al usuario si lo deseas
      alert("Error al intentar iniciar sesión. Por favor, inténtalo de nuevo.");
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.text}>Inicia Sesión</Text>
      <TextInput
        placeholder="email@contacto.<3"
        placeholderTextColor="white"
        style={styles.input}
        value={email}
        onChangeText={(text) => {
          setEmail(text);
          setEmailError("");
        }}
      />
      <Text style={{ color: "red" }}>{emailError}</Text>
      <TextInput
        placeholder="password"
        placeholderTextColor="white"
        style={styles.input}
        secureTextEntry
        value={password}
        onChangeText={(text) => {
          setPassword(text);
          setPasswordError("");
        }}
      />
      <Text style={{ color: "red" }}>{passwordError}</Text>

      <Button
        title="Iniciar sesión"
        onPress={handleLogin}
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
