export const BASE_URL = `http://192.168.29.68:9090`;
//Below for Tomcat deployment
//export const BASE_URL = `http://192.168.29.68:9090/ElectronicStore`;
export const PRODUCT_PAGE_SIZE = 6;
export const ADMIN_ORDER_PAGE_SIZE = 10;
export const USER_PAGE_SIZE = 10;
export const SOTRE_PAGE_PRODUCT_SIZE = 9;
export const PAYMENT_STATUS = "NOTPAID";
export const ORDER_STATUS = "ORDER PLACED";

export const getUserImageUrl = (userId) => {
    return `${BASE_URL}/users/image/${userId}`;
  };
  
export const getProductImageUrl = (productId) => {
return `${BASE_URL}/products/image/${productId}`;
};

export const getCategoryImageUrl = (categoryId) => {
  return `${BASE_URL}/categories/image/${categoryId}`;
};

export const formatDate = (timeInLongs) => {
if (!timeInLongs) {
    return null;
}
//   var options = {
//     weekday: "long",
//     year: "numeric",
//     month: "long",
//     day: "numeric",
//   };
const date = new Date(timeInLongs);
// return date.toLocaleDateString("hi-IN", options);
// return date.toLocaleString("en-US", options);
return date.toLocaleString();
};