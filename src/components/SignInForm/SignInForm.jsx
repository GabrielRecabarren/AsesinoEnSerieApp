import React from 'react'
import { View, Text, StyleSheet, TextInput, Button } from 'react-native'

export const SignInForm = ({navigation}) => {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>Crea tu Cuenta</Text>
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
      <TextInput
        placeholder="Repetir password"
        placeholderTextColor="white"
        style={styles.input}
        secureTextEntry
      />
      
      <Button
        title="Crear Cuenta"
        
        onPress={() => {
          navigation.navigate('Login');
        }}
      />
      <Button
      title='Ya tengo'
      color="#E333FF"
></Button>
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
    fontSize: 25,
    color: "red",
  },
  input: {
    borderWidth: 3,
    borderColor: "black",
    fontSize: 15,
    
    color: "yellow",
    width: 200,
    margin: 10,
    padding: 10,
  },
});
