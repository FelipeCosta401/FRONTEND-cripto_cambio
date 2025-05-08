import { useContext } from "react"
import { useNavigate } from "react-router-dom"

import AuthService from "@/services/AuthService"

import { AuthContext } from "@/context/AuthContext"

import type { loginFormType } from "@/pages/login-page/LoginPage"

import { toast } from "sonner"

const authService = new AuthService()

const useAuth = () => {
    const navigate = useNavigate()
    const { login: contextLoginMethod } = useContext(AuthContext)

    async function login({ email, password }: loginFormType) {
        try {
            const { loggedUser, message, token } = await authService.login({ email, password })
            contextLoginMethod(token, loggedUser)
            toast.success(message)
            navigate("/")
        } catch (e: any) {
            toast.error(e.message)
        }
    }

    return { login }
}

export default useAuth