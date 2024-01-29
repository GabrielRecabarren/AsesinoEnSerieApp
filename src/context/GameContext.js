import { createContext, useState } from "react";

const GameContext = createContext();

const GameContextProvider = ({ children }) => {
    const [gameStatus, setGameStatus] = useState("");
    const [gameId, setGameId] = useState(null);

    const create = (gameData) =>{
        console.log(`Create desde Game Provider, ${gameData}`)
        setGameStatus(gameData.status);
        setGameId(gameData.id);

    }


    return (
        <GameContext.Provider value={{create, gameId}}>
            {children}
        </GameContext.Provider>
    )
};

export { GameContext, GameContextProvider };

