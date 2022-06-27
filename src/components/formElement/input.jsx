import React from "react";
import { useField, ErrorMessage } from "formik";

function Input(props) {
  const { label, name, type, column } = props;
  const [field, meta] = useField(props);
  return (
    <div className="form-group row">
      <label htmlFor={label} className="col-2 col-form-label">
        {column}
      </label>
      <div className="col-10">
        <input
          name={field.name}
          type={type}
          className="form-control"
          id={field.name}
          value={field.value}
          onChange={field.onChange}
          autoComplete="off"
          placeholder={label}
        />
        {meta.error && <p className=" alert-danger mt-1">{meta.error}</p>}
      </div>
    </div>
  );
}

export default Input;
