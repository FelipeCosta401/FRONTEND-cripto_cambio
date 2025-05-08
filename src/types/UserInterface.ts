export interface NewUserInterface {
    name: string
    email: string,
    password: string,
    passwordConfirmation: string
}

export interface UserInterface {
    id: number,
    name: string,
    email: string
}