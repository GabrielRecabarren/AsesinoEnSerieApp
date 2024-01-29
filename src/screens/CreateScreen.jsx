import React, { useContext, useEffect, useState } from "react";
import {
  ImageBackground,
  Pressable,
  StyleSheet,
  Text,
  View,
} from "react-native";
import { Narracion } from "../components/Narracion/Narracion";
import { Card } from "../components/Card/Card";
import { PlayerAvatar } from "../components/PlayerAvatar/PlayerAvatar";
import roles from "../../api/roles";
import { listarUsuariosPorPartida } from "../../api/api";
import { UserContext } from "../context/UserContext";
import { GameContext } from "../context/GameContext";

export const CreateScreen = ({ navigation }) => {
  //States
  const [juegoOk, setjuegoOk] = useState(false); //estado para ver si el juego ya está listo.
  const [playersOk, setPlayersOk] = useState(false); //Estado de si están los jugadores listos
  const [jugadoresConectados, setJugadoresConectados] = useState([]); //Estado de jugadores listos
  const [text, setText] = useState(''); //Estado del texto mostrado en pantalla.

  const {userData} = useContext(UserContext);
  const { gameId} = useContext(GameContext);
  //Esto debería venir de la base de datos
  const intro = "Comienza el relato ..."
  const instruccion = "Busca un lugar tranquilo y libre de miradas para ver tu rol."
  
  const token = userData.data.token;//Obtenemos el token
  const gameIdParsed = gameId;

  const usuariosConectados = async()=> {
    console.log("listando users por partida")
    await listarUsuariosPorPartida(gameId, token);
  }


  
useEffect(()=>{

  console.log(`UE`);
  usuariosConectados();
}, []) 




  return (
    <ImageBackground
      source={require("../img/fondo.png")}
      style={styles.imageBackground}
    >
      <Narracion text={text} />
      <Text style={{ textAlign: "center", color: "yellow", margin: 10, fontWeight: "bold", fontSize: 18 }}> Usuarios con Partida Aceptada</Text>

      {!playersOk
        ?
        (<View style={styles.playersBar}>
          {jugadoresConectados.map((jugador) => (
            <PlayerAvatar key={jugador.id} namePlayer={jugador.username} image={jugador.imagen} />
          ))}
        </View>)
        :
        (
          <View style={styles.playersBar}>
            {roles.map((rol) => (
              <PlayerAvatar key={rol.id} namePlayer={rol.rol} image={rol.imagen} />
            ))}
          </View>)
      }
      {/* Si el juego está listo para comenzar, se activa el botón. */}
      {juegoOk ? (
        <Pressable style={{ flex: 1 }} onPress={() => navigation.navigate('Chat')}>
          <Card text={"Comenzar Partida "} />
        </Pressable>
      ) : (
        <Pressable style={{ flex: 1 }} onPress={() => console.log("Esperando")}>
          <Card text={"Esperando Jugadores "} />
        </Pressable>
      )}
      <Pressable style={{ flex: 1 }} onPress={() => console.log("Invitar")}>
        <Card text={"Invitar Jugadores "} />
      </Pressable>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  imageBackground: {
    flex: 1,
    resizeMode: "cover",
    justifyContent: "center",
  },
  playersBar: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-around",
    flexWrap: "wrap",
    alignContent: "space-between",
    gap: 40
  },
});
