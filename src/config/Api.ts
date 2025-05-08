import axios from "axios"

const STORED_TOKEN = localStorage.getItem("token")

const Api = axios.create({
    baseURL: "http://localhost:8080/api",
    headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${STORED_TOKEN}`
    }
})

export default Api