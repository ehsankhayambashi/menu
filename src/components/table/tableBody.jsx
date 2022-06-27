import React from "react";
import _ from "lodash";
import { Link } from "react-router-dom";

function TableBody(props) {
  const { data, columns } = props;

  function renderCell(category, column) {
    if (column.content) return column.content(category);
    if (column.path === "name") {
      const categoryName = _.get(category, column.path);
      const categotyId = _.get(category, "_id");
      const price = _.get(category, "price");
      if (price) {
        return <Link to={`/dashboard/item/${categotyId}`}>{categoryName}</Link>;
      } else {
        return (
          <Link to={`/dashboard/category/${categotyId}`}>{categoryName}</Link>
        );
      }
    }
    if (column.path === "isPublished") {
      const isPublished = _.get(category, "isPublished");
      if (isPublished)
        return <i className="bi bi-check-circle-fill text-success"></i>;
      return <i className="bi bi-x-circle-fill text-danger"></i>;
    }

    if (column.path === "isOver") {
      const isOver = _.get(category, "isOver");
      if (isOver) return <p className="text-danger">تمام شده</p>;
      return <p className="text-success">موجود</p>;
    }

    return _.get(category, column.path);
  }
  return (
    <tbody>
      {data.map((category, index) => (
        <tr key={index}>
          {columns.map((column, index) => (
            <td key={index}>{renderCell(category, column)}</td>
          ))}
        </tr>
      ))}
    </tbody>
  );
}

export default TableBody;
