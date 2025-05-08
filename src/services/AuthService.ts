import Api from "@/config/Api";

import type { loginFormType } from "@/pages/login-page/LoginPage";
import type { UserInterface } from "@/types/UserInterface";

interface LoginResponseInterface {
    message: string
    loggedUser: UserInterface
    token: string
}

export default class AuthService {
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