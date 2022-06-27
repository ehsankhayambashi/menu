import React from "react";
import Item from "./item";

function Items(props) {
  const { items } = props;
  return items.map((item, index) => <Item key={index} item={item} />);
}

export default Items;
