import Api from "@/config/Api";

import type { loginFormType } from "@/pages/login-page/LoginPage";
import type { registerFormType } from "@/pages/register-page/RegisterPage";
import type { UserInterface } from "@/types/UserInterface";

interface LoginResponseInterface {
    message: string
    loggedUser: UserInterface
    token: string
}

export default class AuthService {
    async register(newUser: registerFormType){
        return await Api.post("/auth/register", newUser)
            .then((res: { status: number, data: {message: string, createdUser: UserInterface} }) => {
                const { message, createdUser } = res.data
                const status = res.status

                return { message, createdUser, status}

            }).catch((error) => {
                console.log(error)
                throw new Error(error.response.data.error)
            })
    }

    async login({ email, password }: loginFormType) {
        return await Api.post("/auth/login", {
            email,
            password
        }).then((res: { data: LoginResponseInterface }) => {
            const response = res.data

            const { loggedUser, message, token } = response

            return { loggedUser, message, token }
        }).catch((e) => {
            console.log(e)
            throw new Error(e.response.data.error)
        })
    }
}