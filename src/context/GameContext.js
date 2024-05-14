import { createContext, useState } from "react";

const GameContext = createContext();

const GameContextProvider = ({ children }) => {
    const [gameStatus, setGameStatus] = useState("");
    const [gameId, setGameId] = useState(null);
    const [gamePlayers, setGamePlayers] = useState([]);
    const [asesinado, setAsesinado] = useState(false);

    const create = (gameData) => {
        console.log(`Create desde Game Provider, ${gameData}`)
        setGameStatus(gameData.status);
        setGameId(gameData.id);
        setAsesinado(false)
    }

    const load = (gameData, userState) => {
        console.log(gameData, "gameData");
        setGameStatus(gameData.state);
        setGameId(gameData.id);
        setGamePlayers(gameData.players);
        setAsesinado(!userState);
    }
    const loadPlayers = (players) => {
        setGamePlayers(players);
    };
    
    const usuarioAsesinado = () => {
        setAsesinado(true);
    }
    

    const exit = () => {

        setGameStatus("Finalizada");
        setGameId(null);
        setGamePlayers([]);
        console.log("exit");

    }


    return (
        <GameContext.Provider value={{ create, load,loadPlayers, usuarioAsesinado,exit, asesinado, gameId, gamePlayers }}>
            {children}
        </GameContext.Provider>
    )
};

export { GameContext, GameContextProvider };

