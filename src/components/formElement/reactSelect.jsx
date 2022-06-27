import React from "react";
import { useField, ErrorMessage } from "formik";
import Select, { ControlProps } from "react-select";

function ReactSelect(props) {
  const { label, name, column, error, options, setFieldValue } = props;
  const [field, meta] = useField(props);

  const customStyles = {
    control: (base) => ({
      ...base,
      flexDirection: "row-reverse",
    }),
  };

  function makeCatOptions(options) {
    const categories = [];
    options.map((op) => {
      const cat = {};
      cat["value"] = op._id;
      cat["label"] = op.name;
      categories.push(cat);
    });
    return categories;
  }

  const categories = makeCatOptions(options);

  return (
    <div className="form-group row">
      <label htmlFor={name} className="col-2 col-form-label">
        {label}
      </label>
      <div className="col-10">
        <Select
          styles={customStyles}
          placeholder="انتخاب دسته بندی"
          value={field.value}
          onChange={(option) => {
            setFieldValue(field.name, option);
          }}
          options={categories}
          name={field.name}
        />
        {meta.error && <div className="alert alert-danger">{meta.error}</div>}
      </div>
    </div>
  );
}

export default ReactSelect;
