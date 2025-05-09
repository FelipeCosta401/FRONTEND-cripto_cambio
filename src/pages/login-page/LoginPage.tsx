import { useContext, useEffect } from "react"
import { useNavigate } from "react-router-dom"

import { useForm } from "react-hook-form"
import z from "zod"
import { zodResolver } from "@hookform/resolvers/zod"

import { AuthContext } from "@/context/AuthContext"

import useAuth from "@/hooks/useAuth"

import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"

import { MdLogin } from "react-icons/md"

const loginFormSchema = z.object({
    email: z.string().email({ message: "Preencha o campo 'email' corretamente!" }),
    password: z.string().min(6, { message: "Preencha o campo 'senha' corretamente! " })
})

export type loginFormType = z.infer<typeof loginFormSchema>

const LoginPage = () => {
    const navigate = useNavigate()
    const { logout } = useContext(AuthContext)
    const { login } = useAuth()
    const form = useForm<loginFormType>({
        defaultValues: {
            email: "",
            password: ""
        },
        resolver: zodResolver(loginFormSchema)
    })

    useEffect(() => {
        logout()
    }, [])

    return (
        <div className="h-full min-h-screen bg-background flex flex-col gap-4 justify-center items-center p-4">
            <h1 className="text-foreground font-bold text-5xl">Entrar</h1>
            <section className="w-full sm:w-[600px] bg-card p-4 py-10 rounded-md shadow-sm space-y-4">
                <Form {...form}>
                    <form onSubmit={form.handleSubmit((data) => login(data))}>
                        <FormField
                            control={form.control}
                            name="email"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>E-mail</FormLabel>
                                    <FormControl>
                                        <Input {...field} placeholder="Digite seu E-mail" />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />

                        <FormField
                            control={form.control}
                            name="password"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Senha</FormLabel>
                                    <FormControl>
                                        <Input {...field} type="password" placeholder="Digite sua senha" />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <Button className="w-full">
                            Entrar
                            <MdLogin className="!size-5" />
                        </Button>
                    </form>
                </Form>
                <h4>
                    Não possui uma conta?
                    <span onClick={() => navigate("/register")} className="ml-2 text-primary underline hover:cursor-pointer hover:text-primary/80">
                        Cadastre-se
                    </span>
                </h4>
            </section>
        </div>
    )
}

export default LoginPage