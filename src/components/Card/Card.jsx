import { View, Text, StyleSheet } from "react-native";
export const Card = ({ text, valor, detalle }) => {
  return (
    <View style={[styles.cardContainer, {backgroundColor: detalle ? "rgba(73, 255, 47, 0.2)": "rgba(100, 38, 135, 0.9)"} ]}>
      <Text
        style={styles.text}>

        {text}
      </Text>

      <Text style={styles.valor}>{valor}</Text>

    </View>
  );
};

const styles = StyleSheet.create({
  cardContainer: {
    alignSelf: 'center',
    marginVertical: 5, // Espacio vertical entre las tarjetas
    padding: 10,
    borderRadius: 20,
    borderWidth: 3,
    borderColor: "rgba(32, 25, 255, 0.18)",
    justifyContent: "center",
    alignItems: "center",
  },
  text: {
    textTransform: 'uppercase',
    fontSize: 15,
    color: "yellow",
    marginBottom: 5,
  },
  valor: {
    fontSize: 14,
    color: "#fff",
  },
});
