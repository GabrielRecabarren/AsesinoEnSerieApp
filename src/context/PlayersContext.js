import { createContext, useContext, useState } from "react";

const PlayersContext = createContext();

const PlayersContextProvider = ({ children }) => {

    //Estados de players.
    const [playersConectados, setPlayersConectados] = useState([]);
    
    return (
        <PlayersContext.Provider value={{}}>
            {children}
        </PlayersContext.Provider>
    )

}

export {PlayersContext, PlayersContextProvider}