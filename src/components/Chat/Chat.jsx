import React from "react";
import { View, StyleSheet, ScrollView, TextInput } from "react-native";
import { Mensaje } from "../Mensaje/Mensaje";
import { Evento } from "../Evento/Evento";
import BotonAccion from "../BotonAccion/BotonAccion";

export const Chat = () => {
  return (
    <View style={styles.container}>
      <View style={styles.chatBox}>
        {/* Zona superior para mostrar chats anteriores (3/5 de la caja) */}
        <View style={styles.upperArea}>
          <ScrollView>

        <Evento
            evento={
              "La partida ya ha comenzado, probablemenete el asesino ya eligió su cómplice y están listos para cometer el primer el crimen."            }
              />

          <Mensaje mensaje={"Ya entraron todos?"} active={true} />
          <Mensaje mensaje={"Faltan los presos"} active={false}/>
          
          <Mensaje mensaje={"Los voy a matarlos a todes muajajaja"} active={true} />          
          <Evento
            evento={
              "El chupaperro ha sido asesinado en Santiago a las 19:30 hrs del 31 de Febrero"
            }
            />
          <Mensaje mensaje={"..."} />

            </ScrollView>
        </View>
        <View style={styles.botonesContainer}>
        <BotonAccion style={styles.tips} title={"Rol"} />
        <BotonAccion style={styles.perfil} title={"Usuario"} />
      </View>

        {/* Zona inferior para ingresar texto como usuario (1/5 de la caja) */}
        <TextInput style={styles.lowerArea}></TextInput>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    width:"100%"
  },
  chatBox: {
    backgroundColor: "rgba(0, 0, 0, 0.7)",
    width: "75%",
    height: "75%",
    borderRadius: 10,
    borderWidth: 1,
    borderColor: "white",

    overflow: "hidden", // Para asegurar que los bordes redondeados funcionen correctamente
  },
  botonesContainer: {
    
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
    padding: 20,
    zIndex: 1, // Asegura que esté por encima de otros elementos
  },
  upperArea: {
    flex: 3, // Ocupa 3/5 de la caja
    backgroundColor: "rgba(255, 255, 255, 0.9)", // Blanco transparente
    margin: 10, // Agrega un margen de 10 unidades
    borderRadius: 10,
    padding: 10,
  },
  lowerArea: {
    flex: 1, // Ocupa 1/5 de la caja
    backgroundColor: "rgba(255, 255, 255, 0.5)", // Blanco transparente
    margin: 10, // Agrega un margen de 10 unidades
    borderRadius: 10,
  },
});
