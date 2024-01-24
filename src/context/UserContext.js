import {createContext, useState} from 'react';

const UserContext = createContext();

const UserProvider = ({children}) =>{
    const [userData, setUserData] = useState(null);

    const login = (data) => {
        setUserData({data});
    };

    const logout = () => {
        setUserData(null);
    };

    return (
        <UserContext.Provider value={{ userData, login, logout}}>
           
            
            {children}
            
        </UserContext.Provider>
    );
};

export {UserProvider, UserContext};