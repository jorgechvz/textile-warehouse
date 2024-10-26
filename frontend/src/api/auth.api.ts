import { LoginType } from "@/components/auth/types/login-type"
import axios from "axios"

export const loginRequest = async (data: LoginType) => {
    const response = await axios.post("http://localhost:3001/login", data)
    return response.data
}

export const registerRequest = async (data: LoginType) => {
    const response = await axios.post("http://localhost:3001/register", data)
    return response.data
}