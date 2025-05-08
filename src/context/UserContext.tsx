import type { UserInterface } from "@/types/UserInterface"
import { createContext, useEffect, useState, type Dispatch, type ReactNode, type SetStateAction } from "react"

interface UserContextItens {
    theme: string | "light" | "dark";
    toggleTheme: () => void
    user: UserInterface
    setUser: Dispatch<SetStateAction<UserInterface>>
}

const DEFAULT_VALUES: UserContextItens = {
    setUser: () => {},
    theme: "light",
    toggleTheme: () => {},
    user: {
        email: "",
        id: 0,
        name: ""
    }
}

const UserContext = createContext<UserContextItens>(DEFAULT_VALUES)

const UserContextProvider = ({ children }: {children: ReactNode}) => {
    const STORED_USER = localStorage.getItem("user")
    const STORED_THEME = localStorage.getItem("theme")
    const [theme, setTheme] = useState<string>(STORED_THEME ? STORED_THEME : "light")
    const [user, setUser] = useState<UserInterface>(STORED_USER ? JSON.parse(STORED_USER) : {
        email: "",
        id: 0,
        name: ""
    })

    useEffect(() => {
        user && user.id && localStorage.setItem("user", JSON.stringify(user))
    }, [user])

    useEffect(() => {
        localStorage.setItem("theme", theme)
    }, [theme])

    function toggleTheme(){
        if(theme === "light"){
            setTheme("dark")
        } else {
            setTheme("light")
        }
    }

    return (
        <UserContext.Provider value={{ user, setUser, theme, toggleTheme }}>
            {children}
        </UserContext.Provider>
    )
}

export { UserContext, UserContextProvider }