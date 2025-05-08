import { createContext, useState, type ReactNode, useContext } from "react";

import Api from "@/config/Api";

import { UserContext } from "./UserContext";

import type { UserInterface } from "@/types/UserInterface";

interface AuthContextItens {
    token: string,
    login: (token: string, user: UserInterface) => void
    logout: () => void
}

const AuthContext = createContext<AuthContextItens>({
    login: () => { },
    logout: () => { },
    token: ""
})

const AuthContextProvider = ({ children }: { children: ReactNode }) => {
    const STORED_TOKEN = localStorage.getItem("token")
    const { setUser } = useContext(UserContext)
    const [token, setToken] = useState<string>(STORED_TOKEN ? STORED_TOKEN : "")

    function login(accessToken: string, user: UserInterface) {
        setToken(accessToken)
        setUser(user)
        localStorage.setItem("token", accessToken)
        Api.interceptors.request.use(config => {
            config.headers['Authorization'] = `Bearer ${token}`
            return config
        })
    }

    function logout() {
        localStorage.clear()
        setToken("")
        setUser({
            email: "",
            id: 0,
            name: ""
        })
    }

    return (
        <AuthContext.Provider value={{ token, login, logout }}>
            {children}
        </AuthContext.Provider>
    )
}

export { AuthContext, AuthContextProvider }