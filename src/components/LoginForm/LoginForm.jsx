import React, { useContext, useState } from "react";
import { View, Text, TextInput, Button, StyleSheet } from "react-native";
import { loginUsuario } from "../../../api/api";
import { UserContext } from "../../context/UserContext";
import AsyncStorage from "@react-native-async-storage/async-storage";

const LoginForm = ({ navigation }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  // Datos del context
  const { login } = useContext(UserContext);

  // Guardamos al usuario
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
    try {
      setError(""); // Limpiar errores anteriores

      // Validar email
      if (!email) {
        setError("Debes ingresar un correo válido. Por favor, inténtalo de nuevo.");
        return;
      }

      // Validar password
      if (!password) {
        setError("Debes ingresar una contraseña. Por favor, inténtalo de nuevo.");
        return;
      }

      const userData = { email: email.toLowerCase().trim(), password: password.toLowerCase() };
      const loggedUser = await loginUsuario(userData);

      // Verificamos si la autenticación fue exitosa
      if (loggedUser) {
        const usuarioGuardado = await guardarUsuarioEnSesion(loggedUser);
        if (usuarioGuardado) {
          navigation.navigate("Start");
        } else {
          setError("Imposible guardar usuario.");
        }
      } else {
        setError("Inicio de sesión fallido. Verifica tus credenciales.");
      }
    } catch (error) {
      console.error("Error al intentar iniciar sesión:", error);
      setError("Error al intentar iniciar sesión. Por favor, inténtalo de nuevo.");
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.text}>Inicia Sesión</Text>
      {error ? <Text style={styles.errorText}>{error}</Text> : null}
      <TextInput
        placeholder="email@contacto.<3"
        placeholderTextColor="rgb(0, 255, 255)"
        style={styles.input}
        value={email}
        onChangeText={(text) => {
          setEmail(text);
          setError("");
        }}
      />
      <TextInput
        placeholder="password"
        placeholderTextColor="rgba(0, 255, 255,1)"
        style={styles.input}
        secureTextEntry
        value={password}
        onChangeText={(text) => {
          setPassword(text);
          setError("");
        }}
      />
      <Button
        title="Iniciar sesión"
        onPress={handleLogin}
        color={'green'}
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
    borderWidth: 2,
    borderColor: "rgba(0, 255, 255, 0.4)",
    fontSize: 18,
    color: "yellow",
    width: 200,
    margin: 10,
    padding: 10,
  },
  errorText: {
    color: "yellow",
    marginBottom: 10,
  },
});

export default LoginForm;
