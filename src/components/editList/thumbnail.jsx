import React from "react";

function Thumbnail(props) {
  const { src } = props;
  return <img src={src} width="60" height="60" />;
}

export default Thumbnail;
