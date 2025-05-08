import { createBrowserRouter } from "react-router-dom"


// Privates routes
import AuthRoute from "./AuthRoute"

// Pages
import App from "@/App"
import LoginPage from "@/pages/login-page/LoginPage"
import HomePage from "@/pages/home-page/HomePage"

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
            }
        ]
    },
    {
        path: "/login",
        element: <LoginPage />
    }
])

export default routes