import React, { useState, useEffect } from "react";
import categoryServive from "../../services/categoryService";
import DeleteButton from "./deleteButton";
import Table from "../table/table";
import Thumbnail from "./thumbnail";

function CategoryTable() {
  const [categories, setCategories] = useState([]);

  useEffect(async () => {
    async function fetchCategories() {
      return await categoryServive.get();
    }
    const categories = await fetchCategories();
    setCategories(categories);
  }, []);

  const columns = [
    { path: "name", lable: "نام" },
    { path: "isPublished", lable: "نمایش" },
    {
      lable: "عکس",
      content: (category) => (
        <Thumbnail src={`http://localhost:3900/${category.image}`} />
      ),
    },
    {
      lable: "حذف",
      content: (category) => (
        <DeleteButton
          category={category}
          categories={categories}
          setCategories={setCategories}
        />
      ),
    },
  ];
  return (
    <React.Fragment>
      <Table columns={columns} data={categories} />
    </React.Fragment>
  );
}

export default CategoryTable;
