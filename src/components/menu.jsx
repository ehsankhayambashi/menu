import React, { useState, useEffect } from "react";
import Categories from "../components/categories";
import Items from "../components/items";
import item from "../services/itemService";
import category from "../services/categoryService";
import * as util from "../util/utils";

function Menu() {
  const [state, setState] = useState({
    selectedCatId: "",
    categories: [],
    items: [],
    currentItems: [],
  });

  useEffect(() => {
    async function fetchData() {
      const categories = await category.get();
      const items = await item.get();
      setState((prevValue) => {
        return {
          ...prevValue,
          categories: categories,
          selectedCatId: categories[0]._id,
          items: items,
          currentItems: util.getCurrentItems(items, categories[0]._id),
        };
      });
    }
    fetchData();
  }, []);

  function handleClick(selectedCatId) {
    const currentItems = util.getCurrentItems(state.items, selectedCatId);

    setState((prevValue) => {
      return {
        ...prevValue,
        currentItems,
        selectedCatId,
      };
    });
  }
  return (
    <div className="container-fluid">
      <Categories
        cats={state.categories}
        onClick={handleClick}
        selectedCatId={state.selectedCatId}
      />
      <Items items={state.currentItems} />
    </div>
  );
}

export default Menu;
