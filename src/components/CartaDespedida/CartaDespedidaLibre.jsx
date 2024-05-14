import React, { useState, useContext } from 'react';
import { ScrollView, TextInput, Text, StyleSheet, Button } from 'react-native';
import { SocketContext } from '../../context/socketProvider';
import { crearMensajeEnPartida } from '../../../api/api';
import { UserContext } from '../../context/UserContext';
import { GameContext } from '../../context/GameContext';

const CartaDespedidaLibre = ({navigation}) => {
    const [ultimasPalabras, setUltimasPalabras] = useState("");
    const { userToken, username } = useContext(UserContext);
    const { gameId } = useContext(GameContext);
    const { socket} = useContext(SocketContext);
    
    const handleEnviarUltimasPalabras = async() => {
        
        const despedidaMensaje = {
            text: ` ${username} fue asesinado, y sus últimas palabras fueron : ${ultimasPalabras}`,
            sender: "REPORTE",
            isReceiver: true,
            speakingAsRole: false,
            role: "DEFAULT",
            userId: 0,
            gameId
        }; // Objeto de mensaje completo 
        const nuevoMensaje = await crearMensajeEnPartida(despedidaMensaje, userToken);
        //Enviamos el mensaje de evento
        socket.emit('chat-message', despedidaMensaje, (res) => {
            if (res.success) {
                
                console.log(nuevoMensaje, "enviado mensaje de Evento    ");

                navigation.navigate("Chat");
            } else {
                console.warn("Error al enviar el mensaje:", res.error);
            }
        });

    };
    return (
        <ScrollView contentContainerStyle={styles.container}>
            <Text style={styles.titulo}>Carta de Despedida Libre</Text>
            <TextInput
                style={styles.input}
                value={ultimasPalabras}
                onChangeText={setUltimasPalabras}
                placeholder="Tus últimas palabras..."
                placeholderTextColor="yellow"
                keyboardType="default"
            />
            <Button
            title='Enviar'
            onPress={handleEnviarUltimasPalabras}
            />
        </ScrollView>
    );
};

const styles = StyleSheet.create({
    container: {
        flexGrow: 1,
        backgroundColor: 'purple',
        padding: 20,
        alignItems: 'center',
        justifyContent: 'center',
    },
    titulo: {
        fontSize: 24,
        fontWeight: 'bold',
        color: 'yellow',
        marginBottom: 20,
        textAlign: 'center',
    },
    input: {
        height: 500,
        backgroundColor: 'red',
        color: 'yellow',
        padding: 15,
        paddingVertical: 10,
        borderRadius: 15,
        width: 220,
        margin: 20,
    },
});

export default CartaDespedidaLibre;
