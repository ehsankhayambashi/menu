import React from "react";
import categoryService from "../../services/categoryService";

function DeleteButton(props) {
  const { category, categories, setCategories } = props;
  return (
    <button
      className="btn btn-danger"
      onClick={async () => {
        const backupCategories = [...categories];
        const filtredCategories = categories.filter(
          (cat) => cat._id != category._id
        );
        setCategories(filtredCategories);
        try {
          const result = await categoryService.delete(category._id);
        } catch (err) {
          setCategories(backupCategories);
        }
      }}
    >
      حذف
    </button>
  );
}

export default DeleteButton;
