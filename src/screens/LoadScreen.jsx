import React from 'react'
import { View, Text, ImageBackground, StyleSheet, TextInput } from 'react-native'

export const LoadScreen = () => {
  return (
    <ImageBackground source={require("../img/fondo.png")} style={{flex:1}}>
      <View style={styles.container}>
        <Text style={styles.title}> Ingresa el Código de tu Partida</Text>
        <TextInput
         placeholder="xxxxxxxx"
         placeholderTextColor="white"
         style={styles.input}></TextInput>

      </View>

    </ImageBackground>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    
    justifyContent: "center",
    margin: 20,
    backgroundColor: "rgba(31, 38, 135, 0.37)",
    borderRadius: 20,
    padding: 20,
    height: 500,
    borderWidth: 3,
    borderColor: "rgba(32, 25, 255, 0.18)",
    shadowColor: "rgba(31, 38, 135, 0.37)",
    shadowOffset: {
      width: 4,
      height: 8,
    },
    shadowOpacity: 0.5,
    shadowRadius: 32,
  },
  title:{
    fontSize: 52,
    color:"yellow"
  },
  input: {
    textAlign:"center",
    borderWidth: 3,
    borderColor: "black",
    fontSize: 55,
    
    color: "yellow",
    width: "95%",
    margin: 20,
    padding: 10,
  },
  
})
