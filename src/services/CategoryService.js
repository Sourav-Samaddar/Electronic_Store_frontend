import { privateAxios } from "./axios.service";

//add category
export const addCategory = (category) => {
  return privateAxios
    .post(`/categories`, category)
    .then((response) => response.data);
};

//get all categories
export const getCategories = (currentPage = 0, pageSize = 4) => {
  return privateAxios
    .get(`/categories?pageNumber=${currentPage}&&pageSize=${pageSize}`)
    .then((response) => response.data);
};

//delete category
export const deleteCategory = (categoryId) => {
  return privateAxios
    .delete(`/categories/${categoryId}`)
    .then((response) => response.data);
};

export const updateCategory = (category) => {
  return privateAxios
    .put(`/categories/${category.categoryId}`, category)
    .then((response) => response.data);
};

export const uploadCategoryPicture = (file, categoryId) => {
    if (file == null) {
      return;
    }
    const data = new FormData();
    data.append("categoryImage", file);
    return privateAxios.post(`/categories/image/${categoryId}`, data)
      .then((response) => response.data);
}
