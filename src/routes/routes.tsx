import App from "@/App"
import LoginPage from "@/pages/login-page/LoginPage"
import { createBrowserRouter } from "react-router-dom"

const routes = createBrowserRouter([
    {
        path: "/",
        element: <App />,
    },
    {
        path: "/login",
        element: <LoginPage />
    }
])

export default routes