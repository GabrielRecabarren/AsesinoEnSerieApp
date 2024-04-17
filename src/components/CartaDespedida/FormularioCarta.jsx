import React, { useContext, useState } from 'react';
import { View, Text, TextInput, StyleSheet, Pressable } from 'react-native';
import { GameContext } from '../../context/GameContext';
import { SocketContext } from '../../context/socketProvider';

const AsesinatoFormulario = ({ navigation }) => {
    const [lugar, setLugar] = useState('');
    const [hora, setHora] = useState('');
    const [ultimasPalabras, setUltimasPalabras] = useState('');

    const { gameId, exit } = useContext(GameContext);

    const socketContext = useContext(SocketContext); // Obtener el contexto del socket
    const socket = socketContext.socket; // Obtener el socket del contexto


    const handleSubmit = () => {
        console.log('Lugar:', lugar);
        console.log('Hora:', hora);
        console.log('Ultimas Palabras:', ultimasPalabras);

        const despedidaMensaje = {
            text: `Ha ocurrido un asesinato a las ${hora}hrs. en ${lugar}`,
            sender: "EVENTO",
            isReceiver: true,
            speakingAsRole: false,
            role: "DEFAULT"
        }; // Objeto de mensaje completo 
        //Enviamos el mensaje de evento
        socket.emit('chat-message', despedidaMensaje, gameId, (res) => {
            if (res.success) {
                exit;
                navigation.navigate("Start");
            } else {
                console.warn("Error al enviar el mensaje:", res.error);
            }
        });

    }

    return (
        <View style={styles.container}>
            <Text style={styles.titulo}>Carta de Despedida</Text>
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
            <View style={styles.inputContainer}>
                <Text style={styles.label}>¿A qué hora fuiste asesinado?</Text>
                <TextInput
                    style={styles.input}
                    value={hora}
                    onChangeText={(text) => {
                        // Verificamos que el texto tenga solo números y el ":" en la posición adecuada
                        if (/^\d{0,2}(:\d{0,2})?$/.test(text)) {
                            setHora(text);
                        }
                    }}
                    placeholder="HH:MM"
                    placeholderTextColor="yellow"
                    keyboardType="numeric"
                />

            </View>
           
            <Pressable style={styles.boton} onPress={handleSubmit}>
                <Text style={styles.botonTexto}>Enviar</Text>
            </Pressable>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'purple',
        padding: 20,
    },
    titulo: {
        fontSize: 24,
        fontWeight: 'bold',
        color: 'yellow',
        marginBottom: 20,
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
