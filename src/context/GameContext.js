import { createContext, useState } from "react";
import { cambiarEstadoJugador, consultarEstadoJugador } from "../../api/api";

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

    const load = async(gameData, userId, token) => {
        setGameStatus(gameData.state);
        setGameId(gameData.id);
        setGamePlayers(gameData.players);
        const response = await consultarEstadoJugador(gameData.id, userId, token);
        setAsesinado(response);
        setGameData(gameData);

    }
    const loadPlayers = (players) => {
        setGamePlayers(players);
    };
    
    const usuarioAsesinado = (gameId, userId, isAlive, userToken) => {
        setAsesinado(true);
        cambiarEstadoJugador(gameId, userId, isAlive, userToken);
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

