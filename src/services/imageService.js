import http from "./httpService";

async function convertURLtoFile(url) {
  const response = await fetch(url);
  const data = await response.blob();
  const filename = url.split("/").pop();
  const metadata = { type: `image/png` };
  return new File([data], filename, metadata);
}

async function getImage(imagePath) {
  return convertURLtoFile(`http://localhost:3900/${imagePath}`);
}

async function postImage(data) {
  const { data: imagePath } = await http.post(
    "http://localhost:3900/api/images",
    data
  );
  return imagePath;
}

export default {
  get: getImage,
  post: postImage,
};
