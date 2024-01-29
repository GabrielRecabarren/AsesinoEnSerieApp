import axios from 'axios';

const baseURL = 'http://192.168.1.89:3000';
const usersEndpoint = '/users';

const api = axios.create({
  baseURL,
  timeout: 5000, // Puedes ajustar este valor según tus necesidades
});
//Obtener todos los usuarios (ADMIN)
export const obtenerDatosUsuario = async (token, idGame) => {
  try {
    console.log('Llamando datos de usuario');
    const response = await api.get(usersEndpoint, {
      headers:{
        Authorization: `Bearer ${token}`
      }
    });
    console.log(response.data);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const crearUsuario = async (userData) => {
  const newData = JSON.stringify(userData, null, 2);
  try {
    console.log(`Creando usuario ${newData}`);
    const response = await api.post("/createUser", userData);
    console.log(response.data);
    return response.data;
  } catch (error) {
    console.log(`${error}`);
  }
};

export const loginUsuario = async (userData) => {
  try {
    console.log(`Loggeando usuario ${userData.email}`);
    const response = await api.post("/login", userData);
    console.log(`Loggeado con exito: ${userData.email}`)
    return response.data;
    
  } catch (error) {
    alert("Usuario inválido.")
    throw error;
  }
}

//Crear una partida
export const crearPartida = async (gameData, token) => {
  try {
    console.log("Intentando crear una partida ");
    const response = await api.post("/crearPartida", gameData, {
      headers:{
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json'
      },
    });
    return response.data;
    
  } catch (error) {
    console.log(error)
    throw new Error(error.message || "Error creando la partida");
  }

};

//Obtener usuarios por partida
export const listarUsuariosPorPartida = async(gameId, token) =>{
  try {
    console.log(`"Enviando datos para listar: ${gameId} ${token}"`)
    const response = await api.get(`/users/:${gameId}`,{
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': "application/json"
      }
    })
    console.log(response);
    
  } catch (error) {
    throw { message: 'No se pueden obtener los usuarios de la partida.', error };
    
  }
}