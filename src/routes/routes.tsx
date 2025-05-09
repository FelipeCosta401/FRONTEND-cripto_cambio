import { createBrowserRouter } from "react-router-dom"


// Privates routes
import AuthRoute from "./AuthRoute"

// Pages
import App from "@/App"
import LoginPage from "@/pages/login-page/LoginPage"
import HomePage from "@/pages/home-page/HomePage"
import FavoriteCoinsPage from "@/pages/favorite-coins-page/FavoriteCoinsPage"
import RegisterPage from "@/pages/register-page/RegisterPage"

const routes = createBrowserRouter([
    {
        path: "/",
        element: (
            <AuthRoute>
                <App />
            </AuthRoute>
        ),
        children: [
            {
                path: "/",
                index: true,
                element: <HomePage />
            },
            {
                path: "/favoritas",
                element: <FavoriteCoinsPage />
            }
        ]
    },
    {
        path: "/login",
        element: <LoginPage />
    },
    {
        path: "/register",
        element: <RegisterPage />
    }
])

export default routes