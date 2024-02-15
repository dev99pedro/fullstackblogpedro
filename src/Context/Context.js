import { createContext } from "react";
import { useState } from "react";

export const Context = createContext({})

export const ContextProvider = ({ children }) => {

    const [auth, setAuth] = useState(false)
    const [nameLogged, setNameLogged] = useState()




    return (
        <Context.Provider value={{ auth, setAuth, nameLogged, setNameLogged }}>
            {children}
        </Context.Provider>
    )
}