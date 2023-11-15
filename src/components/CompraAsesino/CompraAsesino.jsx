import { Text, Linking, StyleSheet, TouchableOpacity, View } from "react-native"

export const CompraAsesino = () => {

    const openUrl = async () => {
        const url = "https://editorialsjs.com/producto/asesino-en-serie/";
        const supportedUrl = await Linking.canOpenURL(url);

        if(supportedUrl){
            await Linking.openURL(url);
        }else{ 
            console.log("Algo anda mal con la URL");
        }
    }
  return (
<TouchableOpacity style={styles.container} onPress={() => openUrl()}>
    <Text style={styles.text} >Compra tu Asesino en Serie</Text>
</TouchableOpacity>
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
        fontSize: 25,
        color: 'purple', // Puedes elegir cualquier color que desees
        fontWeight: 'bold', // Puedes ajustar el peso de la fuente según tus preferencias
      },
      
})
