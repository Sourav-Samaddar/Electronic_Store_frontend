import { privateAxios } from "./axios.service"

export const downloadLogFile = () =>{
   return privateAxios.get(`/file/download/log`).then((resp) => resp.data)
}

export const log4jJsonContent = () =>{
    return privateAxios.get(`/file/log4json`).then((resp) => resp.data)
}

export const deleteLogContent = () =>{
    return privateAxios.delete(`/file/delete/log`).then((resp) => resp.data)
}

export const sendLog4jContent = (log4jContent) =>{
    console.log(log4jContent)
    const Log4jRequest = {
        configuration:JSON.stringify(log4jContent)
    }
    return privateAxios.post(`/file/send/log`,Log4jRequest).then((resp) => resp.data)
}