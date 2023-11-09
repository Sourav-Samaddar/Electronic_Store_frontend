import { privateAxios } from "./axios.service";

export const submitPayment = async (orderId) => {
    let result = await privateAxios.post(`/payments/razor/${orderId}`)
    return result.data;
}

export const paymentStatusAndUpdateOrder = async (paymentId,orderId) => {
    const result = await privateAxios.get(`/payments/razor/${paymentId}/order/${orderId}`);
    return result.data;
};