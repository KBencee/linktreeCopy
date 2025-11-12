import axios from "axios";
import { BASE_URL } from "./publicApi";

const protectedApi = axios.create({baseURL: BASE_URL})

protectedApi.interceptors.request.use(config => {
    const token = localStorage.getItem("access")
    if(token){
        config.headers["Authorization"] = `Bearer ${token}`
    }
    return config;
})

export async function getUserData(){
    try {
        const response = await protectedApi("/api/accounts/me/")
        console.log(response)
        return response
    } catch (error) {
        console.error(error)
    }
}

export async function createNewURL(url: string,title: string){
    try {
        const response = protectedApi.post("/api/links/",{url, title})
        return (await response).data
    } catch (error) {
        console.log(error);
    }
}