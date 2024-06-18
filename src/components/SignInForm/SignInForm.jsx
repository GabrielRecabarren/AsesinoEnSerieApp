import { useState } from "react";
import { View, Text, StyleSheet, TextInput, Button, Alert } from "react-native";
import { crearUsuario } from "../../../api/api";

export const SignInForm = ({ navigation }) => {
  const [email, setEmail] = useState("");
  const [alias, setAlias] = useState("anon");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [repeatPassword, setRepeatPassword] = useState("");
  const [error, setError] = useState(null);


  const handleCreateAccount = async () => {
    try {
      if (username.length < 5) {
        throw new Error("Username debe ser mínimo de 5 caracteres.");
      }

      if (email.length === 0) {
        throw new Error("Email obligatorio");
      }
      if (password.length < 8) {
        throw new Error("Password debe ser mínimo de 8 caracteres");
      }

      if (password !== repeatPassword) {
        throw new Error("Las contraseñas no coinciden.");
      }
      const userData = {
        username: username.toLowerCase(),
        email: email.toLowerCase().trim(),
        password,
        alias:username
      };
      const nuevoUsuario = await crearUsuario(userData);
      nuevoUsuario === undefined ? alert("usuario incorrecto") : navigation.navigate("Login")

    } catch (error) {
      console.error('Error al crear usuario:', error.message);
      setError(error.message);

    }
  }

  return (
    <View style={styles.container}>
      {/* Renderizar el componente de alerta solo si hay un error */}
      {error && (
        <Text style={{ color: "yellow" }}>
          {error}
        </Text>
      )}
      <Text style={styles.text}>Crea tu Cuenta</Text>
      <TextInput
        placeholder="Nombre Usuario"
        placeholderTextColor="rgb(0, 255, 255)"
        style={styles.input}
        keyboardType="ascii-capable"
        value={username}
        onChangeText={(text) => setUsername(text)}
      />
      <TextInput
        placeholder="email@contacto.<3"
        placeholderTextColor="rgb(0, 255, 255)"
        style={styles.input}
        keyboardType="email-address"
        value={email}
        onChangeText={(text) => setEmail(text)}
      />
      <TextInput
        placeholder="password"
        placeholderTextColor="rgb(0, 255, 255)"
        style={styles.input}
        secureTextEntry
        value={password}
        onChangeText={(text) => setPassword(text)}
      />
      <TextInput
        placeholder="Repetir password"
        placeholderTextColor="rgb(0, 255, 255)"
        style={styles.input}
        secureTextEntry
        value={repeatPassword}
        onChangeText={(text) => setRepeatPassword(text)}
      />

      <Button
        title="Crear Cuenta"
        onPress={() => handleCreateAccount()}
      />

      <Button
        title="Ya tengo"
        color="purple"
        //Redirigimos el botón al Login
        onPress={() => {
          navigation.navigate("Login");
        }}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    gap:12

  },
  text: {
    fontSize: 25,
    color: "red",
  },
  input: {
    borderWidth: 2,
    borderColor: "rgba(0, 255, 255, 0.4)",
    fontSize: 18,

    color: "yellow",
    width: 250,
    
    padding: 10,
  },
});
