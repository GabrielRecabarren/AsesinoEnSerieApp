import React, { useContext, useState } from 'react';
import { SafeAreaView, StyleSheet, TextInput, ImageBackground, Text, View, Button } from 'react-native';
import { UserContext } from '../context/UserContext';
import { invitarUsuariosALaPartida } from '../../api/api';
import { GameContext } from '../context/GameContext';
import { PlayersContext } from '../context/PlayersContext';

const InvitarScreen = ({ navigation }) => {
    const [correoElectronico, setCorreoElectronico] = useState([]);
    const [codigoJugador, setCodigoJugador] = useState([]);

    const { userData } = useContext(UserContext);
    const token = userData.data.token;//Obtenemos el token
    const { gameId } = useContext(GameContext);

    const { invitar } = useContext(PlayersContext);




    //Manejamos el envío de invitacion
    const enviarInvitacion = async () => {
        try {
            // Separar la cadena de jugadores por comas y eliminar los espacios en blanco alrededor de cada número
            const jugadoresArray = codigoJugador.split(',').map(jugador => jugador.trim());
            console.log(jugadoresArray);
            // Llama a la función invitarUsuariosALaPartida con los datos ingresados por el usuario
            const usuariosInvitados = await invitarUsuariosALaPartida(jugadoresArray, token, gameId);
            invitar(usuariosInvitados);
            navigation.navigate("Create");
        } catch (error) {
            console.error('Error al enviar la invitación:', error);
            alert('Error al enviar la invitación');

        }
    };

    return (
        <ImageBackground
            source={require('../img/fondo.png')} // Ruta de la imagen de fondo
            style={styles.imageBackground}
        >
            <SafeAreaView style={styles.container}>
                <View>
                    <Text style={styles.title}>Invita a un jugador por su correo</Text>
                    <TextInput
                        style={styles.input}
                        onChangeText={setCorreoElectronico}
                        value={correoElectronico}
                        placeholder="Correo electrónico"
                        keyboardType="email-address"
                        autoCapitalize="none"
                    />
                </View>
                <View>
                    <Text style={styles.title}>Invita a un jugador por su código de jugador</Text>
                    <TextInput
                        style={styles.input}
                        onChangeText={setCodigoJugador}
                        value={codigoJugador}
                        placeholder="Código alfanumérico"
                    />
                    <Button
                        onPress={enviarInvitacion}
                        title="Agregar Jugador"
                        color="#841584"
                    />
                </View>
            </SafeAreaView>
        </ImageBackground>
    );
};

const styles = StyleSheet.create({
    imageBackground: {
        flex: 1,
        resizeMode: 'cover', // Ajusta según tus preferencias: 'cover' o 'contain'
        justifyContent: 'center',
    },
    container: {
        flex: 1,
        marginHorizontal: 16,
        justifyContent: 'center',
    },
    title: {
        fontSize: 20,
        fontWeight: 'bold',
        marginBottom: 10,
    },
    input: {
        height: 40,
        marginVertical: 8,
        borderWidth: 1,
        padding: 10,
        backgroundColor: 'rgba(255, 255, 255, 0.8)', // Fondo semitransparente para que el texto sea legible
    },
});

export default InvitarScreen;
