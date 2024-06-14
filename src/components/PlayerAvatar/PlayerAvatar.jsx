import { Icon } from "@rneui/themed";
import React from "react";
import { View, Text, StyleSheet } from "react-native";

export const PlayerAvatar = ({ namePlayer,rol,rolActive, background }) => {
  return (
    <View style={[styles.bubble, {backgroundColor: background ?  "rgba(125, 226, 61, 0.5)" : "rgba(226, 15, 61, 0.5)"}]}>
      <Icon
                	
                
                
                name={"face-5"}
                color={background ? "purple" : "green"}
                size={40}
                
                />
      <Text
        numberOfLines={2}
        style={{ color: "yellow", fontWeight: "800", fontSize: 7, margin:2, textTransform:'uppercase' }}
             
      >
        {/* Si viene con el rol activo, habla com rol, sino con el nombre de jugador */}
        {rolActive ? rol : namePlayer}
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  bubble: {
    width: 80,
    height: 80,
    borderRadius: 20,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    //backgroundColor: "rgba(226, 15, 61, 0.7)",
    borderRadius: 10,
    borderWidth: 1,
    borderColor: "blue",
    margin: 15,
    
  },
  
});
