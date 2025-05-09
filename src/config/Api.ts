import axios from "axios"

const STORED_TOKEN = localStorage.getItem("token")

const Api = axios.create({
    baseURL: "https://bb34-2804-7f0-451-a73b-6f3f-9235-d994-6150.ngrok-free.app:8080",
    headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${STORED_TOKEN}`
    }
})

export default Api