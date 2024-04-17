import React, { useContext, useState } from "react";
import { View, Text, TextInput, Button, StyleSheet } from "react-native";
import { loginUsuario } from "../../../api/api";
import { UserContext } from "../../context/UserContext";
import AsyncStorage from "@react-native-async-storage/async-storage";

const LoginForm = ({ navigation }) => {
  const [email, setEmail] = useState("");
  const [emailError, setEmailError] = useState("");
  const [password, setPassword] = useState("");
  const [passwordError, setPasswordError] = useState("");
 

  //Datos del context
  const { login } = useContext(UserContext);



  //Guardamos al usuario  
  const guardarUsuarioEnSesion = async (usuario) => {
    try {

      await AsyncStorage.setItem('usuario', JSON.stringify(usuario));


      const dataStored = await AsyncStorage.getItem('usuario');

      const parsedData = await JSON.parse(dataStored);


      await login(parsedData);

      return dataStored;
    } catch (error) {
      console.error('Error al guardar usuario en la sesión:', error);
    }
  };

  const handleLogin = async () => {
   

    // Intentamos iniciar sesión
    try {
      const userData = { email: email.toLowerCase(), password: password.toLowerCase() };
      const loggedUser = await loginUsuario(userData);

      // Verificamos si la autenticación fue exitosa
      if (loggedUser) {
        const usuarioGuardado = await guardarUsuarioEnSesion(loggedUser);

        usuarioGuardado ? navigation.navigate("Start") : alert("Imposible guardar usuario");
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
      <Button
        title="Crear Cuenta"
        onPress={() => navigation.navigate("Home")}
        color={"purple"}
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
