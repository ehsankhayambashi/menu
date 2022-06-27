import React from "react";
import itemService from "../../services/itemService";

function DeleteItem(props) {
  const { item, items, setItems } = props;
  return (
    <button
      className="btn btn-danger"
      onClick={async () => {
        const backupItems = [...items];
        const filtredItems = items.filter((it) => it._id != item._id);
        setItems(filtredItems);
        try {
          const result = await itemService.delete(item._id);
        } catch (err) {
          setItems(backupItems);
        }
      }}
    >
      حذف
    </button>
  );
}

export default DeleteItem;
