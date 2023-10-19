import { StyleSheet, Text, View } from "react-native"

export const CompraAsesino = () => {
  return (
<View style={styles.container}>
    <Text style={styles.text}>Compra tu Asesino en Serie</Text>
</View>
    )
}

const styles = StyleSheet.create({
    container:{
        height:55,
        width:"95%",
        backgroundColor:"white",
        marginBottom:20,
        marginLeft:20,

        padding:5,
        borderRadius:25,
        display:"flex",
        justifyContent:"center",
        alignItems:"center"
        
        
    },
    text: {
        flex:1,
        fontFamily: 'Roboto', // Ejemplo de una fuente llamativa y juguetona
        fontSize: 35,
        color: 'purple', // Puedes elegir cualquier color que desees
        fontWeight: 'bold', // Puedes ajustar el peso de la fuente según tus preferencias
      },
      
})
