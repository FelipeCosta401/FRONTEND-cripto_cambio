import axios from "axios"

const STORED_TOKEN = localStorage.getItem("token")

const Api = axios.create({
    baseURL: "https://6658-2804-7f0-451-a73b-6f3f-9235-d994-6150.ngrok-free.app/api",
    headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        "Authorization": `Bearer ${STORED_TOKEN}`,
        "ngrok-skip-browser-warning": "true"
    }
})

export default Api