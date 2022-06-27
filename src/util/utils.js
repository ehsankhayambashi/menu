export function getCurrentItems(items, selectedCatId) {
  const currentItems = items.filter(
    (item) => item.category._id === selectedCatId
  );
  return currentItems;
}

export function removeDate(imageName) {
  return imageName.substring(imageName.indexOf("()") + 2);
}
