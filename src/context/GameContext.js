import { createContext, useState } from "react";

const GameContext = createContext();

const GameContextProvider = ({ children }) => {
    const [gameStatus, setGameStatus] = useState("");
    const [gameId, setGameId] = useState(null);
    const [gamePlayers, setGamePlayers] = useState([]);

    const create = (gameData) => {
        console.log(`Create desde Game Provider, ${gameData}`)
        setGameStatus(gameData.status);
        setGameId(gameData.id);

    }

    const load = (gameData) => {
        setGameStatus(gameData.status);
        setGameId(gameData.id);
        setGamePlayers(gameData.players);
    }


    return (
        <GameContext.Provider value={{ create, load, gameId, gamePlayers }}>
            {children}
        </GameContext.Provider>
    )
};

export { GameContext, GameContextProvider };

