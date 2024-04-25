import { View, StyleSheet, Text } from "react-native";
import BotonAccion from "../BotonAccion/BotonAccion";
import { useContext } from "react";
import { UserContext } from "../../context/UserContext";


const Header = ({ navigation }) => {
    const { username } = useContext(UserContext);
    return (
        <View style={styles.header}>
            <BotonAccion

                title={" 👤	"}
                action={() => navigation.navigate("Profile")}
            />
              <View style={styles.titleContainer}>
                <Text style={styles.titleText}>{username}</Text>
            </View>
            <BotonAccion

                title={" 🏚️ "}
                action={() => navigation.navigate("Start")}
            />

        </View>
    )
}
const styles = StyleSheet.create({
    header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center', // Alinea verticalmente los elementos al centro
        paddingHorizontal: 20, // Agrega espaciado horizontal para evitar que los elementos estén pegados al borde del contenedor
    },
    titleContainer: {
        flex: 1, // El título ocupará todo el espacio restante disponible
        justifyContent: 'center', // Alinea el texto verticalmente al centro
        alignItems: 'center',
    },
    titleText: {
        color: 'yellow', // Cambia el color del texto a amarillo
        fontSize: 18, // Ajusta el tamaño de la fuente según sea necesario
    },
});

export default Header;
