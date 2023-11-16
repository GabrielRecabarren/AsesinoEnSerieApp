import { View, Text, StyleSheet } from "react-native";
export const Card = ({ text }) => {
  return (
    <View style={styles.cardContainer}>
      <Text style={styles.text}>{text}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  cardContainer: {
    margin:5,
    flex: 1,
    justifyContent: "center",
    alignItems: "center",

    backgroundColor: "rgba(100, 38, 135, 0.9)",
    borderRadius: 20,
    padding:10,

    borderWidth: 3,
    borderColor: "rgba(322, 25, 255, 0.18)",
  },
  text: {
    
    fontSize: 20,
    color: "white",
    
  },
});
