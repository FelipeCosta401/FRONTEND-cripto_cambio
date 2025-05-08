import { QueryClientProvider, QueryClient } from "react-query"

import { RouterProvider } from "react-router-dom"

import { createRoot } from 'react-dom/client'

import { Toaster } from "./components/ui/sonner"

import './index.css'
import routes from "./routes/routes"

import { AuthContextProvider } from "./context/AuthContext"
import { UserContextProvider } from "./context/UserContext"

const queryClient = new QueryClient();

createRoot(document.getElementById('root')!).render(
    <>
        <UserContextProvider>
            <AuthContextProvider>
                <QueryClientProvider client={queryClient}>
                    <RouterProvider router={routes} />
                </QueryClientProvider>
            </AuthContextProvider>
        </UserContextProvider>
        <Toaster richColors />
    </>
)
