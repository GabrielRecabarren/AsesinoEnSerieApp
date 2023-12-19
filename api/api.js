import axios from 'axios';

const baseURL = 'http://192.168.1.87:3000';
const usersEndpoint = '/users';

const api = axios.create({
  baseURL,
  timeout: 5000, // Puedes ajustar este valor según tus necesidades
});

export const obtenerDatosUsuario = async () => {
  try {
    console.log('Llamando datos de usuario');
    const response = await api.get(usersEndpoint);
    console.log(response.data);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const crearUsuario = async (userData) => {
  try {
    console.log('Creando usuario');
    const response = await api.post("/createUser", userData);
    console.log(response.data);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const loginUsuario = async (userData) => {
  try {
    console.log(`Loggeando usuario ${userData.email}`);
    const response = await api.post("/login", userData);
    console.log(response.data);
    return response.data;
    
  } catch (error) {
    alert("Usuario inválido.")
    throw error;
  }
}

//Crear una partida
export const crearPartida = async (gameData) => {
  try {
    console.log("Intentando crear una partida ");
    const response = await api.post("/crearPartida", gameData);
    return response.data;
    
  } catch (error) {
    console.log(error)
  }

}