import { View, StyleSheet } from "react-native";
import BotonAccion from "../BotonAccion/BotonAccion";

const Header = ({navigation}) => {
    return (
        <View style={styles.header}>
            <BotonAccion
                
                title={" 👤	?"}
                action={() => navigation.navigate("Profile")}
            />
            <BotonAccion
                
                title={" 🏚️ "}
                action={() => navigation.navigate("Start")}
            />

        </View>
    )
}
const styles = StyleSheet.create({
    header:{
        flexDirection: 'row',
        justifyContent: 'space-between',
    }
});

export default Header;
