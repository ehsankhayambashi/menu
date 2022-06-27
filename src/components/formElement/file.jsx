import React, { useEffect } from "react";
import { useField, ErrorMessage } from "formik";
import PreviewImage from "../previewImage";

function File(props) {
  const [field, meta] = useField(props);
  const required = props.required;
  return (
    <div className="form-group row">
      <label className="col-2 col-form-label" htmlFor={field.name}>
        عکس
      </label>
      <div className="col-auto">
        <label
          htmlFor="files"
          className={
            meta.error
              ? "btn btn-outline-danger mt-1"
              : "btn btn-outline-secondary mt-1"
          }
        >
          انتخاب عکس
        </label>
        {meta.error && <p className="text-danger mt-1">{meta.error}</p>}
      </div>
      <input
        style={{ display: "none" }}
        id="files"
        type="file"
        name={field.name}
        accept=".png,.jpg,.jpeg"
        onChange={(event) => {
          props.setFieldValue("image", event.target.files[0]);
        }}
        onInvalid={(event) => {
          event.target.setCustomValidity("برای دسته بندی عکس انتخاب کنید");
        }}
        onInput={(event) => {
          event.target.setCustomValidity("");
        }}
        required={required}
      />
      {props.image && <PreviewImage file={props.image} />}
    </div>
  );
}

export default File;
