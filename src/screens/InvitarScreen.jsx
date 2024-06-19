import React, { useContext, useState, useRef, useEffect } from 'react';
import { SafeAreaView, StyleSheet, TextInput, ImageBackground, Text, View, Button } from 'react-native';
import { UserContext } from '../context/UserContext';
import { invitarUsuariosALaPartida } from '../../api/api';
import { GameContext } from '../context/GameContext';
import { PlayersContext } from '../context/PlayersContext';

const InvitarScreen = ({ navigation }) => {
    const [jugadores, setJugadores] = useState(['']); // Array de jugadores, inicialmente con un jugador vacío
    const inputRefs = useRef([]); // Referencias a los inputs

    const { userData } = useContext(UserContext);
    const token = userData.data.token;
    const { gameId } = useContext(GameContext);
    const { invitar } = useContext(PlayersContext);

    const agregarJugador = () => {
        setJugadores((prevJugadores) => [...prevJugadores, '']); // Agrega un jugador vacío al array
    };

    useEffect(() => {
        // Focalizar el último input cuando se agregue un nuevo jugador
        if (inputRefs.current[jugadores.length - 1]) {
            inputRefs.current[jugadores.length - 1].focus();
        }
    }, [jugadores]);

    const handleCodigoJugadorChange = (text, index) => {
        const newJugadores = [...jugadores];
        newJugadores[index] = text; // Actualiza el código del jugador en el índice correspondiente
        setJugadores(newJugadores);
    };

    const enviarInvitacion = async () => {
        try {
            const jugadoresArray = jugadores.filter(jugador => jugador.trim() !== ''); // Filtra los jugadores vacíos
            const usuariosInvitados = await invitarUsuariosALaPartida(jugadoresArray, token, gameId);
            invitar(usuariosInvitados);
            navigation.navigate("Create");
        } catch (error) {
            console.error('Error al enviar la invitación:', error);
            alert('Error al enviar la invitación. Prueba de nuevo o prueba otra cosa.');
        }
    };

    return (
        <ImageBackground
            source={require('../img/fondo.png')}
            style={styles.imageBackground}
        >
            <SafeAreaView style={styles.container}>
                <View style={styles.content}>
                    <Text style={styles.title}>Invita a los jugadores por sus códigos</Text>
                    {jugadores.map((jugador, index) => (
                        <View key={index}>
                            <TextInput
                                ref={(el) => inputRefs.current[index] = el} // Asigna la referencia al input
                                style={styles.input}
                                onChangeText={(text) => handleCodigoJugadorChange(text, index)}
                                value={jugador}
                                placeholder="Código alfanumérico"
                            />
                        </View>
                    ))}
                    <View style={styles.buttonsContainer}>
                        <Button
                            onPress={agregarJugador}
                            title="+"
                            color="#841584"
                            style={styles.addButton}
                        />
                        <Button
                            onPress={enviarInvitacion}
                            title="Enviar invitaciones📨"
                            color="green"
                            style={styles.sendButton}
                        />
                    </View>
                </View>
            </SafeAreaView>
        </ImageBackground>
    );
};

const styles = StyleSheet.create({
    imageBackground: {
        flex: 1,
        resizeMode: 'cover',
        justifyContent: 'center',
    },
    container: {
        flex: 1,
        justifyContent: 'center',
        padding: 16,
    },
    content: {
        backgroundColor: 'rgba(0, 0, 255, 0.8)',
        padding: 16,
        borderRadius: 8,
    },
    title: {
        fontSize: 20,
        fontWeight: 'bold',
        marginBottom: 10,
        textAlign: 'center',
        color:"yellow"
    },
    input: {
        height: 40,
        marginVertical: 8,
        borderWidth: 1,
        padding: 10,
        color:"yellow",
    },
    buttonsContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginTop: 20,
    },
    addButton: {
        flex: 1,
        marginRight: 10,
    },
    sendButton: {
        flex: 2,
    },
});

export default InvitarScreen;
