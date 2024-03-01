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
import { PlayersContext } from "../context/PlayersContext";

export const CreateScreen = ({ navigation }) => {
  //States
  const [playersOk, setPlayersOk] = useState(false); //Estado de si están los jugadores listos
  const [jugadoresConectados, setJugadoresConectados] = useState([]); //Estado de jugadores listos
  const [text, setText] = useState('Comienza el relato ...'); //Estado del texto mostrado en pantalla.

  const { userData } = useContext(UserContext);
  const { gameId } = useContext(GameContext);
  const { playersConectados } = useContext(PlayersContext);

  //Función para obtener los usuarios conectados
  const usuariosConectados = async () => {
    console.log(`"listando users por partida" con este gameID ${gameId}`)
    const usuariosConfirmados = await listarUsuariosPorPartida(gameId, userData.data.token);
    setJugadoresConectados(usuariosConfirmados);
  }

  useEffect(() => {
    usuariosConectados();
  }, [playersConectados]);

  // Cambiar el texto y el estado de los jugadores cuando haya 6 jugadores conectados
  useEffect(() => {
    if (jugadoresConectados.length >= 6) {
      setPlayersOk(true);
      setText('Busca un lugar tranquilo y libre de miradas para ver tu rol.');
    }
  }, [jugadoresConectados]);

  return (
    <ImageBackground
      source={require("../img/fondo.png")}
      style={styles.imageBackground}
    >
      <Narracion text={text} />
      <Text style={{ textAlign: "center", color: "yellow", margin: 10, fontWeight: "bold", fontSize: 18 }}> Usuarios con Partida Aceptada</Text>

      <View style={styles.playersBar}>
        {jugadoresConectados.map((jugador) => (
          <PlayerAvatar key={jugador.id} namePlayer={jugador.username} image={jugador.imagen} />
        ))}
      </View>

      {/* Si el juego está listo para comenzar, se activa el botón. */}
      <Pressable style={{ flex: 1 }} onPress={() => navigation.navigate(playersOk ? 'Chat' : 'Esperando')}>
        <Card text={playersOk ? "Comenzar Partida" : "Esperando Jugadores"} />
      </Pressable>
      <Pressable style={{ flex: 1 }} onPress={() => navigation.navigate("Invitar")}>
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
