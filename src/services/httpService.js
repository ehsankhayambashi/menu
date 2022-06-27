import axios from "axios";
import { toast } from "react-toastify";

axios.interceptors.response.use(null, (error) => {
  const exeptedError =
    error.response &&
    error.response.status >= 400 &&
    error.response.status < 500;

  if (!exeptedError) {
    console.log("unexepted error omade inja", error);
    toast.error("خطای ناشناس!");
  }

  return Promise.reject(error);
});

export default {
  get: axios.get,
  post: axios.post,
  put: axios.put,
  delete: axios.delete,
};
