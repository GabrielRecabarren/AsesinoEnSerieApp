import { createContext, useState } from "react";

const GameContext = createContext();

const GameContextProvider = ({ children }) => {
    const [gameStatus, setGameStatus] = useState("");
    const [gameId, setGameId] = useState(null);

    const create = (gameData) => {
        console.log(`Create desde Game Provider, ${gameData}`)
        setGameStatus(gameData.status);
        setGameId(gameData.id);

    }

    const load = (gameData) => {
        console.log(`Quiero guardar la partida.`)
        setGameStatus(gameData.status);
        setGameId(gameData.id);
        console.log(`Partida ${gameData.id} guardada en contexto.`)
    }


    return (
        <GameContext.Provider value={{ create, load, gameId }}>
            {children}
        </GameContext.Provider>
    )
};

export { GameContext, GameContextProvider };

