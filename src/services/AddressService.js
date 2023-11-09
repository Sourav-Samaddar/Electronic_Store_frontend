import { privateAxios } from "./axios.service";

//get Addresses of user
export const getAllAddressOfUser = (userId) => {
    return privateAxios.get(`/address/user/${userId}`).then((res) => res.data);
};

export const addAddressOfUser = (address,userId) =>{
    return privateAxios.post(`/address/user/${userId}`,address).then((res) => res.data);
}