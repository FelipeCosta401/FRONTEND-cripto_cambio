import type { UserInterface } from "@/types/UserInterface"
import { createContext, useEffect, useState, type Dispatch, type ReactNode, type SetStateAction } from "react"

interface UserContextItens {
    user: UserInterface
    setUser: Dispatch<SetStateAction<UserInterface>>
}

const DEFAULT_VALUES: UserContextItens = {
    setUser: () => {},
    user: {
        email: "",
        id: 0,
        name: ""
    }
}

const UserContext = createContext<UserContextItens>(DEFAULT_VALUES)

const UserContextProvider = ({ children }: {children: ReactNode}) => {
    const STORED_USER = localStorage.getItem("user")
    const [user, setUser] = useState<UserInterface>(STORED_USER ? JSON.parse(STORED_USER) : {
        email: "",
        id: 0,
        name: ""
    })

    useEffect(() => {
        user && user.id && localStorage.setItem("user", JSON.stringify(user))
    }, [user])

    return (
        <UserContext.Provider value={{ user, setUser }}>
            {children}
        </UserContext.Provider>
    )
}

export { UserContext, UserContextProvider }