import http from "./httpService";

const endPoint = "http://localhost:3900/api/categories";

async function getCategories() {
  const { data: categories } = await http.get(endPoint);
  const sortedCat = categories.sort(function (a, b) {
    return a.priorityCode - b.priorityCode;
  });
  return sortedCat;
}

async function getCategory(catId) {
  const { data: category } = await http.get(endPoint + "/" + catId);
  return category;
}

async function postCategory(data) {
  const category = await http.post(endPoint, data);
  return category;
}

async function updateCategory(catId, data) {
  const updatedCategory = await http.put(`${endPoint}/${catId}`, data);
  return updatedCategory;
}

async function deleteCategory(catId) {
  await http.delete(`${endPoint}/${catId}`);
}

export default {
  get: getCategories,
  getById: getCategory,
  post: postCategory,
  update: updateCategory,
  delete: deleteCategory,
};
