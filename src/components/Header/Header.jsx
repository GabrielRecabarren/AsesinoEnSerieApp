import { View, StyleSheet, Text, Pressable } from "react-native";
import { useContext } from "react";
import { UserContext } from "../../context/UserContext";
import { Card } from "../Card/Card";
import { Icon } from "@rneui/themed";


const Header = ({ navigation }) => {
    const { username } = useContext(UserContext);
    return (
        <View style={styles.header}>

            <Pressable
                onPress={() => navigation.navigate("Profile")}
            >
                <Icon
                reverse	
                
                reverseColor="blue"
                name={"person-4"}
                color={"purple"}
                size={25}
                
                />
                

            </Pressable>
            <Card
                    text={'Bienvenid@'}
                    valor={username}
                />
            <Pressable
                onPress={() => navigation.navigate("Start")}
            >
                <Icon
                reverse	
                reverseColor="blue"
                name={"home"}
                color={"purple"}
                size={25}
                
                />
            </Pressable>
        </View>
    )
}
const styles = StyleSheet.create({
    header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center', // Alinea verticalmente los elementos al centro
        paddingHorizontal: 20, // Agrega espaciado horizontal para evitar que los elementos estén pegados al borde del contenedor
        paddingVertical:20
    },

    titleText: {
        color: '#fff',
        fontSize: 18,
    },
    username: {
        fontSize: 12,
        color: '#fff',
        fontWeight: 'bold',
    },
});

export default Header;
