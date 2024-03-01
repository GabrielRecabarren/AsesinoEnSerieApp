import { View, StyleSheet, ImageBackground } from "react-native";
import LoginForm from "../components/LoginForm/LoginForm";

const LoginScreen = ({ navigation }) => {
  
  return (
    <ImageBackground
      source={require("../img/fondo.png")}
      style={styles.imageBackground}
    >
      <View style={styles.container}>
        <LoginForm navigation={navigation}></LoginForm>
      </View>
    </ImageBackground>
  );
};
const styles = StyleSheet.create({
  imageBackground: {
    flex: 1,
    resizeMode: "cover", 
    justifyContent: "center",
  },
  container: {
    margin: 20,
    backgroundColor: "rgba(31, 38, 135, 0.37)",
    borderRadius: 20,
    padding: 20,
    height: 450,
    borderWidth: 3,
   
  },
});
export default LoginScreen;
