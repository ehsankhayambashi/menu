import React from "react";
import { useField, ErrorMessage } from "formik";

function Checkbox(props) {
  const { column } = props;
  const [field, meta] = useField(props);
  return (
    <div className="form-group row">
      <div className="col-2">{column}</div>
      <div className="col-10">
        <div className="form-check ">
          <input
            className="form-check-input"
            style={{ float: "right" }}
            type="checkbox"
            name={field.name}
            id={field.name}
            value={field.value}
            checked={field.value}
            onChange={field.onChange}
            onBlur={field.onBlur}
          />
          <label
            className="form-check-label"
            htmlFor={field.name}
            style={{ marginRight: "1.5em" }}
          >
            {props.label}
          </label>
        </div>
      </div>
    </div>
  );
}

export default Checkbox;
