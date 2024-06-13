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
  const [text, setText] = useState(''); //Estado del texto mostrado en pantalla.

  const { userData, userId } = useContext(UserContext);
  const { gameId, gameData, load } = useContext(GameContext);
  const { playersConectados } = useContext(PlayersContext);
  const gameCreator = gameData.creatorId === userId;

  //Función para obtener los usuarios conectados
  const usuariosConectados = async () => {
    const usuariosConfirmados = await listarUsuariosPorPartida(gameId, userData.data.token);
    setJugadoresConectados(usuariosConfirmados);
  }

  useEffect(() => {
    usuariosConectados();

  }, [playersConectados]);


  // Cambiar el texto y el estado de los jugadores cuando haya 6 jugadores conectados
  useEffect(() => {
    if (playersOk === false) {
      setText("Uno/a de nosotros/as se convertirá en Asesino/a. En sus adentros descubrirá un instinto inexpugnable que hasta ahora había sido reprimido. Nos conoce bien, convencerá a uno de nosotros para convertirse en cómplice de un plan aterrador: Eliminar uno auno, a quienes hasta ahora habíansido sus amigos y amigas. Asesino y Cómplice deberán pasar desapercibidos en cada uno de sus crímenes, ocultar el plan a sus víctimas, acometer sin dejar rastros ni sospechas.")
    }
    if (jugadoresConectados.length >= 3) {
      setPlayersOk(true);
      setText('¿Podremos detener la matanza a tiempo? ¿Encontrar y juzgar correctamente, eludiendo la estrategia, el engaño y las patrañas de un par de mentes criminales? ¿O terminará el asesino y complice impunes? ... Busca un lugar tranquilo y libre de miradas para ver tu rol.');

    }
  }, [jugadoresConectados]);

  const handleComenzarPartida = () => {
    const updatedGameData = {
      state: "En Curso",
      id: gameId,
      players: jugadoresConectados

    }
    load(updatedGameData);
    navigation.navigate('Rol')

  }

  // Renderizado del componente

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


      <View style={{flex:1}}>

        {/* Si el juego está listo para comenzar, se activa el botón. */}
        <Pressable style={styles.button} onPress={handleComenzarPartida}>
          <Card text={playersOk ? "Comenzar Partida" : "Esperando Jugadores"} />
        </Pressable>
        <Pressable display={ !gameCreator ? 'none' : '' } style={styles.button} onPress={() => navigation.navigate("Invitar")}>
          <Card text={"Invitar Jugadores "} />
        </Pressable>
      </View>
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
  buttonsContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginVertical: 10,
  },
  button: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginHorizontal: 5,
  },

});
