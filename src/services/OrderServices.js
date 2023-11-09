import { privateAxios } from "./axios.service";

//get orders: async wait
export const getAllOrders = async (pageNumber, pageSize, sortBy, sortDirection) =>{
    let result = await privateAxios
    .get(`/orders?pageNumber=${pageNumber}&pageSize=${pageSize}&sortBy=${sortBy}&sortDirection=${sortDirection}`)
    return result.data;
}

//update orders
export const updateOrder = async (order, orderId) => {
    let result = await privateAxios.put(`/orders/${orderId}`,order)
    return result.data;
}

//create create order
export const createOrder = async (orderDetail) => {
    const result = await privateAxios.post(`/orders`, orderDetail);
    return result.data;
};
  
//get orders of users
export const getOrdersOfUser = async (userId,sortDirection='desc') => {
    const result = await privateAxios.get(`/orders/user/${userId}?sortDirection=${sortDirection}`);
    return result.data;
};

//get order by Id
export const getOrderById = async (orderId) => {
    const result = await privateAxios.get(`/orders/${orderId}`);
    return result.data;
};

