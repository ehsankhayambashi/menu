import React from "react";
import "../css/categories.css";
import CatItem from "./catItem";

function Categories(props) {
  const { cats, onClick, selectedCatId } = props;
  return (
    <div className="row">
      <div className="col-12">
        <div className="category-container">
          {cats.map((cat, index) => (
            <CatItem
              key={index}
              category={cat}
              onClick={onClick}
              activeCat={cat.id === selectedCatId ? true : false}
            />
          ))}
        </div>
      </div>
    </div>
  );
}

export default Categories;
