import AsyncStorage from '@react-native-async-storage/async-storage';
import {createContext, useState} from 'react';

const UserContext = createContext();

const UserProvider = ({children}) =>{
    const [userData, setUserData] = useState(null);
    const [userId, setUserId] = useState(null);
    const [userToken, setUserToken] = useState(null);

    const login = async(data) => {
        await AsyncStorage.setItem('usuarioAutenticado', 'true');

        setUserData({data});
        setUserToken(data.token)
        setUserId(data.user.id)
    };

    const logout = () => {
        setUserData(null);
    };

    return (
        <UserContext.Provider value={{ userData, userToken, userId, login, logout}}>
           
            
            {children}
            
        </UserContext.Provider>
    );
};

export {UserProvider, UserContext};