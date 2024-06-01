import axios from "axios";

export const api = async (url, method, body) => {
  // axios.defaults.baseURL = "http://localhost:8080";
  // const baseURL = customBaseURL || "http://localhost:8080";
  const res = await axios({
    baseURL,
    url,
    method,
    data: body,
  });

  return res;
};
