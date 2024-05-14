import React, { useState, useContext } from 'react';
import { View, Text, TextInput, StyleSheet, Pressable } from 'react-native';
import { SocketContext } from '../../context/socketProvider';
import { GameContext } from '../../context/GameContext';
import { UserContext } from '../../context/UserContext';
import { crearMensajeEnPartida } from '../../../api/api';

const AsesinatoFormulario = ({ navigation }) => {

    const [lugar, setLugar] = useState('');
    const [hora, setHora] = useState('');
    const [inputSeleccionado, setInputSeleccionado] = useState('lugar');

    const { username, userToken } = useContext(UserContext);
    const { gameId } = useContext(GameContext);

    const socketContext = useContext(SocketContext); // Obtener el contexto del socket
    const socket = socketContext.socket; // Obtener el socket del contexto


    const handleSubmit = async() => {
        console.log('Lugar:', lugar);
        console.log('Hora:', hora);

        const despedidaMensaje = {
            text: ` ${username} fue asesinado, y sus últimas palabras fueron : ${hora} ${lugar}`,
            sender: "REPORTE",
            isReceiver: true,
            speakingAsRole: false,
            role: "DEFAULT",
            userId: 0,
            gameId
        }; // Objeto de mensaje completo 
        const nuevoMensaje = await crearMensajeEnPartida(despedidaMensaje, userToken);
        //Enviamos el mensaje de evento
        socket.emit('chat-message', despedidaMensaje,(res) => {
            if (res.success) {

                
                console.log(nuevoMensaje);

                navigation.navigate("Chat");
            } else {
                console.warn("Error al enviar el mensaje:", res.error);
            }
        });

    };

    return (
        <View style={styles.container}>
            <Text style={styles.titulo}>Carta de Despedida</Text>

            <View style={styles.inputContainer}>
                <Text style={styles.label}>Selecciona:</Text>
                <View style={styles.switchContainer}>
                    <Pressable
                        style={[styles.switchOption, inputSeleccionado === 'lugar' && styles.switchOptionSelected]}
                        onPress={() => setInputSeleccionado('lugar')}>
                        <Text style={styles.switchOptionText}>Lugar</Text>
                    </Pressable>
                    <Pressable
                        style={[styles.switchOption, inputSeleccionado === 'hora' && styles.switchOptionSelected]}
                        onPress={() => setInputSeleccionado('hora')}>
                        <Text style={styles.switchOptionText}>Hora</Text>
                    </Pressable>
                </View>
            </View>

            {inputSeleccionado === 'lugar' && (
                <View style={styles.inputContainer}>
                    <Text style={styles.label}>¿Donde fuiste asesinado?</Text>
                    <TextInput
                        style={styles.input}
                        value={lugar}
                        onChangeText={setLugar}
                        placeholder="Lugar del asesinato"
                        placeholderTextColor="yellow"
                    />
                </View>
            )}
            {inputSeleccionado === 'hora' && (
                <View style={styles.inputContainer}>
                    <Text style={styles.label}>¿A qué hora fuiste asesinado?</Text>
                    <TextInput
                        style={styles.input}
                        value={hora}
                        onChangeText={setHora}
                        placeholder="HH:MM"
                        placeholderTextColor="yellow"
                        keyboardType="numeric"
                    />
                </View>
            )}
            <View style={styles.botonContainer}>
                <Pressable style={styles.boton} onPress={handleSubmit}>
                    <Text style={styles.botonTexto}>Enviar</Text>
                </Pressable>
            </View>
        </View>
    )
}
const styles = StyleSheet.create({
    container: {
        flexGrow: 1,
        backgroundColor: 'purple',
        justifyContent: 'center', // Añadido para centrar el contenido verticalmente
    },
    titulo: {
        fontSize: 34,
        fontWeight: 'bold',
        color: 'yellow',
        textAlign: 'center',
    },
    inputContainer: {
        marginBottom: 20,
    },
    label: {
        fontSize: 16,
        color: 'yellow',
        marginBottom: 5,
    },
    input: {
        backgroundColor: 'red',
        color: 'yellow',
        paddingHorizontal: 10,
        paddingVertical: 8,
        borderRadius: 5,
    },
    switchContainer: {
        flexDirection: 'row',
        justifyContent: 'center',
        marginBottom: 10, // Añadido para separar el switchContainer del inputContainer
    },
    switchOption: {
        paddingHorizontal: 20,
        paddingVertical: 10,
        borderRadius: 5,
        marginHorizontal: 5,
        backgroundColor: 'blue',
    },
    switchOptionSelected: {
        backgroundColor: 'green',
    },
    switchOptionText: {
        color: 'white',
        fontWeight: 'bold',
    },
    botonContainer: {
        alignItems: 'center',
    },
    boton: {
        backgroundColor: 'blue',
        padding: 12,
        borderRadius: 5,
        alignItems: 'center',
    },
    botonTexto: {
        fontSize: 18,
        color: 'white',
        fontWeight: 'bold',
    },
});

export default AsesinatoFormulario;
