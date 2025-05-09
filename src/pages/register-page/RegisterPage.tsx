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

const registerFormSchema = z.object({
    name: z.string().min(5, { message: "Campo 'nome' precisa ter ao menos 5 caracteres!" }),
    email: z.string().email({ message: "Preencha o campo 'email' corretamente!" }),
    password: z.string().min(6, { message: "Preencha o campo 'senha' corretamente! " }),
    passwordConfirmation: z.string(),
}).refine((data) => data.password === data.passwordConfirmation, {
    message: "As senhas não coincidem",
    path: ["passwordConfirmation"],
})

export type registerFormType = z.infer<typeof registerFormSchema>

const RegisterPage = () => {
    const navigate = useNavigate()
    const { logout } = useContext(AuthContext)
    const { register } = useAuth()
    const form = useForm<registerFormType>({
        defaultValues: {
            name: "",
            email: "",
            password: "",
            passwordConfirmation: ""
        },
        resolver: zodResolver(registerFormSchema)
    })

    useEffect(() => {
        logout()
    }, [])

    return (
        <div className="h-full min-h-screen bg-background flex flex-col gap-4 justify-center items-center p-4">
            <h1 className="text-foreground font-bold text-5xl">Cadastre-se</h1>
            <section className="w-full sm:w-[600px] bg-card p-4 py-10 rounded-md shadow-sm space-y-4">
                <Form {...form}>
                    <form className="space-y-6" onSubmit={form.handleSubmit(register)}>
                        <FormField
                            control={form.control}
                            name="name"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Nome</FormLabel>
                                    <FormControl>
                                        <Input {...field} placeholder="Digite seu nome" />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />

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

                        <FormField
                            control={form.control}
                            name="passwordConfirmation"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Confirme sua senha</FormLabel>
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
                    Já possui uma conta?
                    <span onClick={() => navigate("/login")} className="ml-2 text-primary underline hover:cursor-pointer hover:text-primary/80">
                        Entrar
                    </span>
                </h4>
            </section>
        </div>
    )
}

export default RegisterPage