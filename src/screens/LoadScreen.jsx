import React, { useState, useEffect, useContext } from "react";
import {
  View,
  Text,
  ImageBackground,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
} from "react-native";
import Header from "../components/Header/Header";
import {
  consultarUserRoleEnPartida,
  listarPartidasPorUsuario,
} from "../../api/api";
import { UserContext } from "../context/UserContext";
import { GameContext } from "../context/GameContext";
import { SocketContext } from "../context/socketProvider";
import { Card } from "../components/Card/Card";

export const LoadScreen = ({ navigation }) => {
  const [partidasUsuario, setPartidasUsuario] = useState([]);
  const [partidasElegida, setPartidaElegida] = useState([]);
  const { userToken, userId,  elegirRol} = useContext(UserContext);
  const { socket } = useContext(SocketContext);
  const { load } = useContext(GameContext);

  useEffect(() => {
    const cargarPartidasUsuario = async () => {
      try {
        const token = userToken;

        const partidas = await listarPartidasPorUsuario(userId, token);

        setPartidasUsuario(partidas); // Establecer todas las partidas
      } catch (error) {
        console.error("Error al obtener las partidas:", error.message);
      }
    };

    cargarPartidasUsuario();
  }, []);

  const handlePartidaSeleccionada = async (gameData) => {
    try {
      const rolEnPartida = await consultarUserRoleEnPartida(
        userId,
        gameData.id,
        userToken
      );
      
      if (rolEnPartida.userRole!='DEFAULT') {
        load(gameData, userId, userToken);
        console.log(rolEnPartida.userRole);
        elegirRol(rolEnPartida.userRole);
        navigation.navigate("Chat");
      } else {
        // Si rolEnPartida es null, manejar el caso
        console.warn("No se pudo obtener el rol en la partida. Procediendo con un rol predeterminado.");
        load(gameData, userId, userToken); 
        navigation.navigate("Create");
      }
    } catch (error) {
      console.error("Error al manejar la partida seleccionada:", error);
      
    }
  };
  

  return (
    <ImageBackground source={require("../img/fondo.png")} style={{ flex: 1 }}>
      <Header navigation={navigation} />

      <View style={styles.container}>
        <Text style={styles.title}>Tus Partidas en Curso</Text>

        <ScrollView>
          {partidasUsuario.map((item) => (
            <TouchableOpacity
              key={item.id}
              onPress={() => handlePartidaSeleccionada(item)}
            >
              <View style={styles.partidaContainer}>
                <Card
                  text={item.name}
                  valor={`Creador: ${item.creator.username}`}
                />


              </View>
            </TouchableOpacity>
          ))}
        </ScrollView>
      </View>
    </ImageBackground>
  );
};

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
  },
  title: {
    fontSize: 32,
    color: "yellow",
    marginBottom: 20,
  },
  partidaContainer: {
    marginBottom: 20,
    borderBottomWidth: 1,
    borderBottomColor: "white",
  },
  partidaText: {
    color: "white",
    fontSize: 18,
    marginBottom: 8,
  },
});
