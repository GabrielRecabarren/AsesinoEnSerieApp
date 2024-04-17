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
        console.log(gameData.id, "gameid");
        setGameStatus(gameData.state);
        setGameId(gameData.id);
        setGamePlayers(gameData.players);
    }
    const loadPlayers = (players) => {
        setGamePlayers(players);
    };
    

    const exit = () => {

        setGameStatus("Finalizada");
        setGameId(null);
        setGamePlayers([]);
        console.log("exit");

    }


    return (
        <GameContext.Provider value={{ create, load,loadPlayers, exit, gameId, gamePlayers }}>
            {children}
        </GameContext.Provider>
    )
};

export { GameContext, GameContextProvider };

