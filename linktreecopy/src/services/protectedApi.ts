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

protectedApi.interceptors.response.use(
    (response) => {return response},
    async (error) => {
        const originalRequest = error.config

        if(error.response?.status === 401 && !originalRequest.retryRequest){
            originalRequest.retryRequest = true
            try {
                const refreshToken = localStorage.getItem("refresh")
                const response = await axios.post(BASE_URL + "/api/accounts/token/refresh/", 
                    {refresh: refreshToken})
                const newAccesToken = response.data.access
                originalRequest.headers["Authorization"] = `Bearer ${newAccesToken}`
                localStorage.setItem("access", newAccesToken)
                console.log("Acces token updated!")
                
                return protectedApi(originalRequest)
            } catch (error) {
                console.log(error);
               localStorage.clear() 
            }
        }
        return Promise.reject(error)
    }
)
    

export async function getUserData(){
    try {
        const response = await protectedApi("/api/accounts/me/")
        return response.data
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

export async function deleteUrl(id: number) {
    try {
        const response = await protectedApi.delete(`/api/links/${id}/`)
        return response.status === 204
    } catch (error) {
        console.log(error);
    }
}

export async function editURL(id: number, url?: string, title?: string){
    try {
        const response = await protectedApi.patch(`/api/links/${id}/`,{url, title})
        return response.data
    } catch (error) {
        console.log(error)   
    }
}