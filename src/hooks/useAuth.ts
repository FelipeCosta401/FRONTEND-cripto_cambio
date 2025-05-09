import { useContext } from "react"
import { useNavigate } from "react-router-dom"

import AuthService from "@/services/AuthService"

import { AuthContext } from "@/context/AuthContext"

import type { loginFormType } from "@/pages/login-page/LoginPage"

import { toast } from "sonner"
import type { registerFormType } from "@/pages/register-page/RegisterPage"

const authService = new AuthService()

const useAuth = () => {
    const navigate = useNavigate()
    const { login: contextLoginMethod, logout: contextLogoutMethod } = useContext(AuthContext)

    async function register(newUser: registerFormType) {
        try {
            const { message, status } = await authService.register(newUser)

            if (status === 201) {
                login({ email: newUser.email, password: newUser.password }, message)
            }

        } catch (e: any) {
            toast.error(e.message)
        }
    }

    async function login({ email, password }: loginFormType, registerMessage?: string) {
        try {
            const { loggedUser, message: loginMessage, token } = await authService.login({ email, password })
            contextLoginMethod(token, loggedUser)
            toast.success(registerMessage ? registerMessage : loginMessage)
            navigate("/")
        } catch (e: any) {
            toast.error(e.message)
        }
    }

    async function logout() {
        contextLogoutMethod()
        toast.success("Saindo...")
        navigate("/login")
    }

    return { login, logout, register }
}

export default useAuth