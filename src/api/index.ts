import axios from "axios"

const api = axios.create({
    baseURL: import.meta.env.VITE_BASE_API_URL
})

api.interceptors.request.use((config) => {

    let token = null

    if (!token) {
        token = localStorage.getItem('token')
    }

    if (token) {
        config.headers.Authorization = `Bearer ${token}`
    }

    return config

}, () => { })

export { api }