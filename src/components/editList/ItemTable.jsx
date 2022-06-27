import React, { useState, useEffect } from "react";
import itemService from "../../services/itemService";
import Table from "../table/table";
import Thumbnail from "./thumbnail";
import DeleteItem from "./deleteItem";
function ItemTable() {
  const [items, setItems] = useState([]);

  useEffect(async () => {
    async function fetchItems() {
      return await itemService.get();
    }
    const items = await fetchItems();
    setItems(items);
  }, []);

  const columns = [
    { path: "name", lable: "نام" },
    { path: "price", lable: "قیمت" },
    { path: "isPublished", lable: "نمایش" },
    { path: "isOver", lable: "وضعیت" },
    { path: "materials", lable: "محتویات" },
    {
      lable: "دسته بندی",
      content: (item) => <h6>{item.category.name}</h6>,
    },
    {
      lable: "عکس",
      content: (item) => (
        <Thumbnail src={`http://localhost:3900/${item.image}`} />
      ),
    },
    {
      lable: "حذف",
      content: (item) => (
        <DeleteItem item={item} items={items} setItems={setItems} />
      ),
    },
  ];
  return <Table columns={columns} data={items} />;
}
export default ItemTable;
