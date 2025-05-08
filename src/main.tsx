import { RouterProvider } from "react-router-dom"

import { createRoot } from 'react-dom/client'

import { Toaster } from "./components/ui/sonner"

import './index.css'
import routes from "./routes/routes"

import { AuthContextProvider } from "./context/AuthContext"
import { UserContextProvider } from "./context/UserContext"

createRoot(document.getElementById('root')!).render(
    <>
        <UserContextProvider>
            <AuthContextProvider>
                <RouterProvider router={routes} />
            </AuthContextProvider>
        </UserContextProvider>
        <Toaster richColors />
    </>
)
