import { View, Text, StyleSheet } from "react-native";

const CuadroAyuda = ({text, custom}) => {
  return (
    <View style={styles.cuadro}>
        <Text style={styles.text}>{custom ? text.custom : text.basica}</Text>
        <Text style={styles.ejemplo}>{text.ejemplo1}</Text>
        <Text style={styles.ejemplo}>{text.ejemplo2}</Text>
        <Text style={styles.prohibido}>{text.noPermitido1}</Text>
        <Text style={styles.prohibido}>{text.noPermitido2}</Text>
    </View>
  )

}
const styles = StyleSheet.create({
    cuadro:{
        backgroundColor:'#000',
        padding:10,
        borderRadius:10,
    },
    text:{
        color:'#fff',
        fontSize:15,
        textAlign:'center',
    },
    ejemplo:{
        color:"green",
        fontSize:13,
        fontStyle:"italic"

    },
    prohibido:{
        color: "red",
        fontSize:13,
        fontStyle:"italic"

    }
})

export default CuadroAyuda;
