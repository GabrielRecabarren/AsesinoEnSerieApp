import { createContext, useState } from "react";

const GameContext = createContext();

const GameContextProvider = ({ children }) => {
    const [gameStatus, setGameStatus] = useState("");
    const [gameId, setGameId] = useState(null);
    const [gamePlayers, setGamePlayers] = useState([]);
    const [gameData, setGameData] = useState([]);
    const [asesinado, setAsesinado] = useState(true);

    const create = (gameData) => {
        console.log(`Create desde Game Provider, ${gameData}`)
        setGameStatus(gameData.status);
        setGameId(gameData.id);
        setAsesinado(false)
        setGameData(gameData);
    }

    const load = (gameData, userState) => {
        setGameStatus(gameData.state);
        setGameId(gameData.id);
        setGamePlayers(gameData.players);
        setAsesinado(userState);
        setGameData(gameData);

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
        <GameContext.Provider value={{ create, load,loadPlayers, usuarioAsesinado,exit, gameData, asesinado, gameId, gamePlayers }}>
            {children}
        </GameContext.Provider>
    )
};

export { GameContext, GameContextProvider };

