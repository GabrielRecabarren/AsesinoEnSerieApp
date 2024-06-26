import { createContext, useState } from "react";
import { cambiarEstadoJugador, consultarEstadoJugador } from "../../api/api";

const GameContext = createContext();

const GameContextProvider = ({ children }) => {
    const [gameStatus, setGameStatus] = useState("");
    const [gameId, setGameId] = useState(null);
    const [gameName, setGameName] = useState(null);
    const [gamePlayers, setGamePlayers] = useState([]);
    const [gameData, setGameData] = useState([]);
    const [asesinado, setAsesinado] = useState(true);

    const create = (gameData) => {
        console.log(`Create desde Game Provider, ${gameData}`)
        setGameStatus(gameData.status);
        setGameId(gameData.id);
        setAsesinado(true)
        setGameData(gameData);
        setGameName(gameData.name);
    }

    const load = async (gameData, userId, token) => {
        setGameStatus(gameData.state);
        setGameId(gameData.id);
        setGamePlayers(gameData.players);
        const response = await consultarEstadoJugador(gameData.id, userId, token);
        setAsesinado(response.estaVivo);
        setGameData(gameData);
        setGameName(gameData.name);


    }
    const loadPlayers = (players) => {
        setGamePlayers(players);
    };

    const usuarioAsesinado = (gameId, userId, isAlive, userToken) => {
        setAsesinado(true);
        cambiarEstadoJugador(gameId, userId, isAlive, userToken);
    }

    //Calcular asesinados, para determinar si alguien ha ganado o no.
    const calcularAsesinados = (gameData) => {
        console.log(gamePlayers.map(players => players.username), "gp's en GC")
    }


    const exit = () => {

        setGameStatus("Finalizada");
        setGameId(null);
        setGamePlayers([]);
        console.log("exit");

    }


    return (
        <GameContext.Provider value={{
            create,
            load,
            loadPlayers,
            usuarioAsesinado,
            calcularAsesinados,
            exit,
            gameName,
            gameData,
            asesinado,
            gameId,
            gamePlayers
        }}>
            {children}
        </GameContext.Provider>
    )
};

export { GameContext, GameContextProvider };

