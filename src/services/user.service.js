import { publicAxios, privateAxios } from "./axios.service";

//register new user
export const registerUser = (userData) => {
    return publicAxios.post(`/auth/register`, userData).then((response) => response.data);
};

export const loginUser = (userData) => {
    return publicAxios.post(`/auth/login`, userData).then((response) => response.data);
};

export const loginUserWithGoogle = (userData) => {
    return publicAxios.post(`/auth/google`, userData).then((response) => response.data);
};

export const getUser = (userId) => {
    return privateAxios.get(`/users/${userId}`).then((response) => response.data)
}

export const getUserImage = (userId) => {
    return privateAxios.get(`/users/image/${userId}`).then((response) => response.data)
}

export const updateUser = (user) => {
    return privateAxios.put(`/users/${user.userId}`,user).then((response) => response.data)
}

export const updateUserProfilePicture = (file, userId) => {
    if (file == null) {
      return;
    }
    const data = new FormData();
    data.append("userImage", file);
    return privateAxios.post(`/users/image/${userId}`, data)
      .then((response) => response.data);
}

export const getAllUsers = (pageNumber,pageSize,sortBy,sortDirection) => {
    return privateAxios
    .get(`/users?pageNumber=${pageNumber}&pageSize=${pageSize}&sortBy=${sortBy}&sortDirection=${sortDirection}`)
    .then((resp) => resp.data);
}

export const searchUserByName = (queryString,pageNumber,pageSize,sortBy,sortDirection) =>{
    return privateAxios
    .get(`/users/search/${queryString}?pageNumber=${pageNumber}&pageSize=${pageSize}&sortBy=${sortBy}&sortDirection=${sortDirection}`)
    .then((resp) => resp.data);
}