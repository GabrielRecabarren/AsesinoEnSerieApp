import { View, Text, StyleSheet } from "react-native";
import { Icon } from "@rneui/themed";
export const Card = ({ text,icon, valor }) => {
  return (
    <View style={styles.cardContainer}>
      <Text style={styles.text}>{text}</Text>
      
      <Text style={styles.valor}>{valor}</Text>

    </View>
  );
};

const styles = StyleSheet.create({
  cardContainer: {
    alignSelf: 'flex-start',
    marginVertical: 5, // Espacio vertical entre las tarjetas
    padding: 10,
    backgroundColor: "rgba(100, 38, 135, 0.9)",
    borderRadius: 20,
    borderWidth: 3,
    borderColor: "rgba(32, 25, 255, 0.18)",
    justifyContent: "center",
    alignItems: "center",
  },
  text: {
    
    fontSize: 15,
    color: "yellow",
    marginBottom: 5, 
  },
  valor: {
    fontSize: 14,
    color: "#fff",
  },
});
