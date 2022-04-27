import axios from "axios";

const axiosIntance = axios.create({
  baseURL: "https://student-query-portal-server.herokuapp.com/api",
  // "http://localhost:3030/api",
});

export default axiosIntance;
