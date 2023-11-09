import { privateAxios } from "./axios.service";
import { PRODUCT_PAGE_SIZE } from '../services/helper.service'

export const addProduct = (product) =>{
    return privateAxios.post("/products",product).then((resp) => resp.data)
}

export const addProductWithCategory = (product,categoryId) =>{
    return privateAxios.post(`/products/categories/${categoryId}`,product).then((resp) => resp.data)
}

export const addProductImage = (file, productId) =>{
    const formData = new FormData();
    formData.append('productImage',file)
    return privateAxios.post(`/products/image/${productId}`,formData)
    .then((resp) => resp.data)
}

//get single product detail
export const getProduct = (productId) => {
    return privateAxios.get(`/products/${productId}`).then((res) => res.data);
};

export const getAllProducts = (pageNumber=0,pageSize=PRODUCT_PAGE_SIZE,
    sortBy="addedDate",sortDirection="asc")=>{
    return privateAxios
    .get(`/products?pageNumber=${pageNumber}&pageSize=${pageSize}&sortBy=${sortBy}&sortDirection=${sortDirection}`)
    .then((resp) => resp.data);
}

export const getAllLiveProducts = (pageNumber=0,pageSize=PRODUCT_PAGE_SIZE,
    sortBy="addedDate",sortDirection="asc")=>{
    return privateAxios
    .get(`/products/islive?pageNumber=${pageNumber}&pageSize=${pageSize}&sortBy=${sortBy}&sortDirection=${sortDirection}`)
    .then((resp) => resp.data);
}

export const getProductsByCategory = (categoryId,pageNumber=0,pageSize=PRODUCT_PAGE_SIZE,
    sortBy="addedDate",sortDirection="asc")=>{
    return privateAxios
    .get(`/products/searchbycategory/${categoryId}?pageNumber=${pageNumber}&pageSize=${pageSize}&sortBy=${sortBy}&sortDirection=${sortDirection}`)
    .then((resp) => resp.data);
}

export const getLiveProductsByCategory = (categoryId,pageNumber=0,pageSize=PRODUCT_PAGE_SIZE,
    sortBy="addedDate",sortDirection="asc")=>{
    return privateAxios
    .get(`/products/live/searchbycategory/${categoryId}?pageNumber=${pageNumber}&pageSize=${pageSize}&sortBy=${sortBy}&sortDirection=${sortDirection}`)
    .then((resp) => resp.data);
}

export const searchProduct = (subTitle,pageNumber=0,pageSize=PRODUCT_PAGE_SIZE,
    sortBy="addedDate",sortDirection="asc")=>{
    return privateAxios
    .get(`/products/searchbytitle/${subTitle}?pageNumber=${pageNumber}&pageSize=${pageSize}&sortBy=${sortBy}&sortDirection=${sortDirection}`)
    .then((resp) => resp.data);
}

export const searchLiveProduct = (subTitle,pageNumber=0,pageSize=PRODUCT_PAGE_SIZE,
    sortBy="addedDate",sortDirection="asc")=>{
    return privateAxios
    .get(`/products/live/searchbytitle/${subTitle}?pageNumber=${pageNumber}&pageSize=${pageSize}&sortBy=${sortBy}&sortDirection=${sortDirection}`)
    .then((resp) => resp.data);
}

export const deleteProduct = (productId) => {
    return privateAxios.delete(`/products/${productId}`).then((response) => response.data);
}

export const updateProduct = (product, productId) => {
    return privateAxios.put(`/products/${productId}`, product).then((response) => response.data);
}

export const udpateProductCategory = (categoryId, productId) => {
    return privateAxios.put(`/products/${productId}/category/${categoryId}`).then((res) => res.data);
}

