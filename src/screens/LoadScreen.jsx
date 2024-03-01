import React, { useState, useEffect, useContext } from 'react';
import { View, Text, ImageBackground, StyleSheet, FlatList, TouchableOpacity } from 'react-native';
import { listarPartidasPorUsuario } from '../../api/api';
import { UserContext } from '../context/UserContext';
import { GameContext } from '../context/GameContext';

export const LoadScreen = ({navigation}) => {
  const [partidasUsuario, setPartidasUsuario] = useState([]);
  const { userData } = useContext(UserContext);
  const { load }= useContext(GameContext);

  useEffect(() => {
    const cargarPartidasUsuario = async () => {
      try {
        const token = userData.data.token;
        const userId = userData.data.user.id;
        const partidas = await listarPartidasPorUsuario(userId, token);

        const partidasEnCurso = partidas.filter((partida) => partida.state === 'En Curso');

        setPartidasUsuario(partidasEnCurso);
      } catch (error) {
        console.error('Error al obtener las partidas:', error.message);
      }
    };

    cargarPartidasUsuario();
  }, []);

  const handlePartidaSeleccionada = (gameData) => {
    // Llamar a GameContext para cargar la partida seleccionada
    load(gameData);
    navigation.navigate('Chat');
  };

  return (
    <ImageBackground source={require("../img/fondo.png")} style={{ flex: 1 }}>
      <View style={styles.container}>
        <Text style={styles.title}>Tus Partidas en Curso</Text>

        
        <FlatList
          data={partidasUsuario}
          keyExtractor={(item) => item.id.toString()}
          renderItem={({ item }) => (
            <TouchableOpacity onPress={() => handlePartidaSeleccionada(item)}>
              <View style={styles.partidaContainer}>
                <Text style={styles.partidaText}>{`Partida ID: ${item.id}, Estado: ${item.state}`}</Text>
                <Text style={styles.partidaText}>{`Creador: ${item.creator?.username || 'Desconocido'}`}</Text>
                {/* Agregar más detalles según la estructura de tus datos */}
              </View>
            </TouchableOpacity>
          )}
        />
      </View>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    margin: 20,
    backgroundColor: 'rgba(31, 38, 135, 0.37)',
    borderRadius: 20,
    padding: 20,
    height: 500,
    borderWidth: 3,
    borderColor: 'rgba(32, 25, 255, 0.18)',
    
  },
  title: {
    fontSize: 32,
    color: 'yellow',
    marginBottom: 20,
  },
  partidaContainer: {
    marginBottom: 20,
    borderBottomWidth: 1,
    borderBottomColor: 'white',
  },
  partidaText: {
    color: 'white',
    fontSize: 18,
    marginBottom: 8,
  },
});
