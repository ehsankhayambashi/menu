import React, { useState } from "react";

function PreviewImage(props) {
  const [preview, setPreview] = useState(null);
  const reader = new FileReader();
  reader.readAsDataURL(props.file);
  reader.onload = () => {
    setPreview(reader.result);
  };

  return (
    <img className="col-auto mt-1" src={preview} width="100px" height="100px" />
  );
}

export default PreviewImage;
