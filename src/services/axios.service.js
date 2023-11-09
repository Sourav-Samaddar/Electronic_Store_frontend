import axios from "axios";
import { BASE_URL } from "./helper.service";
import { getTokenFromLocalStorage } from "../auth/HelperAuth";

export const publicAxios = axios.create({
    baseURL: BASE_URL,
});

export const privateAxios = axios.create({
    baseURL: BASE_URL
});

privateAxios.interceptors.request.use(config=>{
    const token = getTokenFromLocalStorage()
    if(token){
        config.headers.Authorization=`Bearer ${token}`
    }
    return config;
},error=>Promise.reject(error));