import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text,TextInput, View, Button } from 'react-native';

export default function App() {
  return (
    <View style={styles.container}>
      <Text>Inicia Sesión</Text>
      <TextInput
      placeholder='email@contacto.<3'
      style={styles.input}></TextInput>
      <TextInput
      placeholder='password'
      style={styles.input}
      secureTextEntry
      ></TextInput>
      


      <StatusBar style="auto" />
      <Button
        title="Iniciar sesión"
        onPress={() => {
          console.log("holamundo")

        }}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  input: {
    borderWidth: 1,
    borderColor: 'gray',
    width: 200,
    margin: 10,
    padding: 10,
  },
});
