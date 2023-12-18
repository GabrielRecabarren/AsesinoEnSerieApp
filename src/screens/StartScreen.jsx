import React from "react";
import {
  View,
  ImageBackground,
  StyleSheet,
  Pressable,
} from "react-native";
import { Card } from "../components/Card/Card";
import { CompraAsesino } from "../components/CompraAsesino/CompraAsesino";

export const StartScreen = ({navigation}) => {

  const handlingCrearPartida =()=>{
    console.log("Vamos a crear una partida")
  }

    const handlingStart = (option) =>{
        switch (option) {
            case 1:
                navigation.navigate('Create');
                
                break;
            case 2:
                navigation.navigate('Load');
                break;
            
        }
       
    }
  return (
    <ImageBackground
      source={require("../img/fondo.png")}
      style={styles.imageBackground}
    >
      <View style={styles.container}>
        <Pressable style={{flex:1}} onPress={()=>handlingCrearPartida()} >
          <Card text={"CREAR PARTIDA"} />
        </Pressable>
        <Pressable style={{flex:1}} onPress={()=>handlingStart(2)}>
          <Card text={"PARTIDA GUARDADA"}  />
        </Pressable>
      </View>

      <CompraAsesino/>
    </ImageBackground>
  );
};
const styles = StyleSheet.create({
  imageBackground: {
    flex: 1,
  },
  container: {
    flex: 1,
    flexDirection: "column",
    justifyContent: "space-between",
    borderRadius:20,
    margin: 20,
    backgroundColor: "rgba(31, 38, 135, 0.37)",
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
});
export default StartScreen;
