import axios from "axios";

axios.defaults.baseURL = "http://127.0.0.1:8000/api/";
// axios.defaults.headers.Authorization = localStorage.token

export const request = async ({
  route,
  method = "GET",
  body,
  header = "application/json",
}) => {
  try {
    const response = await axios.request({
      url: `${route}`,
      method,
      data: body,
      headers: {
        "Content-Type": header,
        Authorization: `Bearer ${localStorage.token}`,
      },
    });

    return { data: response.data, status: response.status };
  } catch (error) {
    console.log("======== Error =========");
    console.log(error);
    console.log(error.response.data.message);
    console.log("======== // =========");

    throw error;
  }
};
