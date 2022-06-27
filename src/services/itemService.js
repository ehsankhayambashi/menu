import http from "./httpService";

const endPoint = "http://localhost:3900/api/items";

async function getItems() {
  const { data: items } = await http.get(endPoint);
  const sortedItem = items.sort(function (a, b) {
    return a.priorityCode - b.priorityCode;
  });

  return sortedItem;
}

async function getItemById(itemId) {
  const { data: item } = await http.get(endPoint + "/" + itemId);
  return item;
}

async function postItem(data) {
  const item = await http.post(endPoint, data);
  return item;
}

async function updateItem(itemId, data) {
  const result = await http.put(`${endPoint}/${itemId}`, data);
  return result;
}

async function deleteItem(itemId) {
  await http.delete(`${endPoint}/${itemId}`);
}

export default {
  get: getItems,
  getItemById: getItemById,
  post: postItem,
  update: updateItem,
  delete: deleteItem,
};
