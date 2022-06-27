import React from "react";
import "../css/catItem.css";

function CatItem(props) {
  const { category, onClick, activeCat } = props;
  const classCard = activeCat ? "cat-item active-cat" : "cat-item";
  if (!category.isPublished) return null;
  return (
    <div
      className={classCard}
      onClick={() => {
        onClick(category._id);
      }}
    >
      <img
        className="cat-img"
        src={`http://localhost:3900/${category.image}`}
        alt={category.name}
      />
      <div className="card-body">
        <h5 className="card-title">{category.name}</h5>
      </div>
    </div>
  );
}

export default CatItem;
