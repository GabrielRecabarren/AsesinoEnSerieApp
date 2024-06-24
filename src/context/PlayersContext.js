import { createContext, useContext, useState } from "react";

const PlayersContext = createContext();

const PlayersContextProvider = ({ children }) => {

    //Estados de players.
    const [playersConectados, setPlayersConectados] = useState([]);

    const invitar =(players) =>{
        setPlayersConectados(...playersConectados, players);
        // console.log("Agregados al Context");

    }
    
    return (
        <PlayersContext.Provider value={{playersConectados, invitar}}>
            {children}
        </PlayersContext.Provider>
    )

}

export {PlayersContext, PlayersContextProvider}