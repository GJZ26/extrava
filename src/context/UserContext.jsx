import React, { createContext, useState } from 'react';

const AuthContext = createContext();

const AuthContextProvider = ({ children }) => {

    const default_session = {
        auth: false,
        token: null,
        name: null,
        role: null,
        img: null
    }

    const user_info = JSON.parse(localStorage.getItem('session')) || default_session

    const [userAuthProvider, setAuthProvider] = useState(user_info);

    const modifyContextValue = (newValue, reset = false) => {

        let current_session = {}
        
        if (reset) {
            current_session = {
                auth: false,
                token: null,
                name: null,
                role: null,
                img: null,
            }
            localStorage.removeItem('token')
        } else {
            current_session = {
                auth: true,
                token: newValue.token,
                name: newValue.name,
                role: newValue.role,
                img: newValue.img
            }
        }

        localStorage.setItem('session', JSON.stringify(current_session))
        console.log(newValue)
        window.location.reload()
        setAuthProvider(newValue);
    };

    return (
        <AuthContext.Provider value={{ userAuthProvider, setAuthProvider: modifyContextValue }}>
            {children}
        </AuthContext.Provider>
    );
};


export { AuthContext, AuthContextProvider };